import Axios from "axios";
import User from "../orm/User"

const Login = {
  state: {},
  mutations: {},
  actions: {
    async login(context, payload) {
      const user=[
        {
          name:'mohammad mehrnia',
          email:'qermezkon@gmail.com'
        }
      ]
      User.insert({data:user});
      console.log(User.all());

      var response = await Axios.post("users/authenticate", {
        username: payload.userName,
        password: payload.passwd
      });
      return response;
    },
    logout(){
      localStorage.clear()
    },
  },
  getters: {}
};

export default Login;
