import SLASetting from "../models/SLASetting";

const sLASetting = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        async loadSLASettings() {
            let response = (await SLASetting.api().get("/SLASetting")).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async loadSLASetting(context, payload) {
            let response = (await SLASetting.api().get("/SLASetting/" + payload)).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async loadByCustomerID(context, payload){
            let response = (await SLASetting.api().get("/SLASetting/GetByCustomerID/" + payload)).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async addSLASetting(context, payload) {
            let response = (await SLASetting.api().post("/SLASetting", payload))
                .response;
            if (response.status === 201) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async editSLASetting(context, payload) {
            let response = (await SLASetting.api().put("/SLASetting", payload))
                .response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async patchSLASetting(context, payload) {
            let response = (
                await SLASetting.api().patch(
                    "/SLASetting/" + payload.id,
                    payload.patchDoc
                )
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async deleteSLASetting(context, payload) {
            let response = (
                await SLASetting.api().delete("/SLASetting/" + payload, {
                    delete: 42
                })
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        }
    },
    getters: {
        getSLASettings: () => SLASetting.all(),
        getSLASetting: () => SLASettingId => SLASetting.find(SLASettingId)
    }
};

export default sLASetting;
