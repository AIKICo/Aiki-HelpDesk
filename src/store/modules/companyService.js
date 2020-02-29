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
        async loadCompaniesList(context){
            let response=undefined;
            console.log(response);

            await context.commit("GET_COMPANIES_LIST", undefined);
        }
    },
    getters:{
        getCompanies: (state) => state.companies,
        getCompany:(state) => (companyID) => state.find(item=> item.id===companyID)
    }
};

export default companyService;