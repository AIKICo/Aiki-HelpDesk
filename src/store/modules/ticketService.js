import Ticket from "../models/Ticket";
import TicketsView from "../models/TicketsView";
import Last30Ticket from "../models/Last30Ticket";

const ticketService = {
    namespaced: true,
    state: {
        current:[],
        loader:false,
    },
    mutations: {
        SET_LOADER(state, payload) {
            state.loader = payload;
        },
        SET_CURRENT(state, payload) {
            state.current = payload;
        },
    },
    actions: {
        async loadTickets({commit}) {
            commit("SET_LOADER", true);
            let response = (await TicketsView.api().get("/TicketsView")).response;
            if (response.status === 200) {
                commit("SET_CURRENT", response.data);
                commit("SET_LOADER", false);
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async loadAllTickets({commit}) {
            commit("SET_LOADER", true);
            let response = (await TicketsView.api().get("/TicketsView/GetAll")).response;
            if (response.status === 200) {
                commit("SET_LOADER", false);
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async loadAllTicketsByCompanyId({commit}, payload) {
            commit("SET_LOADER", true);
            let response = (await TicketsView.api().get("/TicketsView/GetAll/" + payload)).response;
            if (response.status === 200) {
                commit("SET_LOADER", false);
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async loadTicket({commit},payload) {
            commit("SET_LOADER", true);
            let response = (await Ticket.api().get("/Tickets/" + payload)).response;
            if (response.status === 200) {
                commit("SET_LOADER", false);
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async loadLast30Ticket({commit}) {
            commit("SET_LOADER", true);
            let response = (await Last30Ticket.api().get("/Tickets/GetLast30Ticket")).response;
            if (response.status === 200) {
                commit("SET_LOADER", false);
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async addTicket(context, payload) {
            let response = (await Ticket.api().post("/Tickets", payload))
                .response;
            if (response.status === 201) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async editTicket(context, payload) {
            let response = (await Ticket.api().put("/Tickets", payload)).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async patchTicket(context, payload) {
            let response = (
                await Ticket.api().patch("/Tickets/" + payload.id, payload.patchDoc)
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async deleteTicket(context, payload) {
            let response = (
                await Ticket.api().delete("/Tickets/" + payload, {delete: 42})
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        }
    },
    getters: {
        getTicketsLength: () => Ticket.all().length,
        getTickets: () => Ticket.all(),
        getTicket: () => ticketid => Ticket.find(ticketid),
    }
};

export default ticketService;
