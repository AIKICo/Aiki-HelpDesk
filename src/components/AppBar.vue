<template v-slot:items="props">
  <v-app-bar
      app
      :color="$store.state.defaultColor"
      dark
      :clipped-right="$vuetify.rtl===true?$vuetify.breakpoint.lgAndUp:null"
      :clipped-left="$vuetify.rtl!==true?$vuetify.breakpoint.lgAndUp:null"
  >
    <v-app-bar-nav-icon @click.stop="$store.state.drawer = !$store.state.drawer"
                        v-if="$store.state.isLoggedIn"/>
    <v-icon x-large>
      mdi-handshake
    </v-icon>
    <v-toolbar-title>
      <b>{{$t('general.app_title')}}</b>
      <span v-if="$store.state.isLoggedIn">({{ this.companyName }})</span>
    </v-toolbar-title>
    <v-spacer/>
    <v-btn icon @click="this.logout" v-if="$store.state.isLoggedIn">
      <v-icon large>mdi-logout</v-icon>
    </v-btn>
    <v-badge
        bordered
        :color="$store.state.defaultBadgeColor"
        overlap
        offset-y="17"
        offset-x="17"
        v-if="$store.state.isLoggedIn"
    >
      <span slot="badge">{{ $store.state.activeTickets }}</span>
      <v-btn icon>
        <v-icon large>mdi-bell</v-icon>
      </v-btn>
    </v-badge>
  </v-app-bar>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState({
      companyName: state => state.companyName
    })
  },
  methods: {
    logout() {
      this.$i18n.locale = 'fa';
      this.$vuetify.lang.current = 'fa';

      this.$store.dispatch('UserService/logout').then(() => {
        this.$store.state.isLoggedIn = false;
        this.$router.push("/login");
      })
    }
  },
}
</script>

<style scoped>

</style>
