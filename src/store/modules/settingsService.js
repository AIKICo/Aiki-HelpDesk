const settingsService = {
  namespaced: true,
  state: {
    controlPanelItems: [
      {
        name: "GeneralSettings",
        label:"تنظیمات عمومی",
        path: "/SettingsControlPanel",
        icon: "",
        roles:"admin",
        items: [
          { name: "OperatingHours",label:"ساعات کاری", path: "/OperationHoursList", image: "OperationHours.png", roles:"admin" },
          { name: "SLA Policies",label:"قرارداد سطح سرویس", path: "/SLASettings", image: "SLA.png", roles:"admin" },
          { name: "Members",label:"کاربران", path: "/Members", image: "UsersManagement.png", roles:"admin" },
          { name: "company",label:"مشتریان", path: "/CustomerList", image: "settings-customer.png", roles:"admin" },
          { name: "Groups",label:"گروه ها", path: "/Groups", image: "Groups.png", roles:"admin" }
        ]
      },
      {
        name: "TicketSettings",
        label:"تنظیمات درخواست کار",
        path: "/SettingsControlPanel",
        icon: "",
        roles:"admin",
        items: [
          { name: "TicketStatus",label:"وضعیت های درخواست", path: "/AppConstants/473b359f-30a7-4963-a671-6f618b277e48", image: "", roles:"admin" },
          { name: "Tags",label:"برچسب ها", path: "/AppConstants/e215f24f-4d28-46e7-b75d-26a19feb656a", image: "", roles:"admin" },
          { name: "Category",label:"دسته بندی", path: "/AppConstants/0a8b50c5-762e-47ea-b60d-4ed9d0a71f50", image: "", roles:"admin" },
          { name: "OperandType",label:"اقدام صورت گرفته", path: "/AppConstants/416e2a28-cfc4-49f9-9bf1-6ef0451a5b7a", image: "", roles:"admin" },
          { name: "OrganizeChartAttribute",label:"اطلاعات تکمیلی کاربران", path: "/AppConstants/416e2a28-cfc4-49f9-9bf1-6ef0451a5b7b", image: "", roles:"admin" },
          { name: "OrganizeChart",label:"چارت سازمانی", path: "/OrganizeCharts" , image: "" },
          { name: "OrganizeChartItemType",label:"گروه بندی چارت سازمانی", path: "/AppConstants/0e5aa3a0-f7c5-4960-8fb2-a6e58b1f663b", image: "", roles:"admin" },
        ]
      },
      {
        name: "AssetSettings",
        label:"تنظیمات اموال",
        path: "/SettingsControlPanel",
        icon: "",
        roles:"admin",
        items: [
          { name: "AssetsTypes",label:"معرفی اقلام انبار", path: "/AppConstants/416e2a28-cfc4-49f9-9bf1-6ef0451a5b7e", image: "", roles:"admin" },
          { name: "AssetsTypesDetails",label:"اطلاعات تکمیلی اقلام انبار", path: "/AppConstants/9c3a6fa5-9f5e-4af2-bded-f2b256b1fea4", image: "",roles:"admin" },
          { name: "AssetsLocation",label:"محل نصب اقلام", path: "/AppConstants/416e2a28-cfc4-49f9-9bf1-6ef0451a5b7f", image: "", roles:"admin" },
          { name: "AssetsAdditionalInfo",label:"اطلاعات تکمیلی اموال", path: "/AppConstants/416e2a28-cfc4-49f9-9bf1-6ef0451a5b7D", image: "", roles:"admin" },
        ]
      },
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
export default settingsService;
