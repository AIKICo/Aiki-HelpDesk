import User from "../models/User";

const userService = {
  state: {},
  mutations: {},
  actions: {},
  getters: {
    getUsers: () => User.all(),
    getUsersById: id => User.find(id)
  }
};

export default userService;
