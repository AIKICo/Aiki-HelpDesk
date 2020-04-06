const settingsService = {
  namespaced: true,
  state: {
    controlPanelItems: [
      {
        name: "GeneralSettings",
        label:"تنظیمات عمومی",
        path: "/SettingsControlPanel",
        icon: "",
        items: [
          { name: "Operating Hours",label:"", path: "/OperationHoursList", image: "OperationHours.png" },
          { name: "SLA Policies",label:"", path: "/SLASettings", image: "SLA.png" },
          { name: "Agents",label:"اپراتورها", path: "/Agents", image: "" },
          { name: "Users",label:"کاربران", path: "/Users", image: "" },
          { name: "company",label:"", path: "/CustomerList", image: "settings-customer.png" }
        ]
      },
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
export default settingsService;
