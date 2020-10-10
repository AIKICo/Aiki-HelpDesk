<template v-slot:items="props">
  <v-navigation-drawer
      app
      :clipped="$vuetify.breakpoint.lgAndUp"
      :mini-variant.sync="mini"
      :right="$vuetify.rtl===true"
      v-model="$store.state.drawer"
  >
    <template v-slot:prepend>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon :color="$store.state.defaultColor">
            mdi-account
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            {{ $store.state.memberName }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-wrap">
            {{ $store.state.memberRole === "admin" ? $t('main_menu.rolename_admin') : $t('main_menu.rolename_agent') }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/editProfile" dense>
        <v-list-item-avatar>
          <v-icon :color="$store.state.defaultColor">
            mdi-cog-outline
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{$t('main_menu.profile_settings')}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-divider/>
    <v-list shaped dense>
      <v-list-item-group :color="$store.state.defaultColor">
        <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon" :color="$store.state.defaultColor"></v-icon>
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
  data: () => ({
    mini: false,
    items: []
  }),
  created() {
    let menuItems= [
      {text: this.$t('main_menu.dashboard'), icon: "mdi-monitor-dashboard", to: '/dashboard', role: "admin,user,backupuser"},
      {text: this.$t('main_menu.cartabl'), icon: "mdi-briefcase-check", to: "/cartabl", role: "admin,user,backupuser"},
      {text: this.$t('main_menu.ticket_acrhive'), icon: "mdi-archive", to: "/TicketsArchive", role: "admin,user,backupuser"},
      {text: this.$t('main_menu.asset_management'), icon: "mdi-desktop-classic", to: '/AssetList', role: "admin,backupuser"},
      {text: this.$t('main_menu.settings'), icon: "mdi-cogs", to: "/settingsControlPanel", role: "admin,backupuser"}
    ];
    this.items = menuItems.filter(el => el.role.split(',').includes(this.$store.state.memberRole));
  }
};
</script>

<style scoped></style>
