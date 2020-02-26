import axios from "axios";

var axiosInstance = axios.create({
  baseURL: 'https://aiki-ticket-app.herokuapp.com/api',
  /* other custom settings */
});

axiosInstance.defaults.headers.common['Authorization'] =  localStorage.getItem('access_token');
axiosInstance.defaults.headers.common['CompanyID'] =  localStorage.getItem('companyid');

const WorkOrder = {
  state: {
    tickets: [],
  },
    mutations: {
    NEW_TICKET() {
      alert("add a new ticket");
    },
    GET_TICKETS(state, payload) {
      state.tickets = payload;
    },
  },
  actions: {
    addNewTicket(context) {
      context.commit("NEW_TICKET");
    },
    async getTickets(context) {
      var response = await axiosInstance.get("/WorkOrder/GetNotEndWorkOrder");
      context.commit("GET_TICKETS", response.data);
    },
    async getTicketReports(context, payload){
      var response = await axiosInstance.get("/WorkOrder/GetWorkOrderReport/" + payload.wono);
      return response;
    }
  },
  getters: {
    getTickets: state => state.tickets.sort((a, b) => b.woNo - a.woNo),
    getTicketByID: state => wono =>
      state.tickets.find(workOrder => workOrder.woNo === wono),
  }
};

export default WorkOrder;
