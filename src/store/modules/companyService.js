import Company from "../models/Company";
import store from "../index";
import axois from "axios";

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
            delete axois.defaults.headers.common.CompanyID;
            let response = (await Company.api().post("/company", payload))
                .response;
            axois.defaults.headers.common.CompanyID = store.state.companyId;
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