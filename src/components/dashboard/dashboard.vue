<template v-slot:items="props">
    <v-container>
        <v-row justify="center" align="center">
            <v-col cols="3">
                <dashboard-card
                        title="لیست انتظار"
                        card-icon="mdi-email-receive-outline"
                        :ticket-count="watinigItemCount"
                        :color="$store.state.defaultColor">
                </dashboard-card>
            </v-col>
            <v-col cols="3">
                <dashboard-card
                        title="فعال"
                        card-icon="mdi-email-open-outline"
                        :ticket-count="activeItemCount"
                        color="primary"
                ></dashboard-card>
            </v-col>
            <v-col cols="3">
                <dashboard-card
                        title="بسته"
                        card-icon="mdi-email-check-outline"
                        :ticket-count="closeItemCount"
                        color="green"></dashboard-card>
            </v-col>
            <v-col cols="3">
                <dashboard-card
                        title="رد شده"
                        card-icon="mdi-email-off-outline"
                        :ticket-count="rejectItemCount"
                        color="red"></dashboard-card>
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
    import {mapActions} from "vuex"

    export default {
        name: "dashboard",
        components: {ScatterChart, DashboardCard},
        metaInfo: {
            title: "داشبورد"
        },
        data() {
            return {
                items: [],
                watinigItemCount: 0,
                activeItemCount: 0,
                closeItemCount: 0,
                rejectItemCount: 0
            }
        },
        methods: {
            ...mapActions({
                getTicketCountInfo: "TicketCountInfoService/loadTicketCountInfo"
            })
        },
        created() {
            this.getTicketCountInfo().then((res) => {
                this.items = res.data;

                let waiting = this.lodash.filter(this.items, function (el) {
                    return el.tickettype === "39678e4c-74fc-4658-b6c9-dfffc07e1880"
                });
                if (waiting) {
                    this.watinigItemCount = waiting.length > 0 ? waiting[0].count : 0;
                }

                let active = this.lodash.filter(this.items, function (el) {
                    return el.tickettype === "b83b2e5c-6637-4997-9b62-e5c36be5af13"
                });
                if (active) {
                    this.activeItemCount = active.length > 0 ? active[0].count : 0;
                }

                let close = this.lodash.filter(this.items, function (el) {
                    return el.tickettype === "e746ba44-ccf0-4159-a60d-1f147656bdfc"
                });
                if (close) {
                    this.closeItemCount = close.length > 0 ? close[0].count : 0;
                }

                let reject = this.lodash.filter(this.items, function (el) {
                    return el.tickettype === "9e2a917a-fd55-4483-9270-e2a7fa3d69c0"
                });
                if (reject) {
                    this.rejectItemCount = reject.length > 0 ? reject[0].count : 0;
                }
            })
        }
    }
</script>

<style scoped>

</style>