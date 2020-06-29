<template>
    <v-navigation-drawer
            app
            :clipped="$vuetify.breakpoint.lgAndUp"
            :mini-variant.sync="mini"
            right
            v-model="$store.state.drawer"
    >
        <template v-slot:prepend>
            <v-list-item two-line>
                <v-list-item-avatar>
                    <v-icon>
                        mdi-account
                    </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{ $store.state.memberName}}</v-list-item-title>
                    <v-list-item-subtitle>{{ $store.state.memberRole==="admin"?"مدیریت": "اپراتور"}}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </template>
        <v-divider/>
        <v-list shaped dense>
            <v-list-item-group :color="$store.state.defaultColor">
                <v-list-item
                        v-for="(item, i) in this.$store.state.MenuService.menuItems.filter(el=> el.role.split(',').includes($store.state.memberRole))"
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
        data: () => ({
            mini: false
        })
    };
</script>

<style scoped></style>
