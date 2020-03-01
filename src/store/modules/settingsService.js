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
          { name: "Operating Hours",label:"ساعات کاری", path: "/OperatingHours", icon: "" },
          { name: "SLA Policies",label:"توافق نامه سطح سرویس", path: "/SLAPoliceis", icon: "" },
          { name: "Groups",label:"گروه ها", path: "/Groups", icon: "" },
          { name: "Agents",label:"اپراتورها", path: "/Agents", icon: "" },
          { name: "Users",label:"کاربران", path: "/Users", icon: "" },
          { name: "Compnay",label:"مشتریان", path: "/CustomerList", icon: "" }
        ]
      },
      {
        name: "Channels",
        label:"کانال های ارتباطی",
        path: "/SettingsControlPanel",
        icon: "",
        items: [
          { name: "Operating Hours",label:"ساعات کاری", path: "/OperatingHours", icon: "" },
          { name: "SLA Policies",label:"توافق نامه سطح سرویس", path: "/SLAPoliceis", icon: "" },
          { name: "Groups",label:"گروه ها", path: "/Groups", icon: "" },
          { name: "Agents",label:"اپراتورها", path: "/Agents", icon: "" },
          { name: "Users",label:"کاربران", path: "/Users", icon: "" },
          { name: "Compnay",label:"مشتریان", path: "/Company", icon: "" }
        ]
      }
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
export default settingsService;
