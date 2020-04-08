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

const routes = [
    {
        name: "cartabl",
        path: "/cartabl",
        component: cartabl,
        meta: {
            requiresAuth: true
        }
    },
    {name: "login", path: "/login", component: login},
    {
        name: "root",
        path: "/",
        component: cartabl,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: "settingsControlPanel",
        path: "/SettingsControlPanel",
        component: settingsControlPanel,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: "CustomerList",
        path: "/CustomerList",
        component: CustomerList,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: "Customer",
        path: "/Customer/:formType/:id",
        component: Customer,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: "OperationHoursList",
        path: "/OperationHoursList",
        component: OperationHoursList,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: "OperationHours",
        path: "/OperationHours/:formType/:id",
        component: OperationHours,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: "SLASettings",
        path: "/SLASettings",
        component: SLASettingsList,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: "SLASetting",
        path: "/SLASetting/:formType/:id",
        component: SLASetting,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: "Members",
        path: "/Members",
        component: MembersList,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: "Member",
        path: "/Member/:formType/:id",
        component: Member,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: "Groups",
        path: "/Groups",
        component: GroupList,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: "Group",
        path: "/Group/:formType/:id",
        component: Group,
        meta: {
            requiresAuth: true
        }
    },
];

const router = new VueRouter({
    mode: "history",
    routes: routes
});

router.beforeEach((to, from, next) => {
    var allowAddRecord = ["CustomerList", "OperationHoursList","SLASettings","Members","cartabl","Groups"];
    if (to.meta.requiresAuth) {
        const authUser = JSON.parse(window.localStorage.getItem("userInfo"));
        if (!authUser || !authUser.token) {
            next({name: "login"});
        } else {
            store.state.allowAddRecord = allowAddRecord.includes(to.name);
            next();
        }
    } else if (to.name === "login") {
        const authUser = JSON.parse(window.localStorage.getItem("userInfo"));
        if (authUser) {
            next({name: "cartabl"});
        } else {
            next();
        }
    } else {
        next();
    }
});
export default router;
