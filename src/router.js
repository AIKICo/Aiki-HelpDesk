import VueRouter from "vue-router";
import cartabl from "./components/tickets/Cartabl";
import login from "./components/auth/login";
import settingsControlPanel from "./components/settings/SettingsControlPanel";
import Company from "./components/settings/generalSettings/company/Company";

const routes = [
  {
    name: "cartabl",
    path: "/cartabl",
    component: cartabl,
    meta: {
      requiresAuth: true
    }
  },
  { name: "login", path: "/login", component: login },
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
    name: "Company",
    path: "/Company",
    component: Company,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes: routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem("userInfo"));
    if (!authUser || !authUser.token) {
      next({ name: "login" });
    } else {
      next();
    }
  } else if (to.name === "login") {
    const authUser = JSON.parse(window.localStorage.getItem("userInfo"));
    if (authUser) {
      next({ name: "cartabl" });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
