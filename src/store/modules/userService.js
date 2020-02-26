import User from "../models/User";

const userService = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        async authenticate(context, payload) {
            var result = await User.api().post("/users/authenticate", {
                Username: payload.userName,
                Password: payload.passwd
            })
            if (result.response.status === 200) {
                window.localStorage.setItem("userInfo", JSON.stringify(result.response.data));
                window.localStorage.setItem("companyid", result.response.data.companyid.toString());
                window.localStorage.setItem("access_token", result.response.data.token.toString());
            }
            return result.response;
        },
        logout() {
            localStorage.clear()
        },
    },
    getters: {
        getUsers: () => User.api().get("/users"),
        getUsersById: id => User.api().get(`/users/${id}`)
    }
};

export default userService;
