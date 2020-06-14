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
                        :sort-by="['ticketfriendlynumber']"
                        :sort-desc="[true]"
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

                            <td class="text-center">
                                <v-chip :color="$store.state.defaultColor + ' lighten-5'"
                                        :text-color="$store.state.defaultColor">
                                    <b>{{ item.ticketfriendlynumber }}</b>
                                </v-chip>
                            </td>
                            <td class="text-center">{{ item.agentname }}</td>
                            <td class="text-center">{{ item.registerdate }}</td>
                            <td class="text-center">{{ item.tickettype }}</td>
                            <td class="text-center">{{ item.ticketcategory }}</td>
                            <td class="text-center">{{ item.tickettags }}</td>
                            <td class="text-center">
                                <v-chip :color="$store.state.defaultColor + ' lighten-5'"
                                        :text-color="$store.state.defaultColor">
                                    <b>{{ item.asset }}</b>
                                </v-chip>
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
            activeComponent: null,
            activeComponentProperty: {},
            headers: [
                {text: "", value: "", align: "center"},
                {text: "کد رهگیری", value: "ticketfriendlynumber", align: "center"},
                {text: "انجام دهنده", value: "agentname", align: "center", width: "155px"},
                {text: "تاریخ ثبت", value: "registerdate", align: "center", width: "165px"},
                {text: "نوع درخواست", value: "tickettype", align: "center", width: "120px"},
                {text: "گروه درخواست", value: "ticketcategory", align: "center"},
                {text: "برچسب درخواست", value: "tickettags", align: "center", width: "110px"},
                {text: "شماره اموال", value: "asset", align: "center"},
                {
                    text: "",
                    value: "actions",
                    align: "center",
                    sortable: false,
                    width: "220px"
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
                deleteTicket: "TicketService/deleteTicket",
                patchTicket: "TicketService/patchTicket",
                getTicketHistories:"TicketHistoryService/loadTicketHistories",
                addTicketHistory:"TicketHistoryService/addTicketHistory",
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
                this.getTicketHistories(this.selectedWorkOrder.id)
                    .then(response => {
                        this.sheet = !this.sheet;
                        this.activeComponentProperty = {
                            sheet: this.sheet,
                            wonoReports:this.lodash.orderBy(response.data,"historydate","desc"),
                            workorder: workorder,
                            wono: workorder.ticketfriendlynumber
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
                this.patchTicket({
                    id: this.selectedWorkOrder.id,
                    patchDoc:[
                        {
                            op:"replace",
                            path:"/tickettype",
                            value:"9e2a917a-fd55-4483-9270-e2a7fa3d69c0"
                        }
                    ]
                }).then((res)=>{
                    if (res.status==200){
                            this.selectedWorkOrder.tickettype="رد درخواست"
                    }
                });
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
                if ("actionName" in e){
                    if (e.dialogResult==="ok"){
                        switch (e.actionName) {
                            case "setRate":
                                this.patchTicket({
                                    id: this.selectedWorkOrder.id,
                                    patchDoc:[
                                        {
                                            op:"replace",
                                            path:"/ticketrate",
                                            value:e.rate
                                        }
                                    ]
                                });
                                break;
                        case "nextStage":
                            if (e.dialogResult==="ok"){
                                if (e.endTicket===false){
                                    if (e.historyComment!=""){
                                        this.addTicketHistory({
                                            ticketid:this.selectedWorkOrder.id,
                                            companyid:this.$store.state.companyId,
                                            historycomment: e.historyComment,
                                            agentname:e.nextStageAgentName===null ? this.$store.state.memberName : e.nextStageAgentName
                                        })
                                    }
                                }
                                else{
                                    this.patchTicket({
                                        id: this.selectedWorkOrder.id,
                                        patchDoc:[
                                            {
                                                op:"replace",
                                                path:"/tickettype",
                                                value:"e746ba44-ccf0-4159-a60d-1f147656bdfc"
                                            }
                                        ]
                                    }).then((res)=>{
                                        if (res.status==200){
                                            this.selectedWorkOrder.tickettype="بسته"
                                        }
                                    });
                                }
                            }
                            break;
                        }
                    }
                }
            }
        },
        created() {
            this.getTickets();
        }
    };
</script>

<style scoped></style>
