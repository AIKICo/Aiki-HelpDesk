import Group from "../models/Group";

const groupService = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        async loadGroups() {
            let response = (await Group.api().get("/Groups")).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async addGroup(context, payload) {
            let response = (await Group.api().post("/Groups", payload))
                .response;
            if (response.status === 201) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async editGroup(context, payload) {
            let response = (await Group.api().put("/Groups", payload)).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async patchGroup(context, payload) {
            let response = (
                await Group.api().patch("/Groups/" + payload.id, payload.patchDoc)
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async deleteGroup(context, payload) {
            let response = (
                await Group.api().delete("/Groups/" + payload, {delete: 42})
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        }
    },
    getters: {
        getGroups: () => Group.all(),
        getGroup: () => groupId => Group.find(groupId),
    }
};

export default groupService;
