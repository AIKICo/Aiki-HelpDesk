import Customer from "../models/Customer";

const customerService = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        async loadCustomers() {
            let response = (await Customer.api().get("/Customers")).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async addCustomer(context, payload) {
            let response = (await Customer.api().post("/customers", payload))
                .response;
            if (response.status === 201) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async editCustomer(context, payload) {
            let response = (await Customer.api().put("/customers", payload)).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async patchCustomer(context, payload) {
            let response = (
                await Customer.api().patch("/customers/" + payload.id, payload.patchDoc)
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async deleteCustomer(context, payload) {
            let response = (
                await Customer.api().delete("/customers/" + payload.id, {delete: 42})
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        }
    },
    getters: {
        getCustomers: () => Customer.all(),
        getCustomer: () => customerId => Customer.find(customerId),
        getCustomersCount: () => Customer.all().length,
        getDisabledCustomersCount: () => Customer.query().where(record => record.disabled === true).get().length
    }
};

export default customerService;
