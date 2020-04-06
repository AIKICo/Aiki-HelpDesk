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
          { name: "Members",label:"", path: "/Members", image: "UsersManagement.png" },
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
