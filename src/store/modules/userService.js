import User from "../models/User";
import axois from "axios";
import store from "../index";
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr'
import Vue from "vue";
import axios from "axios";


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
                window.localStorage.setItem("companyid", result.data.encryptedCompnayId);
                window.localStorage.setItem("access_token", result.data.token);

                axois.defaults.headers.common.Authorization = "Bearer " + result.data.token;
                axois.defaults.headers.common.CompanyID = result.data.encryptedCompnayId;

                store.state.isLoggedIn = true;
                store.state.companyId = result.data.encryptedCompnayId;
                store.state.memberName = result.data.membername;
                store.state.memberRole = result.data.roles;
                store.state.accessToken = result.data.token;
                store.state.memberid = result.data.id;
                store.state.companyName = result.data.companyName;
                commit("OFF_CONNECTION");
                await store.dispatch("UserService/notificationStart");
            }
            axois.defaults.headers.common.CompanyID = store.state.companyId;
            return result;
        },
        async notificationStart({commit}){
            const connection = new HubConnectionBuilder()
                .withUrl(`${axois.defaults.baseURL}ticketalarmhub?CompanyID=${store.state.companyId}&MemberID=${store.state.memberid}`,
                    {
                        accessTokenFactory: () => store.state.accessToken,
                    })
                .configureLogging(LogLevel.Debug)
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
        async IsEmailExists(context, payload) {
            delete axois.defaults.headers.common.CompanyID;
            let response = await axios.get("/Users/IsEmailExists/" + payload);
            axois.defaults.headers.common.CompanyID = store.state.companyId;
            return response;
        },
    },
    getters: {
        getUsers: () => User.api().get("/users"),
        getUsersById: id => User.api().get(`/users/${id}`)
    }
};

export default userService;
