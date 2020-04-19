import OrganizeChart from "../models/OrganizeChart";

const organizeChartService = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        async loadOrganizeChart() {
            let response = (await OrganizeChart.api().get("/OrganizeCharts")).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async addOrganizeChart(context, payload) {
            let response = (await OrganizeChart.api().post("/OrganizeCharts", payload))
                .response;
            if (response.status === 201) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async editOrganizeChart(context, payload) {
            let response = (await OrganizeChart.api().put("/OrganizeCharts", payload)).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async patchOrganizeChart(context, payload) {
            let response = (
                await OrganizeChart.api().patch("/OrganizeCharts/" + payload.id, payload.patchDoc)
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async deleteOrganizeChart(context, payload) {
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
        getOrganizesChart: () => OrganizeChart.all(),
        getOrganizeChart: () => id => OrganizeChart.find(id),
    }
};

export default organizeChartService;
