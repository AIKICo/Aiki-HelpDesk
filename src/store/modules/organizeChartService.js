import OrganizeChart from "../models/OrganizeChart";

const organizeChartService = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        async loadCustomers() {
            let response = (await OrganizeChart.api().get("/OrganizeCharts")).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async addCustomer(context, payload) {
            let response = (await OrganizeChart.api().post("/OrganizeCharts", payload))
                .response;
            if (response.status === 201) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async editCustomer(context, payload) {
            let response = (await OrganizeChart.api().put("/OrganizeCharts", payload)).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async patchCustomer(context, payload) {
            let response = (
                await OrganizeChart.api().patch("/OrganizeCharts/" + payload.id, payload.patchDoc)
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async deleteCustomer(context, payload) {
            let response = (
                await OrganizeChart.api().delete("/OrganizeCharts/" + payload, {delete: 42})
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        }
    },
    getters: {
        getCustomers: () => OrganizeChart.all(),
        getCustomer: () => customerId => OrganizeChart.find(customerId),
    }
};

export default organizeChartService;
