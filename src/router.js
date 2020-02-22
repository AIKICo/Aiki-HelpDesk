import VueRouter from "vue-router";
import cartabl from "./components/tickets/cartabl";
import login from "./components/members/login";

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
  { name: "root", path: "/", component: login }
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
