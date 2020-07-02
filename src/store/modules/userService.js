import User from "../models/User";
import router from '@/router.js';

const userService = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        async authenticate(context, payload) {
            let result = (await User.api().post("/users/authenticate", {
                Username: payload.userName,
                Password: payload.passwd
            })).response
            if (result.status === 200) {
                window.localStorage.setItem("userInfo", JSON.stringify(result.data));
                window.localStorage.setItem("companyid", result.data.encryptedCompnayId);
                window.localStorage.setItem("access_token", result.data.token);

                router.go("/dashboard");

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
