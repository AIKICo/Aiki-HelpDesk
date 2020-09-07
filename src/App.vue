<template v-slot:items="props">
  <v-app>
    <app-drawer v-if="$store.state.isLoggedIn && !showSplash"></app-drawer>
    <app-bar v-if="!showSplash"></app-bar>
    <v-main>
      <v-snackbar
          v-model="snackWithButtons"
          :timeout="timeout"
          bottom
          left
          class="snack"
      >
        {{ snackWithBtnText }}
        <v-spacer/>
        <v-btn dark text color="#00f500" @click.native="refreshApp">
          {{ snackBtnText }}
        </v-btn>
        <v-btn icon @click="snackWithButtons = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-snackbar>
      <transition name="fade" mode="out-in">
        <router-view :key="$route.fullPath"></router-view>
      </transition>
    </v-main>
    <v-footer :color="$store.state.defaultColor + ' white--text'" absolute inset app v-if="!showSplash">
      <v-row no-gutters v-if="!$store.state.IsMobile">
        <v-col>
          <span><b>تدوین و توسعه:</b> شرکت ایده پردازان دانش هوش مصنوعی</span>
        </v-col>
        <v-col cols="2">
          <span><b>برنامه نویس:</b>محمد مهرنیا</span>
        </v-col>
        <v-col cols="3">
          <span><b>پست الترونیک:</b>moh.mehrnia@gmail.com</span>
        </v-col>
        <v-col cols="3">
          <span><b>تحت لایسنس: </b><a style="color: white"
                                      href="https://opensource.org/licenses/MIT">MIT LICENSE</a></span>
        </v-col>
      </v-row>
      <v-row no-gutters v-if="$store.state.IsMobile">
        <v-col>
          <v-row no-gutters>
            <v-col>
              <span> شرکت ایده پردازان دانش هوش مصنوعی</span>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <span>moh.mehrnia@gmail.com</span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-footer>
    <v-tooltip top v-if="$store.state.isLoggedIn && $store.state.allowAddRecord"
    >
      <template v-slot:activator="{on, attr}">
        <v-btn
            bottom
            color="red"
            dark
            fab
            fixed
            left
            @click="newTicket()"
            v-on="on"
            v-bind="attr"
            class="mb-6"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>درج</span>
    </v-tooltip>
    <vue-progress-bar v-if="!showSplash"></vue-progress-bar>
    <vue-splash
        :show="showSplash"
        :logo="logo"
        color="#00bfa5"
        :size="800"
        :fixed="true"
    />
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar";
import AppDrawer from "./components/AppDrawer";
import * as firebase from "firebase/app";

export default {
  name: "App",
  components: {
    AppBar,
    AppDrawer
  },
  metaInfo: {
    changed(metaInfo) {
      if (navigator.onLine) {
        firebase.analytics().setCurrentScreen(metaInfo.title);
        firebase.analytics().logEvent("page_view");
        firebase.analytics().logEvent("screen_view", {
          app_name: "aiki-helpdesk-v1",
          screen_name: metaInfo.title,
          app_version: "1.0"
        });
      }
    }
  },
  data: () => ({
    dark: false,
    refreshing: false,
    registration: null,
    snackBtnText: "",
    snackWithBtnText: "",
    snackWithButtons: false,
    timeout: -1,
    showSplash:true
  }),
  methods: {
    showRefreshUI(e) {
      this.registration = e.detail;
      this.snackBtnText = "بروز رسانی";
      this.snackWithBtnText = "نسخه جدید در دسترس است!";
      this.snackWithButtons = true;
    },
    refreshApp() {
      this.snackWithButtons = false;
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      window.opener.location.reload(true);
      window.self.close();

      this.registration.waiting.postMessage("skipWaiting");
    },
    newTicket() {
      if (this.$router.currentRoute.name === "CustomerList") {
        this.$router.push("/Customer/Insert/undefined");
      } else if (this.$router.currentRoute.name === "OperationHoursList") {
        this.$router.push("/OperationHours/Insert/undefined");
      } else if (this.$router.currentRoute.name === "SLASettings") {
        this.$router.push("/SLASetting/Insert/undefined");
      } else if (this.$router.currentRoute.name === "Members") {
        this.$router.push("/Member/Insert/undefined");
      } else if (this.$router.currentRoute.name === "Groups") {
        this.$router.push("/Group/Insert/undefined");
      } else if (this.$router.currentRoute.name === "AppConstants") {
        this.$router.push("/AppConstant/Insert/" + this.$router.currentRoute.params.id + "/undefined");
      } else if (this.$router.currentRoute.name === "cartabl") {
        this.$router.push("/Ticket/Insert/undefined");
      } else if (this.$router.currentRoute.name === "root") {
        this.$router.push("/Ticket/Insert/undefined");
      }
    }
  },
  mounted() {
    this.$Progress.finish();
  },
  created() {
    this.$Progress.start();
    document.addEventListener("swUpdated", this.showRefreshUI, {once: true});
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
    });
    if (localStorage.getItem("userInfo")) {
      this.$store.isLoggedIn = true;
      this.$store.dispatch("UserService/notificationStart");
    }
    setTimeout(()=>{
      this.showSplash=false;
    },3000)
  },
  computed: {
    logo() {
      return this.getStaticImage('splash.png');
    }
  },
  watch: {
    dark: function (val) {
      this.$vuetify.theme.dark = val;
    }
  }
};
</script>
<style scoped>
@import "css/fontiran.css";
@import "css/notification.scss";

* {
  font-family: "IRANSans", sans-serif;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 500ms ease;
}

.fade-leave {
}

.fade-leave-active {
  transition: opacity 500ms ease;
  opacity: 0;
}

#app {
  background-image: url("assets/support-bg-polygon.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
