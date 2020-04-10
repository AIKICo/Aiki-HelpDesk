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
          { name: "Ticket Status",label:"وضعیت های درخواست", path: "/AppConstants/473b359f-30a7-4963-a671-6f618b277e48", image: "" },
          { name: "Tags",label:"برچسب ها", path: "/AppConstants/e215f24f-4d28-46e7-b75d-26a19feb656a", image: "" },
          { name: "Category",label:"دسته بندی", path: "/AppConstants/0a8b50c5-762e-47ea-b60d-4ed9d0a71f50", image: "" },
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
