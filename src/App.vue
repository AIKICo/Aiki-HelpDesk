<template>
  <v-app>
    <v-navigation-drawer
      app
      :clipped="$vuetify.breakpoint.lgAndUp"
      :mini-variant.sync="mini"
      right
      v-model="drawer"
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>محمد مهرنیا</v-list-item-title>
            <v-list-item-subtitle>مدیریت</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider />
      <v-list shaped dense>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in this.$store.state.MenuService.menuItems" :key="i" :to="item.to">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="indigo"
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
              color="red"
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
    <v-btn bottom color="pink" dark fab fixed left @click="$store.dispatch('addNewTicket')">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <vue-progress-bar></vue-progress-bar>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
  },
  data: () => ({
    drawer: null,
    mini: false,
  }),
  methods: {
  },
  mounted() {
    this.$Progress.finish();
  },
  created() {
    this.$Progress.start();
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
