import OperatingHour from "../models/OperatingHour";

const operationHourService = {
  namespaced: true,
  stat: {},
  mutation: {},
  actions: {
    async loadOperationHours() {
      let response = (await OperatingHour.api().get("/OperationHours"))
        .response;
      if (response.status === 200) {
        return response;
      } else if (response.data.error) {
        throw new Error("Something is wrong.");
      }
    },
    async addOperationHours(context, payload) {
      let response = (
        await OperatingHour.api().post("/OperationHours", payload)
      ).response;
      if (response.status === 201) {
        return response;
      } else if (response.data.error) {
        throw new Error("Something is wrong.");
      }
    },
    async editOperationHours(context, payload) {
      let response = (await OperatingHour.api().put("/OperationHours", payload))
        .response;
      if (response.status === 200) {
        return response;
      } else if (response.data.error) {
        throw new Error("Something is wrong.");
      }
    }
  },
  getters: {
    getOperationsHours: () => OperatingHour.all(),
    getOperationsHour: () => Id => OperatingHour.find(Id)
  }
};

export default operationHourService;
