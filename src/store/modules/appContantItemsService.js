import AppConstantItem from "../models/AppConstantItem";

const appConstantItemsService = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        async loadAppConstantItems(context, payload) {
            let response = (await AppConstantItem.api().get("/AppConstantItems/GetByParentId/" + payload)).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async loadAppConstantItem(context, payload) {
            let response = (await AppConstantItem.api().get("/AppConstantItems/" + payload)).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async addAppConstantItem(context, payload) {
            let response = (await AppConstantItem.api().post("/AppConstantItems", payload))
                .response;
            if (response.status === 201) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async editAppConstantItem(context, payload) {
            let response = (await AppConstantItem.api().put("/AppConstantItems", payload)).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async patchAppConstantItem(context, payload) {
            let response = (
                await AppConstantItem.api().patch("/AppConstantItems/" + payload.id, payload.patchDoc)
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async deleteAppConstantItem(context, payload) {
            let response = (
                await AppConstantItem.api().delete("/AppConstantItems/" + payload, {delete: 42})
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        }
    },
    getters: {
        getAppConstantItems: () => AppConstantItem.all(),
        getAppConstantItem: () => groupId => AppConstantItem.find(groupId),
    }
};

export default appConstantItemsService;
