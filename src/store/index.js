import Vue from "vue";
import axios from "axios";
import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";
import VuexORMAxios from "@vuex-orm/plugin-axios";
import isMobile from "mobile-device-detect";

import WorkOrder from "./modules/WorkOrder";
import menuService from "./modules/menuService";
import userService from "./modules/userService";
import settingsService from "./modules/settingsService";
import companyService from "./modules/companyService";
import customerService from "./modules/customerService";
import operationHourService from "./modules/operationHourService";
import sLASettingService from './modules/sLASettingService';

import User from "./models/User";
import Company from "./models/Company";
import Customer from "./models/Customer";
import OperatingHour from "./models/OperatingHour";
import SLASetting  from "./models/SLASetting";

Vue.use(Vuex);
VuexORM.use(VuexORMAxios, { axios });

const database = new VuexORM.Database();
database.register(User);
database.register(Company);
database.register(Customer);
database.register(OperatingHour);
database.register(SLASetting);

export default new Vuex.Store({
  plugins: [VuexORM.install(database)],
  state: {
    IsMobile: isMobile.isMobileOnly,
    accessToken: localStorage.getItem("access_token") || "",
    currentUser: {},
    isLoggedIn: !!localStorage.getItem("userInfo"),
    allowAddRecord: false,
    drawer: null,
    defaultColor: "indigo",
    defaultTextColor: "indigo--text",
    defaultHeaderTextColor: "white--text",
    defaultBadgeColor: "red",
    companyId:localStorage.getItem('companyid')
  },
  mutations: {},
  actions: {},
  modules: {
    WorkOrderService: WorkOrder,
    MenuService: menuService,
    UserService: userService,
    SettingsService: settingsService,
    CompanyService:companyService,
    CustomerService:customerService,
    OperationHourService: operationHourService,
    SLASettingService: sLASettingService
  },
  getters: {}
});
