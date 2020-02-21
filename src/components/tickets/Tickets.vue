<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="this.$store.getters.getTickets"
          item-key="woNo"
          class="elevation-1"
          :expanded.sync="expanded"
          :single-expand="singleExpand"
          :disable-pagination="true"
          :hide-default-footer="true"
        >
          <template v-slot:top>
            <component
              :is="activeComponent"
              v-bind="activeComponentProperty"
              @close-sheet="closeSheet"
            ></component>
          </template>
          <template v-slot:item="{ item, expand, isExpanded }">
            <tr
              :key="item.woNo"
              @mouseover="selectItem(item)"
              @mouseleave="unSelectItem()"
            >
              <td class="text-center">
                <v-icon
                  class="ml-1"
                  :color="$store.state.defaultColor"
                  @click="expand(!isExpanded)"
                >
                  {{ isExpanded ? "mdi-chevron-up" : "mdi-chevron-down" }}
                </v-icon>
                <v-chip :color="$store.state.defaultColor + ' lighten-5'" :text-color="$store.state.defaultColor">
                  {{ item.woNo }}
                </v-chip>
              </td>
              <td class="text-center">{{ item.woTime }}</td>
              <td class="text-center">{{ item.woDate }}</td>
              <td>
                {{ item.askerCode }}
              </td>
              <td>
                <p v-if="item.oprCode != 'انجام دهنده تعيين نشده'">
                  {{ item.oprCode }}
                </p>
              </td>
              <td class="text-center">
                <b>{{ item.amval }}</b>
              </td>
              <td>
                <div v-if="item === selectedItem">
                  <v-btn icon :color="$store.state.defaultColor" @click="showHistorySheet(item)">
                    <v-icon>mdi-history</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    :color="$store.state.defaultColor"
                    @click="nextStageTicket(item)"
                  >
                    <v-icon>mdi-check-circle</v-icon>
                  </v-btn>
                  <v-btn icon :color="$store.state.defaultColor" @click="closeTicket(item)">
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    :color="$store.state.defaultColor"
                    @click="showStarsheet(item, 'rateTicket')"
                  >
                    <v-icon>mdi-star</v-icon>
                  </v-btn>
                  <v-btn icon :color="$store.state.defaultColor" @click="rejectWorkOrder(item)">
                    <v-icon>mdi-cancel</v-icon>
                  </v-btn>
                </div>
                <div v-if="item!=selectedItem">
                  {{ item.lastStatus }}
                </div>
              </td>
            </tr>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <v-alert
                text
                dense
                :color="$store.state.defaultColor"
                icon="mdi-fire"
                border="left"
                class="mt-1"
              >
                {{ item.needDescription }}
              </v-alert>
            </td>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WorkorderTimeline from "./ticketTimeline";
import rateTicket from "./rateTicket";
import closeTicket from "./closeTicket";
import nextStageTicket from "./nextStageTicket";
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
      { text: "کد رهگیری", align: "center", value: "woNo", width: "150px" },
      { text: "ساعت ثبت", value: "woTime", align: "center" },
      { text: "تاریخ ثبت", value: "woDate", align: "center" },
      {
        text: "درخواست کننده",
        value: "askerCode",
        align: "center",
        width: "150px"
      },
      {
        text: "انجام دهنده",
        value: "oprCode",
        align: "center",
        width: "150px"
      },
      { text: "شماره اموال", value: "amval", align: "center" },
      {
        text: "",
        value: "actions",
        align: "center",
        sortable: false,
        width: "250px"
      }
    ]
  }),
  components: {
    WorkorderTimeline,
    rateTicket,
    closeTicket,
    nextStageTicket
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
    },
    unSelectItem() {
      this.selectedItem = false;
    },
    showHistorySheet(workorder) {
      this.activeComponent = "workorderTimeline";
      this.selectedWorkOrder = workorder;
      this.$store
        .dispatch("getTicketReports", { wono: workorder.woNo })
        .then(response => {
          this.sheet = !this.sheet;
          this.activeComponentProperty = {
            sheet: this.sheet,
            wonoReports: response.data,
            workorder: this.selectedWorkOrder
          };
        });
    },
    showStarsheet(workorder) {
      this.activeComponent = "rateTicket";
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
      this.activeComponent = "closeTicket";
      this.sheet = !this.sheet;
      this.selectedWorkOrder = workorder;
      this.activeComponentProperty = {
        sheet: this.sheet,
        workorder: workorder,
        commentItems: [
          { consCommentCode: 25, consCommentText: "نصب سیستم عامل" },
          { consCommentCode: 26, consCommentText: "رفع ایراد سخت افزاری" },
          { consCommentCode: 27, consCommentText: "تعویض تونر" },
          { consCommentCode: 28, consCommentText: "نصب و راه اندازی سیستم عامل" }
        ]
      };
    },
    nextStageTicket(workorder){
      this.activeComponent = "nextStageTicket";
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
  watch: {}
};
</script>

<style scoped></style>
