<template v-slot:items="props">
    <v-app-bar
            app
            :color="$store.state.defaultColor"
            dark
            :clipped-right="$vuetify.breakpoint.lgAndUp"
    >
        <v-app-bar-nav-icon @click.stop="$store.state.drawer = !$store.state.drawer"
                            v-if="$store.state.isLoggedIn"/>
        <v-icon x-large>
            mdi-handshake
        </v-icon>
        <v-toolbar-title class="col-2" v-if="!$store.state.IsMobile">
            <b>میزکار خدمات رایانه ای</b>
        </v-toolbar-title>
        <v-toolbar-title v-if="$store.state.IsMobile && !$store.state.isLoggedIn">
            <b>میزکار</b>
        </v-toolbar-title>
        <v-text-field
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="جستجو"
                v-if="$store.state.isLoggedIn"
        />
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
    export default {
        methods: {
            logout() {
                this.$store.dispatch('UserService/logout').then(()=>{
                    this.$store.state.isLoggedIn = false;
                    this.$router.push("/login");
                })
            }
        },
    }
</script>

<style scoped>

</style>