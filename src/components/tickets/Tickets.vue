<template v-slot:items="props">
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table
            :disable-pagination="true"
            :expanded.sync="expanded"
            :headers="headers"
            :hide-default-footer="true"
            :items="tickets"
            :single-expand="singleExpand"
            :sort-by="['ticketfriendlynumber']"
            :sort-desc="[true]"
            group-by="customertitle"
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
                @mouseover="selectItem(item)">
              <td class="text-center">
                <v-icon
                    :color="$store.state.defaultColor"
                    @click="expand(!isExpanded)"
                    class="ml-1"
                >
                  {{ isExpanded ? "mdi-chevron-up" : "mdi-chevron-down" }}
                </v-icon>
              </td>
              <v-tooltip top>
                <template v-slot:activator="{on, attr}">
                  <td class="text-center" v-on="on" v-bind="attr">
                    <v-chip :color="$store.state.defaultColor + ' lighten-5'"
                            :text-color="$store.state.defaultColor">
                      <b>{{ item.ticketfriendlynumber }}</b>
                    </v-chip>
                  </td>
                </template>
                <span>{{ item.description }}</span>
              </v-tooltip>
              <td class="text-center">{{ item.agentname }}</td>
              <td class="text-center">{{ item.registerdate }}</td>
              <td class="text-center">{{ item.tickettype }}</td>
              <td class="text-center" >{{ item.requester }}</td>

              <td class="text-center">
                <v-chip :color="$store.state.defaultColor + ' lighten-5'"
                        :text-color="$store.state.defaultColor" v-if="item.asset!==null">
                  <b>{{ item.asset }}</b>
                </v-chip>
              </td>
              <td>
                <div v-if="item === selectedItem">
                  <v-tooltip top>
                    <template v-slot:activator="{on, attr}">
                      <v-btn :color="$store.state.defaultColor"
                             @click="showHistorySheet(item)" icon
                             v-on="on"
                             v-bind="attr">
                        <v-icon>mdi-history</v-icon>
                      </v-btn>
                    </template>
                    <span>تاریخچه</span>
                  </v-tooltip>

                  <v-tooltip top>
                    <template v-slot:activator="{on, attr}">
                      <v-btn
                          :color="$store.state.defaultColor"
                          @click="nextStageTicket(item)"
                          icon v-on="on"
                          v-bind="attr">
                        <v-icon>mdi-account-arrow-left</v-icon>
                      </v-btn>
                    </template>
                    <span>ارجاع</span>
                  </v-tooltip>

                  <v-tooltip top>
                    <template v-slot:activator="{on, attr}">
                      <v-btn :color="$store.state.defaultColor"
                             @click="closeTicket(item)"
                             icon v-on="on"
                             v-bind="attr">
                        <v-icon>mdi-close-circle</v-icon>
                      </v-btn>
                    </template>
                    <span>بستن درخواست</span>
                  </v-tooltip>

                  <v-tooltip top>
                    <template v-slot:activator="{on, attr}">
                      <v-btn
                          :color="$store.state.defaultColor"
                          @click="showStarsheet(item, 'rateTicket')"
                          icon v-on="on"
                          v-bind="attr"
                          v-if="$store.state.memberRole==='admin'">
                        <v-icon>mdi-star</v-icon>
                      </v-btn>
                    </template>
                    <span>ارزیابی ناظر</span>
                  </v-tooltip>

                  <v-tooltip top>
                    <template v-slot:activator="{on, attr}">
                      <v-btn :color="$store.state.defaultColor"
                             @click="rejectWorkOrder(item)"
                             icon v-on="on"
                             v-bind="attr">
                        <v-icon>mdi-text-box-remove</v-icon>
                      </v-btn>
                    </template>
                    <span>رد درخواست</span>
                  </v-tooltip>

                  <v-tooltip top>
                    <template v-slot:activator="{on, attr}">
                      <v-btn :color="$store.state.defaultColor"
                             @click="editTicket(item)"
                             icon
                             v-on="on"
                             v-bind="attr">
                        <v-icon>mdi-content-save-edit-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>ویرایش درخواست</span>
                  </v-tooltip>
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
              <v-chip-group>
                <v-chip
                    class="ma-2"
                    color="primary"
                >
                  <v-icon left>mdi-account-circle-outline</v-icon>
                  {{ item.lasthistorycomment }}
                </v-chip>
                <v-chip
                    class="ma-2"
                    color="green"
                    text-color="white"
                    v-if="item.ticketcategory!=null"
                >
                  <v-icon left>mdi-shield-bug</v-icon>
                  {{ item.ticketcategory }}
                </v-chip>
                <v-chip
                    class="ma-2"
                    color="pink"
                    text-color="white"
                    v-if="item.tickettags!=null"
                >
                  <v-icon left>mdi-label</v-icon>
                  {{ item.tickettags }}
                </v-chip>
                <v-chip
                    class="ma-2"
                    color="red"
                    text-color="white"
                    v-if="item.requestpriority!=null"
                >
                  <v-icon left>mdi-flag-variant</v-icon>
                  {{ item.requestpriority }}
                </v-chip>
              </v-chip-group>

            </td>
          </template>
          <template v-slot:group.header="{items, isOpen, toggle}">
            <th colspan="100%" style="background-color: white">
              <v-btn text icon small @click="toggle">
                <v-icon>{{ isOpen ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
              </v-btn>
              <span class="mx-2 group-title"> {{ items[0].customertitle }}</span>
            </th>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-tooltip top v-if="$store.state.isLoggedIn">
      <template v-slot:activator="{on, attr}">
        <v-btn
            bottom
            color="red"
            dark
            fab
            fixed
            left
            @click="loadData()"
            v-on="on"
            v-bind="attr"
            style="margin-left: 58px"
            class="mb-6"
        >
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </template>
      <span>بارگذاری مجدد</span>
    </v-tooltip>
  </v-container>

</template>

<script>
import TicketTimeline from "./TicketTimeline";
import RateTicket from "./RateTicket";
import CloseTicket from "./CloseTicket";
import NextStageTicket from "./NextStageTicket";
import {mapActions} from 'vuex'

export default {
  name: "Tickets",
  data: () => ({
    tickets: [],
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
      {text: "تاریخ ثبت", value: "registerdate", align: "center", width: "170px"},
      {text: "وضعیت", value: "tickettype", align: "center", width: "120px"},
      {text: "درخواست کننده", value: "requester", align: "center", width: "130px"},
      {text: "شماره اموال", value: "asset", align: "center"},
      {
        text: "",
        value: "actions",
        align: "center",
        sortable: false,
        width: "250px"
      }
    ],
    timer: null
  }),
  components: {
    TicketTimeline,
    RateTicket,
    CloseTicket,
    NextStageTicket
  },
  computed: {},
  methods: {
    ...mapActions({
      getTickets: "TicketService/loadTickets",
      deleteTicket: "TicketService/deleteTicket",
      patchTicket: "TicketService/patchTicket",
      getTicketHistories: "TicketHistoryService/loadTicketHistories",
      addTicketHistory: "TicketHistoryService/addTicketHistory",
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
              wonoReports: this.lodash.orderBy(response.data, "historydate", "desc"),
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
        patchDoc: [
          {
            op: "replace",
            path: "/tickettype",
            value: "9e2a917a-fd55-4483-9270-e2a7fa3d69c0"
          }
        ]
      }).then(() => {
        this.selectedWorkOrder.enddate = new Date().toISOString();
        this.refreshData();
      });
    },
    closeTicket(workorder) {
      this.activeComponent = "CloseTicket";
      this.sheet = !this.sheet;
      this.selectedWorkOrder = workorder;
      this.activeComponentProperty = {
        sheet: this.sheet,
        workorder: workorder,
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
      this.activeComponent = null;
      if ("actionName" in e) {
        if (e.dialogResult === "ok") {
          switch (e.actionName) {
            case "setRate":
              this.patchTicket({
                id: this.selectedWorkOrder.id,
                patchDoc: [
                  {
                    op: "replace",
                    path: "/ticketrate",
                    value: e.rate
                  }
                ]
              });
              break;
            case "nextStage":
              if (e.dialogResult === "ok") {
                if (e.endTicket === false) {
                  if (e.historyComment != "") {
                    if (e.nesxtStageAgentName != "") {
                      this.addTicketHistory({
                        ticketid: this.selectedWorkOrder.id,
                        historycomment: `درخواست کار به ${e.nesxtStageAgentName} ارجاع داده شد `,
                        agentname: null
                      }).then(() => {
                        setTimeout(() => {
                          this.addTicketHistory({
                            ticketid: this.selectedWorkOrder.id,
                            historycomment: e.historyComment,
                            agentname: e.nesxtStageAgentName
                          }).then(() => {
                            this.selectedWorkOrder.agentname = e.nesxtStageAgentName;
                          });
                        }, 1000);
                      });
                    } else {
                      this.addTicketHistory({
                        ticketid: this.selectedWorkOrder.id,
                        historycomment: e.historyComment,
                        agentname: this.$store.state.memberName
                      }).then(() => {
                        this.selectedWorkOrder.agentname = this.$store.state.memberName;
                      });
                    }
                  }
                } else {
                  this.addTicketHistory({
                    ticketid: this.selectedWorkOrder.id,
                    historycomment: e.historyComment,
                    agentname: this.$store.state.memberName
                  });
                  setTimeout(() => {
                    this.patchTicket({
                      id: this.selectedWorkOrder.id,
                      patchDoc: [
                        {
                          op: "replace",
                          path: "/tickettype",
                          value: "e746ba44-ccf0-4159-a60d-1f147656bdfc"
                        }
                      ]
                    }).then((res) => {
                      if (res.status == 200) {
                        this.selectedWorkOrder.enddate = new Date().toISOString();
                        this.refreshData();
                      }
                    });
                  }, 1000);
                }
              }
              break;
            case "closeTicket":
              if (e.dialogResult === "ok") {
                this.patchTicket({
                  id: this.selectedWorkOrder.id,
                  patchDoc: [
                    {
                      op: "replace",
                      path: "/mandays",
                      value: e.workorder.mandays
                    },
                    {
                      op: "replace",
                      path: "/operateid",
                      value: e.workorder.operateid
                    },
                    {
                      op: "replace",
                      path: "/tickettype",
                      value: "e746ba44-ccf0-4159-a60d-1f147656bdfc"
                    }
                  ]
                }).then((res) => {
                  if (res.status == 200) {
                    this.selectedWorkOrder.enddate = new Date().toISOString();
                    this.refreshData();
                  }
                });
              }
              break;
          }
        }
      }
    },
    loadData() {
      this.getTickets().then((res) => {
        if (this.$store.state.memberRole === "admin") {
          this.tickets = res.data;
          this.$store.state.activeTickets = this.tickets.length;
        } else {
          let memberName = this.$store.state.memberName;
          this.tickets = this.lodash.filter(res.data, item=>item.agentname===memberName);
          this.$store.state.activeTickets = this.tickets.filter(function (el) {
            return (el.agentname === memberName)
          }).length;
        }
      });
    },
    refreshData() {
      this.tickets = this.lodash.filter(this.tickets, item => item.enddate === null);
    },
    editTicket(item) {
      this.$router.push("/Ticket/Edit/" + item.id);
    }
  },
  created() {
    this.loadData();
    this.timer = setInterval(() => {
      this.refreshData();
    }, 30000)
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.group-title {
  font-size: medium;
  font-weight: normal;
}
</style>
