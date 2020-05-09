import Asset from "../models/Asset";

const assetService = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        async loadAssets() {
            let response = (await Asset.api().get("/Assets")).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async addAsset(context, payload) {
            let response = (await Asset.api().post("/Assets", payload))
                .response;
            if (response.status === 201) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async editAsset(context, payload) {
            let response = (await Asset.api().put("/Assets", payload)).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async patchAsset(context, payload) {
            let response = (
                await Asset.api().patch("/Assets/" + payload.id, payload.patchDoc)
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async deleteAsset(context, payload) {
            let response = (
                await Asset.api().delete("/Assets/" + payload.id, {delete: 42})
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        }
    },
    getters: {
        getAssets: () => Asset.all(),
        getAsset: () => assetId => Asset.find(assetId),
    }
};

export default assetService;
