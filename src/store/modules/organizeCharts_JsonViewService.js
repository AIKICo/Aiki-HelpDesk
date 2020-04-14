import OrganizeCharts_JsonView from "../models/OrganizeCharts_JsonView";

const organizeCharts_JsonViewService = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        async loadOrganizeCharts_JsonView(context, payload) {
            let response = (await OrganizeCharts_JsonView.api().get("/OrganizeChartsJsonView/GetByCompanyId/" + payload)).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
    },
    getters: {
        getOrganizeCharts_JsonView: () => OrganizeCharts_JsonView.all(),
    }
};

export default organizeCharts_JsonViewService;
