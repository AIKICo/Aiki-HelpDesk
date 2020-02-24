import userService from "./userService";

const Login = {
  state: {},
  mutations: {},
  actions: {
    async login(context, payload) {
      console.log(context);
      console.log(payload);
      const result = await userService.getters.getUsers();
      console.log(result.response.data);
      //var response = await Axios.post("users/authenticate", {
        //username: payload.userName,
        //password: payload.passwd
      //});
      //return response;
    },
    logout(){
      localStorage.clear()
    },
  },
  getters: {}
};

export default Login;
