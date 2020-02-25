const settingsService = {
  namespace: true,
  state: {
    controlPanelItems: [
      {
        name: "GeneralSettings",
        path: "/SettingsControlPanel",
        icon: "",
        items: [{ name: "Operating Hours", path: "/OperatingHours", icon: "" }]
      }
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
export default settingsService;
