import User from "../models/User";

const userService = {
  state: {},
  mutations: {},
  actions: {},
  getters: {
    getUsers: () => User.api().get("/users/GetAll"),
    getUsersById: id => User.find(id)
  }
};

export default userService;
