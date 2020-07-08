<template>
    <v-container>
        <v-item-group
                v-for="header in $store.state.SettingsService.controlPanelItems"
                :key="header.name"
        >
            <v-container>
                <v-row>
                    <v-col>
                        <v-card>
                            <v-card-title>
                                <v-row>{{ header.label }}</v-row>
                            </v-card-title>
                            <v-card-text>
                                <v-row>
                                    <v-col
                                            :key="setting.name"
                                            v-for="setting in header.items"
                                            cols="12"
                                            md="2"
                                            align="center"
                                    >
                                        <v-item v-slot:default="{ active, toggle }">
                                            <v-row>
                                                <v-col>
                                                    <v-row no-gutters>
                                                        <v-col>
                                                            <router-link :to="setting.path">
                                                                <v-avatar
                                                                        :color="$store.state.defaultColor"
                                                                        size="110"
                                                                        @click="toggle"
                                                                >
                                                                    <img
                                                                            :src="getStaticImage(setting.image)"
                                                                            @click="toggle"
                                                                    >
                                                                </v-avatar>
                                                            </router-link>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row no-gutters>
                                                        <v-col>
                                                            <v-chip class="mt-3">
                                                                {{setting.label}}
                                                            </v-chip>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                        </v-item>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-item-group>
    </v-container>
</template>
<script>
    export default {
        name: "SettingsControlPanel",
        metaInfo: {
            title: "تنظیمات"
        }
    };
</script>

<style scoped>
</style>
