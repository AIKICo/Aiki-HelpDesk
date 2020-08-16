const settingsService = {
  namespaced: true,
  state: {
    controlPanelItems: [
      {
        name: "GeneralSettings",
        label:"عمومی",
        path: "/SettingsControlPanel",
        icon: "mdi-cogs",
        roles:"admin",
        items: [
          { name: "OperatingHours",label:"ساعات کاری", path: "/OperationHoursList", image: "OperatingHours.svg", imageType:'svg', roles:"admin" },
          { name: "SLA Policies",label:"قرارداد سطح سرویس", path: "/SLASettings", image: "SLA.svg", imageType:'svg', roles:"admin" },
          { name: "Members",label:"کاربران", path: "/Members", image: "UsersManagement.svg", imageType:'svg', roles:"admin" },
          { name: "customer",label:"مشتریان", path: "/CustomerList", image: "customer.svg", imageType:'svg', roles:"admin" },
          { name: "Groups",label:"گروه ها", path: "/Groups", image: "Groups.svg", imageType:'svg', roles:"admin" }
        ]
      },
      {
        name: "TicketSettings",
        label:"درخواست کار",
        path: "/SettingsControlPanel",
        icon: "mdi-notebook-outline",
        roles:"admin",
        items: [
          { name: "TicketStatus",label:"وضعیت", path: "/AppConstants/473b359f-30a7-4963-a671-6f618b277e48", image: "TicketStatus.svg",imageType:'svg', roles:"admin" },
          { name: "Tags",label:"برچسب", path: "/AppConstants/e215f24f-4d28-46e7-b75d-26a19feb656a", image: "Tags.svg", imageType:'svg', roles:"admin" },
          { name: "Category",label:"نوع", path: "/AppConstants/0a8b50c5-762e-47ea-b60d-4ed9d0a71f50", image: "Category.svg", imageType:'svg', roles:"admin" },
          { name: "OperandType",label:"اقدام صورت گرفته", path: "/AppConstants/416e2a28-cfc4-49f9-9bf1-6ef0451a5b7a", image: "OperandType.svg", imageType:'svg', roles:"admin" },
          { name: "OrganizeChartAttribute",label:"اطلاعات تکمیلی کاربران", path: "/AppConstants/416e2a28-cfc4-49f9-9bf1-6ef0451a5b7b", image: "OrganizeChartAttribute.svg", imageType:'svg', roles:"admin" },
          { name: "OrganizeChart",label:"چارت سازمانی", path: "/OrganizeCharts" , image: "OrganizeChart.svg", imageType:'svg' , roles:"admin"},
          { name: "OrganizeChartItemType",label:"گروه بندی سازمانی", path: "/AppConstants/0e5aa3a0-f7c5-4960-8fb2-a6e58b1f663b", image: "OrganizeChartItemType.svg", imageType:'svg', roles:"admin" },
        ]
      },
      {
        name: "AssetSettings",
        label:"اموال",
        path: "/SettingsControlPanel",
        icon: "mdi-desktop-classic",
        roles:"admin,backupuser",
        items: [
          { name: "AssetsTypes",label:"معرفی اقلام انبار", path: "/AppConstants/416e2a28-cfc4-49f9-9bf1-6ef0451a5b7e", image: "AssetsTypes.svg", imageType:'svg', roles:"admin,backupuser" },
          { name: "AssetsTypesDetails",label:"اطلاعات تکمیلی اقلام انبار", path: "/AppConstants/9c3a6fa5-9f5e-4af2-bded-f2b256b1fea4", image: "AssetsTypesDetails.svg", imageType:'svg',roles:"admin,backupuser" },
          { name: "AssetsLocation",label:"محل نصب اقلام", path: "/AppConstants/416e2a28-cfc4-49f9-9bf1-6ef0451a5b7f", image: "AssetsLocation.svg", imageType:'svg', roles:"admin,backupuser" },
          { name: "AssetsAdditionalInfo",label:"اطلاعات تکمیلی اموال", path: "/AppConstants/416e2a28-cfc4-49f9-9bf1-6ef0451a5b7D", image: "AssetsAdditionalInfo.svg", imageType:'svg', roles:"admin,backupuser" },
        ]
      },
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
export default settingsService;
