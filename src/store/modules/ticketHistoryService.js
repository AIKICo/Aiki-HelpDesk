import TicketHistory from "../models/TicketHistory";

const ticketHistoryService = {
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
        async loadTicketHistories({commit},payload) {
            commit("SET_LOADER", true);
            let response = (await TicketHistory.api().get("/TicketHistory/TicketHistoryByTicketID/" + payload)).response;
            if (response.status === 200) {
                commit("SET_LOADER", false);
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async addTicketHistory(context, payload) {
            let response = (await TicketHistory.api().post("/TicketHistory", payload))
                .response;
            if (response.status === 201) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async editTicketHistory(context, payload) {
            let response = (await TicketHistory.api().put("/icketHistory", payload)).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async patchTicketHistory(context, payload) {
            let response = (
                await TicketHistory.api().patch("/TicketHistory/" + payload.id, payload.patchDoc)
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async deleteTicketHistory(context, payload) {
            let response = (
                await TicketHistory.api().delete("/TicketHistory/" + payload, {delete: 42})
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        }
    },
    getters: {
        getTicketHistoriesLength: () => TicketHistory.all().length,
        getTicketHistories: () => TicketHistory.all(),
        getTicketHistory: () => tickethistoryid => TicketHistory.find(tickethistoryid),
    }
};

export default ticketHistoryService;
