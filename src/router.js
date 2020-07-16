import VueRouter from "vue-router";
import store from "./store/index";
import cartabl from "./components/tickets/Cartabl";
import login from "./components/auth/login";
import settingsControlPanel from "./components/settings/SettingsControlPanel";
import CustomerList from "./components/settings/generalSettings/customers/CustomerList";
import Customer from "./components/settings/generalSettings/customers/Customer";
import OperationHoursList from "./components/settings/generalSettings/operationHoures/OperationHoursList";
import OperationHours from "./components/settings/generalSettings/operationHoures/OperationHours";
import SLASettingsList from "./components/settings/generalSettings/SLASetting/SLASettingsList.vue";
import SLASetting from "./components/settings/generalSettings/SLASetting/SLASetting";
import MembersList from "./components/settings/generalSettings/members/MembersList";
import Member from "./components/settings/generalSettings/members/Member";
import GroupList from "./components/settings/generalSettings/groups/GroupList";
import Group from "./components/settings/generalSettings/groups/Group";
import AppConstantList from "./components/settings/generalSettings/appConstant/AppConstantList";
import AppConstant from "./components/settings/generalSettings/appConstant/AppConstant";
import OrganizeCharts from "./components/settings/generalSettings/organizeChart/OrganizeCharts";
import AssetList from "./components/assetManagement/AssetList";
import Asset from "./components/assetManagement/Asset";
import Ticket from "./components/tickets/Ticket";
import TicketsArchive from "./components/tickets/TicketsArchive";
import dashboard from "./components/dashboard/dashboard";
import registerUser from "./components/userManagement/registerUser";
import editProfile from "./components/profile/editProfile";
import registerUserConfirm from "./components/userManagement/registerUserConfirm";

const routes = [
    {
        name: "cartabl",
        path: "/cartabl",
        component: cartabl,
        meta: {
            requiresAuth: true,
            role: "admin,user"
        }
    },
    {
        name: "Ticket",
        path: "/Ticket/:formType/:id",
        component: Ticket,
        props: true,
        meta: {
            requiresAuth: true,
            role: "admin,user"
        }
    },
    {name: "login", path: "/login", component: login},
    {
        name: "root",
        path: "/",
        component: dashboard,
        meta: {
            requiresAuth: true,
            role: "admin,user"
        }
    },
    {
        name: "settingsControlPanel",
        path: "/SettingsControlPanel",
        component: settingsControlPanel,
        meta: {
            requiresAuth: true,
            role: "admin"
        }
    },
    {
        name: "CustomerList",
        path: "/CustomerList",
        component: CustomerList,
        meta: {
            requiresAuth: true,
            role: "admin,user"
        }
    },
    {
        name: "Customer",
        path: "/Customer/:formType/:id",
        component: Customer,
        props: true,
        meta: {
            requiresAuth: true,
            role: "admin,user"
        }
    },
    {
        name: "OperationHoursList",
        path: "/OperationHoursList",
        component: OperationHoursList,
        props: true,
        meta: {
            requiresAuth: true,
            role: "admin,user"
        }
    },
    {
        name: "OperationHours",
        path: "/OperationHours/:formType/:id",
        component: OperationHours,
        props: true,
        meta: {
            requiresAuth: true,
            role: "admin,user"
        }
    },
    {
        name: "SLASettings",
        path: "/SLASettings",
        component: SLASettingsList,
        props: true,
        meta: {
            requiresAuth: true,
            role: "admin,user"
        }
    },
    {
        name: "SLASetting",
        path: "/SLASetting/:formType/:id",
        component: SLASetting,
        props: true,
        meta: {
            requiresAuth: true,
            role: "admin,user"
        }
    },
    {
        name: "Members",
        path: "/Members",
        component: MembersList,
        props: true,
        meta: {
            requiresAuth: true,
            role: "admin,user"
        }
    },
    {
        name: "Member",
        path: "/Member/:formType/:id",
        component: Member,
        props: true,
        meta: {
            requiresAuth: true,
            role: "admin,user"
        }
    },
    {
        name: "Groups",
        path: "/Groups",
        component: GroupList,
        props: true,
        meta: {
            requiresAuth: true,
            role: "admin,user"
        }
    },
    {
        name: "Group",
        path: "/Group/:formType/:id",
        component: Group,
        props: true,
        meta: {
            requiresAuth: true,
            role: "admin,user"
        }
    },
    {
        name: "AppConstants",
        path: "/AppConstants/:id",
        component: AppConstantList,
        props: true,
        meta: {
            requiresAuth: true,
            role: "admin,user"
        }
    },
    {
        name: "AppConstant",
        path: "/AppConstant/:formType/:parentid/:id",
        component: AppConstant,
        props: true,
        meta: {
            requiresAuth: true,
            role: "admin,user"
        }
    },
    {
        name: "OrganizeCharts",
        path: "/OrganizeCharts",
        component: OrganizeCharts,
        props: true,
        meta: {
            requiresAuth: true,
            role: "admin,user"
        }
    },
    {
        name: "AssetList",
        path: "/AssetList",
        component: AssetList,
        props: true,
        meta: {
            requiresAuth: true,
            role: "admin,user"
        }
    },
    {
        name: "AssetListByCustomer",
        path: "/AssetList/:customerid",
        component: AssetList,
        props: true,
        meta: {
            requiresAuth: true,
            role: "admin,user"
        }
    },
    {
        name: "Asset",
        path: "/Asset/:formType/:id",
        component: Asset,
        props: true,
        meta: {
            requiresAuth: true,
            role: "admin,user"
        }
    },
    {
        name: "AssetByCustomer",
        path: "/Asset/:formType/:id/:customerid",
        component: Asset,
        props: true,
        meta: {
            requiresAuth: true,
            role: "admin,user"
        }
    },
    {
        name: "TicketsArchive",
        path: "/TicketsArchive",
        component: TicketsArchive,
        props: true,
        meta: {
            requiresAuth: true,
            role: "admin,user"
        }
    },
    {
        name: "dashboard",
        path: "/dashboard",
        component: dashboard,
        props: true,
        meta: {
            requiresAuth: true,
            role: "admin,user"
        }
    },
    {
        name: "registerUser",
        path: "/registerUser",
        component: registerUser,
        props: true,
        meta: {
            requiresAuth: false,
        }
    },
    {
        name: "editProfile",
        path: "/editProfile",
        component: editProfile,
        props: true,
        meta: {
            requiresAuth: true,
            role: "admin,user"
        }
    },
    {
        name: "registerUserConfirm",
        path: "/registerUserConfirm",
        component: registerUserConfirm,
        props: true,
        meta: {
            requiresAuth: false
        }
    }
];

const router = new VueRouter({
    mode: "history",
    routes: routes
});

router.beforeEach(async (to, from, next) => {
    const authUser = JSON.parse(window.localStorage.getItem("userInfo"));
    let allowAddRecord = [
        "CustomerList", "OperationHoursList", "SLASettings",
        "Members", "cartabl", "Groups", "AppConstants", "root"];
    if (to.name === "root") {
        if (authUser) {
            next({name: "dashboard"});
        } else {
            next({name:"login"});
        }
    }else if (to.meta.requiresAuth && to.meta.role.split(',').includes(store.state.memberRole)) {
        if (!authUser || !authUser.token) {
            next({name: "login"});
        } else {
            store.state.allowAddRecord = allowAddRecord.includes(to.name);
            next();
        }
    } else{
        next();
    }
});
export default router;
