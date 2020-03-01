import Customer from "../models/Customer";

const customerService = {
  namespaced: true,
  state: {
    customers: []
  },
  mutations: {
    GET_CUSTOMERS(state, payload) {
      state.customers = payload;
    },
    ADD_CUSTOMER(state, payload) {
      state.customers.push(payload);
    },
    EDIT_CUSTOMER(state, payload) {
      state.customers[
        state.customers.findIndex(el => el.id == payload.id)
      ] = payload;
    },
    DELETE_CUSTOMER(state, payload) {
      state.customers.remove(function(el) {
        return el.id === payload.id;
      });
    }
  },
  actions: {
    async loadCustomers(context) {
      let response = (await Customer.api().get("/Customers")).response;
      if (response.status === 200) {
        await context.commit("GET_CUSTOMERS", response.data);
      }else if (response.data.error) {
        throw new Error('Something is wrong.')
      }
    },
    async addCustomer(context, payload) {
      let response = (await Customer.api().post("/customers", payload))
        .response;
      if (response.status === 200) {
        await context.commit("ADD_CUSTOMER", response.data);
      }else if (response.data.error) {
        throw new Error('Something is wrong.')
      }
    },
    async editCustomet(context, payload) {
      let response = (
        await Customer.api().put("/customers/" + payload.id, payload)
      ).response;
      if (response.status === 200) {
        context.commit("DELETE_CUSTOMER", payload);
      }else if (response.data.error) {
        throw new Error('Something is wrong.')
      }
    },
    async deleteCustomer(context, payload) {
      let response = (
        await Customer.api().delete("/customers/" + payload.id, { delete: 42 })
      ).response;
      if (response.status === 200) {
        context.commit("DELETE_CUSTOMER", payload);
      }else if (response.data.error) {
        throw new Error('Something is wrong.')
      }
    }
  },
  getters: {
    getCustomers: (state) => state.customers,
    getCustomer: (state) => (customerId) =>
      state.find(item => item.id === customerId),
    getCustomersCount: (state) => state.customers.length,
    getDisabledCustomersCount: (state) =>
      state.customers.filter(el => el.disabled === true).length
  }
};

export default customerService;
