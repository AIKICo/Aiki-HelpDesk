<template>
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
        <v-list-item
          v-for="(item, i) in this.$store.state.MenuService.menuItems"
          :key="i"
          :to="item.to"
        >
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
</template>

<script>
export default {
  name: "drawerMenu",
  data: () => ({
    drawer: null,
    mini: false
  })
};
</script>

<style scoped></style>
