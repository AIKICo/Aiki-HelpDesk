<template>
    <v-container>
        <v-row justify="center" align="center">
            <v-col cols="3">
                <dashboard-card
                        title="لیست انتظار"
                        ticket-count="10">
                </dashboard-card>
            </v-col>
            <v-col cols="3">
                <dashboard-card
                        title="فعال"
                        ticket-count="15"
                ></dashboard-card>
            </v-col>
            <v-col cols="3">
                <dashboard-card
                        title="بسته"
                        ticket-count="20"></dashboard-card>
            </v-col>
            <v-col cols="3">
                <dashboard-card
                        title="رد شده"
                        ticket-count="35"></dashboard-card>
            </v-col>
        </v-row>
        <v-row>
            <scatter-chart></scatter-chart>
        </v-row>
    </v-container>
</template>

<script>
    import DashboardCard from "./dashboardCard";
    import ScatterChart from "./scatterChart";

    export default {
        name: "dashboard",
        components: {ScatterChart, DashboardCard}
    }
</script>

<style scoped>

</style>