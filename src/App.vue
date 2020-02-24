<template>
  <v-app>
    <app-drawer v-if="$store.state.isLoggedIn"></app-drawer>
    <app-bar v-if="$store.state.isLoggedIn"></app-bar>
    <v-content>
      <v-snackbar
        v-model="snackWithButtons"
        :timeout="timeout"
        bottom
        right
        class="snack"
      >
        {{ snackWithBtnText }}
        <v-spacer />
        <v-btn dark text color="#00f500" @click.native="refreshApp">
          {{ snackBtnText }}
        </v-btn>
        <v-btn icon @click="snackWithButtons = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-snackbar>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
    <v-btn
      bottom
      :color="$store.state.defaultColor"
      dark
      fab
      fixed
      left
      @click="$store.dispatch('addNewTicket')"
      v-if="$store.state.isLoggedIn"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <vue-progress-bar></vue-progress-bar>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar";
import AppDrawer from "./components/AppDrawer";
export default {
  name: "App",
  components: {
    AppBar,
    AppDrawer
  },
  data: () => ({
    dark: false,
    refreshing: false,
    registration: null,
    snackBtnText: '',
    snackWithBtnText: '',
    snackWithButtons: false,
    timeout: 0,
  }),
  methods: {
    showRefreshUI(e) {
      this.registration = e.detail;
      this.snackBtnText = 'بروز رسانی';
      this.snackWithBtnText = 'نسخه جدید در دسترس است!';
      this.snackWithButtons = true;
    },
    refreshApp() {
      this.snackWithButtons = false;
      if (!this.registration || !this.registration.waiting) { return; }
      this.registration.waiting.postMessage('skipWaiting');
    }
  },
  mounted() {
    this.$Progress.finish();
  },
  created() {
    this.$Progress.start();
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true });
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.href = window.location;
    });
  },
  watch: {
    dark: function(val) {
      this.$vuetify.theme.dark = val;
    }
  }
};
</script>
<style scoped>
@import "css/fontiran.css";

* {
  font-family: "IRANSans", sans-serif !important;
}
html {
  margin: 0;
  padding: 0;
}
.router-link-active {
  color: red;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 1s ease;
}

.fade-leave {
}

.fade-leave-active {
  transition: opacity 1s ease;
  opacity: 0;
}
.snack >>> .v-snack__content {
  padding-right: 16px;
}
</style>
