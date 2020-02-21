<template>
  <v-app>
    <app-drawer></app-drawer>
    <app-bar></app-bar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-btn
      bottom
      :color="$store.state.defaultColor"
      dark
      fab
      fixed
      left
      @click="$store.dispatch('addNewTicket')"
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
</style>
