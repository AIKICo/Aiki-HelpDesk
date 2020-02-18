import Axios from "axios";

const WorkOrder={
    state:{
        tickets: [],
    },
    mutations:{
        NEW_TICKET() {
            alert('add a new ticket');
        },
        GET_TICKETS(state, payload){
            state.tickets = payload;
        }
    },
    actions:{
        addNewTicket(context){
            context.commit('NEW_TICKET');
        },
        async getTickets(context){
            var response = await Axios.get('/WorkOrder/GetNotEndWorkOrder')
            context.commit('GET_TICKETS', response.data);
        }
    },
    getters:{
        getTickets: state => state.tickets,
        getTicketByID: (state) => (wono) =>  state.tickets.find(workOrder => workOrder.Wono === wono),
    }
}

export default WorkOrder