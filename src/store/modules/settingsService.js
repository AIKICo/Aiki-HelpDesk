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
          { name: "Operating Hours",label:"ساعات کاری", path: "/OperationHoursList", image: "OperationHours.png" },
          { name: "SLA Policies",label:"توافق نامه سطح سرویس", path: "/SLASettings", image: "" },
          { name: "Groups",label:"گروه ها", path: "/Groups", image: "" },
          { name: "Agents",label:"اپراتورها", path: "/Agents", image: "" },
          { name: "Users",label:"کاربران", path: "/Users", image: "" },
          { name: "company",label:"مشتریان", path: "/CustomerList", image: "settings-customer.png" }
        ]
      },
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
export default settingsService;
