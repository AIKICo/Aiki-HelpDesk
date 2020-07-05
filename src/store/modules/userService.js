import User from "../models/User";
import router from "../../router"
import axois from "axios";
import store from "../index";

const userService = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        async authenticate(context, payload) {
            delete axois.defaults.headers.common.CompanyID;
            let result = (await User.api().post("/users/authenticate", {
                Username: payload.userName,
                Password: payload.passwd
            })).response;
            if (result.status === 200) {
                window.localStorage.setItem("userInfo", JSON.stringify(result.data));
                window.localStorage.setItem("companyid", result.data.companyid);
                window.localStorage.setItem("access_token", result.data.token);

                axois.defaults.headers.common.Authorization ="Bearer " + result.data.token;
                axois.defaults.headers.common.CompanyID = result.data.companyid;

                store.state.companyId = result.data.companyid;
                store.state.isLoggedIn = true;
                store.state.memberName = result.data.membername;
                store.state.memberRole = result.data.roles;
                store.state.accessToken = result.data.token;
            }
            return result;
        },
        logout() {
            localStorage.clear();
            router.push("/login");
        },
    },
    getters: {
        getUsers: () => User.api().get("/users"),
        getUsersById: id => User.api().get(`/users/${id}`)
    }
};

export default userService;
