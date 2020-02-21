<template>
    <v-row>
        <v-col cols="12" v-for="item in this.$store.getters.getTickets" :key="item.Wono">
            <v-card raised>
                <v-card-title class="justify-center">{{item.woNo}}</v-card-title>
                <v-card-subtitle>{{item.amval}}</v-card-subtitle>
                <v-card-text class="ml-3">{{item.needDescription}}</v-card-text>
                <v-card-actions>
                    <v-btn text>
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "TicketsMobileView",
        data: () => ({
            selectedItem: false,
        }),
    }
</script>

<style scoped>

</style>