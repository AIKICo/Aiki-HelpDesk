<template>
    <v-container>
        <v-row justify="center" align="center">
            <v-col cols="3">
                <dashboard-card
                        title="لیست انتظار"
                        card-icon="mdi-email-receive-outline"
                        :ticket-count="watinigItemCount">
                </dashboard-card>
            </v-col>
            <v-col cols="3">
                <dashboard-card
                        title="فعال"
                        card-icon="mdi-email-open-outline"
                        :ticket-count="activeItemCount"
                ></dashboard-card>
            </v-col>
            <v-col cols="3">
                <dashboard-card
                        title="بسته"
                        card-icon="mdi-email-check-outline"
                        :ticket-count="closeItemCount"></dashboard-card>
            </v-col>
            <v-col cols="3">
                <dashboard-card
                        title="رد شده"
                        card-icon="mdi-email-off-outline"
                        :ticket-count="rejectItemCount"></dashboard-card>
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
                items:[],
                watinigItemCount:0,
                activeItemCount:0,
                closeItemCount:0,
                rejectItemCount:0
            }
        },
        methods:{
            ...mapActions({
                getTicketCountInfo:"TicketCountInfoService/loadTicketCountInfo"
            })
        },
        created() {
            this.getTicketCountInfo().then((res)=>{
                this.items = res.data;
                this.watinigItemCount = this.lodash.filter(this.items, function (el) {
                    return el.tickettype==="39678e4c-74fc-4658-b6c9-dfffc07e1880"
                })[0].count;

                this.activeItemCount = this.lodash.filter(this.items, function (el) {
                    return el.tickettype==="b83b2e5c-6637-4997-9b62-e5c36be5af13"
                })[0].count;

                this.closeItemCount = this.lodash.filter(this.items, function (el) {
                    return el.tickettype==="e746ba44-ccf0-4159-a60d-1f147656bdfc"
                })[0].count;

                this.rejectItemCount = this.lodash.filter(this.items, function (el) {
                    return el.tickettype==="9e2a917a-fd55-4483-9270-e2a7fa3d69c0"
                })[0].count;
            })
        }
    }
</script>

<style scoped>

</style>