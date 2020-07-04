import Company from "../models/Company";

const companyService={
    namespaced:true,
    state:{
        companies:[]
    },
    mutations:{
        GET_COMPANIES_LIST(state, payload){
            state.companies = payload;
        }
    },
    actions:{
        async addCompany(context, payload) {
            let response = (await Company.api().post("/company", payload))
                .response;
            if (response.status === 201) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
    },
    getters:{
        getCompanies: (state) => state.companies,
        getCompany:(state) => (companyID) => state.find(item=> item.id===companyID)
    }
};

export default companyService;