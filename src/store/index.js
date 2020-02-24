import Vue from "vue";
import Axios from "axios";
import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";
import VuexORMAxios from "@vuex-orm/plugin-axios";
import isMobile from "mobile-device-detect";
import WorkOrder from "./modules/WorkOrder";
import Menu from "./modules/Menu";
import Login from "./modules/Login";

import User from "./models/User";

VuexORM.use(VuexORMAxios, {
  Axios,
  http:{
    baseURL: "https://aiki-co-helpdesk-webapi.herokuapp.com",
    URL:"/",
    access_token() {
      return localStorage.getItem('access_token');
    }
  },
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json"
  }
});
Vue.use(Vuex);

const database = new VuexORM.Database();
database.register(User);

export default new Vuex.Store({
  plugins: [VuexORM.install(database)],
  state: {
    IsMobile: isMobile.isMobileOnly,
    accessToken: localStorage.getItem("access_token") || "",
    currentUser: {},
    isLoggedIn: !!localStorage.getItem("userInfo"),
    drawer: null,
    defaultColor: "indigo",
    defaultTextColor: "indigo--text",
    defaultHeaderTextColor: "white--text",
    defaultBadgeColor: "red"
  },
  mutations: {},
  actions: {},
  modules: {
    WorkOrderService: WorkOrder,
    MenuService: Menu,
    LoginService: Login
  },
  getters: {}
});
