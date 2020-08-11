<template v-slot:items="props">
    <v-card>
        <v-list-item>
            <v-list-item-avatar :color="color">
                <v-icon dark>{{cardIcon}}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="headline">{{ticketCount}}</v-list-item-title>
                <v-list-item-subtitle>{{title}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-card>
</template>

<script>
    export default {
        name: "dashboardCard",
        props:["title", "ticketCount", "cardIcon", "color"],
        data(){
            return{

            }
        }
    }
</script>

<style scoped>
    .v-card > *:last-child:not(.v-btn):not(.v-chip){
        text-align: center;
    }
    .headline{
        font-family: "IRANSans", sans-serif !important;
    }
</style>
