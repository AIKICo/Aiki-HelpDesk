<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-data-table
                        :disable-pagination="true"
                        :expanded.sync="expanded"
                        :headers="headers"
                        :hide-default-footer="true"
                        :items="this.items"
                        :single-expand="singleExpand"
                        class="elevation-1"
                        item-key="id"
                >
                    <template v-slot:top>
                        <component
                                :is="activeComponent"
                                @close-sheet="closeSheet"
                                v-bind="activeComponentProperty"
                        ></component>
                    </template>
                    <template v-slot:item="{ item, expand, isExpanded }">
                        <tr
                                :key="item.id"
                                @mouseleave="unSelectItem()"
                                @mouseover="selectItem(item)"
                        >
                            <td class="text-center">
                                <v-icon
                                        :color="$store.state.defaultColor"
                                        @click="expand(!isExpanded)"
                                        class="ml-1"
                                >
                                    {{ isExpanded ? "mdi-chevron-up" : "mdi-chevron-down" }}
                                </v-icon>
                            </td>
                            <td class="text-center">{{ item.registerdate }}</td>
                            <td class="text-center">{{ item.tickettype }}</td>
                            <td class="text-center">{{ item.ticketcategory }}</td>
                            <td class="text-center">{{ item.tickettags }}</td>
                            <td class="text-center">
                                <b>{{ item.asset }}</b>
                            </td>
                            <td>
                                <div v-if="item === selectedItem">
                                    <v-btn :color="$store.state.defaultColor" @click="showHistorySheet(item)" icon>
                                        <v-icon>mdi-history</v-icon>
                                    </v-btn>
                                    <v-btn
                                            :color="$store.state.defaultColor"
                                            @click="nextStageTicket(item)"
                                            icon
                                    >
                                        <v-icon>mdi-check-circle</v-icon>
                                    </v-btn>
                                    <v-btn :color="$store.state.defaultColor" @click="closeTicket(item)" icon>
                                        <v-icon>mdi-close-circle</v-icon>
                                    </v-btn>
                                    <v-btn
                                            :color="$store.state.defaultColor"
                                            @click="showStarsheet(item, 'rateTicket')"
                                            icon
                                    >
                                        <v-icon>mdi-star</v-icon>
                                    </v-btn>
                                    <v-btn :color="$store.state.defaultColor" @click="rejectWorkOrder(item)" icon>
                                        <v-icon>mdi-cancel</v-icon>
                                    </v-btn>
                                </div>
                            </td>
                        </tr>
                    </template>
                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                            <v-alert
                                    :color="$store.state.defaultColor"
                                    border="left"
                                    class="mt-1"
                                    dense
                                    icon="mdi-fire"
                                    text
                            >
                                {{ item.description }}
                            </v-alert>
                        </td>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import TicketTimeline from "./TicketTimeline";
    import RateTicket from "./RateTicket";
    import CloseTicket from "./CloseTicket";
    import NextStageTicket from "./NextStageTicket";
    import {mapState, mapActions} from 'vuex'

    export default {
        name: "Tickets",
        data: () => ({
            expanded: [],
            singleExpand: true,
            selectedItem: false,
            editedIndex: -1,
            editedItem: [],
            sheet: false,
            selectedWorkOrder: {},
            activeComponent: "",
            activeComponentProperty: {},
            headers: [
                {text: "تاریخ ثبت", value: "registerdate", align: "center"},
                {text: "نوع درخواست", value: "tickettype", align: "center"},
                {text: "گروه درخواست", value: "ticketcategory", align: "center"},
                {text: "برچسب درخواست", value: "tickettags", align: "center"},
                {text: "شماره اموال", value: "asset", align: "center"},
                {
                    text: "",
                    value: "actions",
                    align: "center",
                    sortable: false,
                    width: "350px"
                }
            ]
        }),
        components: {
            TicketTimeline,
            RateTicket,
            CloseTicket,
            NextStageTicket
        },
        computed: {
            ...mapState({
                items: state => state.TicketService.current
            })
        },
        methods: {
            ...mapActions({
                getTickets: "TicketService/loadTickets",
                deleteTicket: "TicketService/deleteTicket"
            }),
            selectItem(item) {
                this.selectedItem = item;
            },
            unSelectItem() {
                this.selectedItem = false;
            },
            showHistorySheet(workorder) {
                this.activeComponent = "ticket-timeline";
                this.selectedWorkOrder = workorder;
                this.$store
                    .dispatch("WorkOrderService/getTicketReports", {wono: this.selectedWorkOrder.woNo})
                    .then(response => {
                        this.sheet = !this.sheet;
                        this.activeComponentProperty = {
                            sheet: this.sheet,
                            wonoReports: response.data,
                            workorder: workorder,
                            wono: workorder.woNo
                        };
                    });
            },
            showStarsheet(workorder) {
                this.activeComponent = "RateTicket";
                this.sheet = !this.sheet;
                this.selectedWorkOrder = workorder;
                this.activeComponentProperty = {
                    sheet: this.sheet,
                    workorder: workorder
                };
            },
            rejectWorkOrder(workorder) {
                this.selectedWorkOrder = workorder;
            },
            closeTicket(workorder) {
                this.activeComponent = "CloseTicket";
                this.sheet = !this.sheet;
                this.selectedWorkOrder = workorder;
                this.activeComponentProperty = {
                    sheet: this.sheet,
                    workorder: workorder,
                    commentItems: [
                        {consCommentCode: 25, consCommentText: "نصب سیستم عامل"},
                        {consCommentCode: 26, consCommentText: "رفع ایراد سخت افزاری"},
                        {consCommentCode: 27, consCommentText: "تعویض تونر"},
                        {consCommentCode: 28, consCommentText: "نصب و راه اندازی سیستم عامل"},
                        {consCommentCode: 29, consCommentText: "نصب و راه اندازی سیستم عامل"}
                    ]
                };
            },
            nextStageTicket(workorder) {
                this.activeComponent = "NextStageTicket";
                this.sheet = !this.sheet;
                this.selectedWorkOrder = workorder;
                this.activeComponentProperty = {
                    sheet: this.sheet,
                    workorder: workorder
                };
            },
            closeSheet(e) {
                this.sheet = e.sheet;
                this.activeComponentProperty = {
                    sheet: this.sheet,
                    workorder: this.selectedWorkOrder
                };
                if ("workorder" in e) {
                    console.log(e.workorder);
                }
            }
        },
        created() {
            this.getTickets();
        }
    };
</script>

<style scoped></style>
