<template>
  <v-app>
    <drawer-menu></drawer-menu>
    <v-app-bar
      app
      :color="$store.state.defaultColor"
      dark
      :clipped-right="$vuetify.breakpoint.lgAndUp"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4 hidden-sm-and-down"
        >میزکار خدمات رایانه ای</v-toolbar-title
      >
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="جستجو"
      />
      <v-spacer />
      <v-badge
              bordered
              :color="$store.state.defaultBadgeColor"
              overlap
      >
        <span slot="badge">{{this.$store.getters.getTickets.length}}</span>
        <v-icon large>mdi-bell</v-icon>
      </v-badge>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-btn bottom :color="$store.state.defaultColor" dark fab fixed left @click="$store.dispatch('addNewTicket')">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <vue-progress-bar></vue-progress-bar>
  </v-app>
</template>

<script>
import DrawerMenu from "./components/drawerMenu";
export default {
  name: "App",
  components: {
    DrawerMenu
  },
  data: () => ({
    dark:false,
  }),
  methods: {
  },
  mounted() {
    this.$Progress.finish();
  },
  created() {
    this.$Progress.start();
  },
  watch:{
    dark: function(val){
      this.$vuetify.theme.dark=val;
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
