import Vue from 'vue'
import Vuex from 'vuex'
import isMobile from "mobile-device-detect"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    IsMobile: isMobile.isMobileOnly,
    menuItems: [
      { text: "داشبورد", icon: "mdi-monitor-dashboard" },
      { text: "کارتابل", icon: "mdi-account-convert" },
      { text: "رهگیری درخواست", icon: "mdi-eye-check" },
      { text: "مدیریت اموال", icon: "mdi-desktop-classic" },
      { text: "گزارشات", icon: "mdi-file-chart" },
      { text: "کاربران", icon: "mdi-account-supervisor" },
      { text: "چارت سازمانی", icon: "mdi-file-tree" },
      { text: "تنظیمات", icon: "mdi-cogs" }
    ],
    tickets: [
      {
        AR: "2142020025",
        Wono: "98002221",
        NeedDescription: "نیاز به یک عدد تونر 1320"
      },
      {
        AR: "2142020026",
        Wono: "98002222",
        NeedDescription: "نیاز به یک عدد تونر 1320"
      },
      {
        AR: "2142020027",
        Wono: "98002223",
        NeedDescription: "نیاز به یک عدد تونر 1320"
      },
      {
        AR: "2142020028",
        Wono: "98002224",
        NeedDescription: "نیاز به یک عدد تونر 1320"
      }
    ]
  },
  mutations: {
    newTicket() {
      alert("add new ticket");
    }
  },
  actions: {
  },
  modules: {
  },
  getters:{
    getTickets: state => {
      return state.tickets
    },
    getTicketByID: (state) => (wono) =>{
      return state.tickets.find(workOrder => workOrder.Wono === wono);
    }
  }
})
