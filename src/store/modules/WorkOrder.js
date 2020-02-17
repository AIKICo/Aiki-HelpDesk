const WorkOrder={
    state:{
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
    mutations:{
        NEW_TICKET() {
            alert('add a ne wticket');
        }
    },
    actions:{
        addNewTicket({commit}){
            commit('NEW_TICKET');
        }
    },
    getters:{
        getTickets: state => state.tickets,
        getTicketByID: (state) => (wono) =>  state.tickets.find(workOrder => workOrder.Wono === wono)
    }
}

export default WorkOrder