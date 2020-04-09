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
          { name: "company",label:"", path: "/CustomerList", image: "settings-customer.png" },
          { name: "Groups",label:"", path: "/Groups", image: "Groups.png" }
        ]
      },
      {
        name: "TicketSettings",
        label:"تنظیمات درخواست کار",
        path: "/SettingsControlPanel",
        icon: "",
        items: [
          { name: "Ticket Status",label:"وضعیت های درخواست", path: "/TicketStatusList", image: "" },
          { name: "Tags",label:"برچسب ها", path: "/Tags", image: "" },
          { name: "Category",label:"دسته بندی", path: "/Gategories", image: "" },
          { name: "OrganizeChart",label:"چارت سازمانی", path: "/OrganizeChart", image: "" },
        ]
      },
      {
        name: "AssetSettings",
        label:"تنظیمات اموال",
        path: "/SettingsControlPanel",
        icon: "",
        items: [
          { name: "Assets",label:"معرفی اموال", path: "/Assets", image: "" },
          { name: "AssetsLocation",label:"موقعیت اموال", path: "/AssetsLocation", image: "" },
        ]
      },
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
export default settingsService;
