import Group from "../models/Group";

const groupService = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        async loadCustomers() {
            let response = (await Group.api().get("/Groups")).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async addCustomer(context, payload) {
            let response = (await Group.api().post("/Groups", payload))
                .response;
            if (response.status === 201) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async editCustomer(context, payload) {
            let response = (await Group.api().put("/Groups", payload)).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async patchCustomer(context, payload) {
            let response = (
                await Group.api().patch("/Groups/" + payload.id, payload.patchDoc)
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async deleteCustomer(context, payload) {
            let response = (
                await Group.api().delete("/Groups/" + payload.id, {delete: 42})
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        }
    },
    getters: {
        getCustomers: () => Group.all(),
        getCustomer: () => groupId => Group.find(groupId),
    }
};

export default groupService;
