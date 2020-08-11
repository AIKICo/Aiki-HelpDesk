import Vue from "vue";
import axios from "axios";
import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";
import VuexORMAxios from "@vuex-orm/plugin-axios";
import VuexORMSearch from '@vuex-orm/plugin-search'

import isMobile from "mobile-device-detect";

import menuService from "./modules/menuService";
import userService from "./modules/userService";
import settingsService from "./modules/settingsService";
import companyService from "./modules/companyService";
import customerService from "./modules/customerService";
import operationHourService from "./modules/operationHourService";
import sLASettingService from './modules/sLASettingService';
import memberService from "./modules/memberService";
import groupService from "./modules/groupService";
import appConstantItemsService from "./modules/appContantItemsService";
import organizeChartService from "./modules/organizeChartService";
import organizeCharts_JsonViewService from "./modules/organizeCharts_JsonViewService";
import assetService from "./modules/assetService";
import ticketService from "./modules/ticketService";
import ticketHistoryService from "./modules/ticketHistoryService";
import ticketCountInfoService from "./modules/ticketCountInfoService";
import profilePictureService from "@/store/modules/profilePictureService";

import User from "./models/User";
import Company from "./models/Company";
import Customer from "./models/Customer";
import OperatingHour from "./models/OperatingHour";
import SLASetting from "./models/SLASetting";
import Member from "./models/Member";
import Group from "./models/Group";
import AppConstantItem from "./models/AppConstantItem";
import OrganizeChart from "./models/OrganizeChart";
import OrganizeCharts_JsonView from "./models/OrganizeCharts_JsonView";
import Asset from "./models/Asset";
import AssetsView from "./models/AssetsView";
import Ticket from "./models/Ticket";
import TicketsView from "./models/TicketsView";
import TicketHistory from "./models/TicketHistory";
import Last30Ticket from "./models/Last30Ticket";
import TicketCountInfo from "./models/TicketCountInfo";
import ProfilePicture from "@/store/models/ProfilePicture";

Vue.use(Vuex);
VuexORM.use(VuexORMAxios, {axios});
VuexORM.use(VuexORMSearch, {
    // Configure default fuse.js options here (see "Configuration" section below).
})

const database = new VuexORM.Database();
database.register(User);
database.register(Company);
database.register(Customer);
database.register(OperatingHour);
database.register(SLASetting);
database.register(Member);
database.register(Group);
database.register(AppConstantItem);
database.register(OrganizeChart);
database.register(OrganizeCharts_JsonView);
database.register(Asset);
database.register(AssetsView);
database.register(Ticket);
database.register(TicketsView);
database.register(TicketHistory);
database.register(Last30Ticket);
database.register(TicketCountInfo);
database.register(ProfilePicture)

export default new Vuex.Store({
    plugins: [VuexORM.install(database)],
    state: {
        IsMobile: isMobile.isMobileOnly,
        accessToken: localStorage.getItem("access_token") || "",
        currentUser: {},
        isLoggedIn: !!localStorage.getItem("userInfo"),
        isOnline: navigator.onLine,
        allowAddRecord: false,
        drawer: null,
        defaultColor: "indigo",
        defaultTextColor: "indigo--text",
        defaultHeaderTextColor: "white--text",
        defaultBadgeColor: "red",
        companyId: localStorage.getItem("companyid"),
        memberName: localStorage.getItem("userInfo") != null ? JSON.parse(localStorage.getItem("userInfo")).membername : null,
        memberRole: localStorage.getItem("userInfo") != null ? JSON.parse(localStorage.getItem("userInfo")).roles : null,
        memberid: localStorage.getItem("userInfo") != null ? JSON.parse(localStorage.getItem("userInfo")).id : null,
        companyName: localStorage.getItem("userInfo") != null ? JSON.parse(localStorage.getItem("userInfo")).companyName : null,
        isUserActive: null,
        activeTickets: 0,
        connection: null
    },
    mutations: {},
    actions: {},
    modules: {
        MenuService: menuService,
        UserService: userService,
        SettingsService: settingsService,
        CompanyService: companyService,
        CustomerService: customerService,
        OperationHourService: operationHourService,
        SLASettingService: sLASettingService,
        MemberService: memberService,
        GroupService: groupService,
        AppConstantItemsService: appConstantItemsService,
        OrganizeChartService: organizeChartService,
        OrganizeChartsJsonView: organizeCharts_JsonViewService,
        AssetService: assetService,
        TicketService: ticketService,
        TicketHistoryService: ticketHistoryService,
        TicketCountInfoService: ticketCountInfoService,
        ProfilePictureService: profilePictureService
    },
    getters: {}
});
