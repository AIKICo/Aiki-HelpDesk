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
        <v-list-item-group v-model="item" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
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
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4"
        >میزکار خدمات رایانه ای</v-toolbar-title
      >
      <v-text-field
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="جستجو"
              class="hidden-sm-and-down"
              v-on="on"
      />
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid> </v-container>
    </v-content>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn bottom color="pink" dark fab fixed left v-on="on">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>ثبت درخواست کار جدید</span>
    </v-tooltip>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    drawer: null,
    mini: false,
    item: 1,
    items: [
      { text: "داشبورد", icon: "mdi-monitor-dashboard" },
      { text: "کارتابل", icon: "mdi-account-convert" },
      { text: "رهگیری درخواست", icon: "mdi-eye-check" },
      { text: "مدیریت اموال", icon: "mdi-desktop-classic" },
      { text: "تنظیمات", icon: "mdi-cogs" }
    ]
  })
};
</script>
<style scoped>
@import "css/font-face.scss";
* {
  font-family: "Iran Sans", sans-serif !important;
}
html {
  margin: 0;
  padding: 0;
}
.navigation-drawer__border {
  width: 10px !important;
  background-color: red !important;
}
</style>
