import User from "../models/User";
import axois from "axios";
import store from "../index";
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr'
import Vue from "vue";


const userService = {
    namespaced: true,
    state: {
        connection: null,
    },
    mutations: {
        SET_CONNECTION(state, payload) {
            state.connection = payload;
        },
        OFF_CONNECTION(state){
            if (state.connection)
            {
                state.connection.off("ReceiveMessage");
                state.connection.stop();
            }
        },
    },
    actions: {
        async authenticate({commit}, payload) {
            delete axois.defaults.headers.common.CompanyID;
            let result = (await User.api().post("/users/authenticate", {
                Username: payload.userName,
                Password: payload.passwd
            })).response;
            if (result.status === 200) {
                window.localStorage.setItem("userInfo", JSON.stringify(result.data));
                window.localStorage.setItem("companyid", result.data.companyid);
                window.localStorage.setItem("access_token", result.data.token);

                axois.defaults.headers.common.Authorization = "Bearer " + result.data.token;
                axois.defaults.headers.common.CompanyID = result.data.companyid;

                store.state.isLoggedIn = true;
                store.state.companyId = result.data.companyid;
                store.state.memberName = result.data.membername;
                store.state.memberRole = result.data.roles;
                store.state.accessToken = result.data.token;
                store.state.memberid = result.data.id;

                commit("OFF_CONNECTION");
                await store.dispatch("UserService/notificationStart");
            }
            return result;
        },
        async notificationStart({commit}){
            const connection = new HubConnectionBuilder()
                .withUrl(`${axois.defaults.baseURL}ticketalarmhub?CompanyID=${store.state.companyId}&MemberID=${store.state.memberid}`,
                    {
                        accessTokenFactory: () => store.state.accessToken,
                    })
                .configureLogging(LogLevel.Debug)
                .withAutomaticReconnect()
                .build()
            commit("SET_CONNECTION", connection);
            connection.on("ReceiveMessage", (data) => {
                let RecordInfo = JSON.parse(data);
                if (RecordInfo) {
                    if (RecordInfo.agentname === store.state.memberName) {
                        Vue.$toast("اطلاعات کارتابل شما تغییر داده شده است لطفا به روز رسانی نمایید");
                    }
                }
            });
            connection
                .start()
                .then(function () {
                    connection.invoke('SendMessage');
                })
                .catch(err => console.log(err));
        },
        logout({commit}) {
            localStorage.clear();
            commit("OFF_CONNECTION");
        },
    },
    getters: {
        getUsers: () => User.api().get("/users"),
        getUsersById: id => User.api().get(`/users/${id}`)
    }
};

export default userService;
