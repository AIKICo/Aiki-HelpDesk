import TicketCountInfo from "../models/TicketCountInfo";

const ticketCountInfoService = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        async loadTicketCountInfo() {
            let response = (await TicketCountInfo.api().get("/TicketCountInfo")).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
    },
    getters: {
    }
};

export default ticketCountInfoService;
