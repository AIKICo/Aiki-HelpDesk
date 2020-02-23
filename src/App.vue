<template>
  <v-app>
    <app-drawer v-if="$store.state.isLoggedIn"></app-drawer>
    <app-bar v-if="$store.state.isLoggedIn"></app-bar>
    <v-content>
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
    dark: false
  }),
  methods: {},
  mounted() {
    this.$Progress.finish();
  },
  created() {
    this.$Progress.start();
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
  transition: opacity 2s ease;
}

.fade-leave {
}

.fade-leave-active {
  transition: opacity 2s ease;
  opacity: 0;
}
</style>
