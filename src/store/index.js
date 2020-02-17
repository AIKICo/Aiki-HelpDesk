import Vue from 'vue'
import Vuex from 'vuex'
import isMobile from "mobile-device-detect"
import WorkOrder from "./modules/WorkOrder";
import Menu from "./modules/Menu"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    IsMobile: isMobile.isMobileOnly,
    accessToken:  localStorage.getItem('access_token') ||  '',
    currentUser : {}
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    WorkOrderService: WorkOrder,
    MenuService: Menu
  },
  getters:{
  }
})
