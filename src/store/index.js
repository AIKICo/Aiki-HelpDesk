import Vue from "vue";
import Vuex from "vuex";
import isMobile from "mobile-device-detect";
import WorkOrder from "./modules/WorkOrder";
import Menu from "./modules/Menu";
import Login from './modules/Login'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    IsMobile: isMobile.isMobileOnly,
    accessToken: localStorage.getItem("access_token") || "",
    currentUser: {},
    isLoggedIn: !!localStorage.getItem("userInfo"),
    drawer: null,
    defaultColor:"indigo",
    defaultTextColor:"indigo--text",
    defaultHeaderTextColor:"white--text",
    defaultBadgeColor:"red"
  },
  mutations: {},
  actions: {},
  modules: {
    WorkOrderService: WorkOrder,
    MenuService: Menu,
    LoginService:Login
  },
  getters: {}
});
