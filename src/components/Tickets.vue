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
            <v-dialog v-model="dialog" max-width="290">
              <component
                :is="dialogType"
                v-dynamic-events="knownEvents"
              ></component>
            </v-dialog>
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
                  color="indigo"
                  @click="expand(!isExpanded)"
                >
                  mdi-chevron-down
                </v-icon>
                <v-chip color="indigo lighten-5" text-color="indigo">
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
                  <v-btn
                    icon
                    color="indigo"
                    @click="showDialog(item, 'historyTicket')"
                  >
                    <v-icon>mdi-history</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    color="indigo"
                    @click="showDialog(item, 'waitingAcceptUser')"
                  >
                    <v-icon>mdi-check-circle</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    color="indigo"
                    @click="showDialog(item, 'closeTicket')"
                  >
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    color="indigo"
                    @click="showDialog(item, 'rateTicket')"
                  >
                    <v-icon>mdi-star</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    color="indigo"
                    @click="showDialog(item, 'cancelTicket')"
                  >
                    <v-icon>mdi-cancel</v-icon>
                  </v-btn>
                </div>
              </td>
            </tr>
          </template>

          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <v-alert
                text
                dense
                color="indigo"
                icon="mdi-clock-fast"
                border="left"
                class="mt-3"
              >
                {{ item.needDescription }}
              </v-alert>
              <p>
                <v-chip color="indigo darken-3" outlined>
                  <v-icon left>mdi-fire</v-icon>
                  {{ item.lastStatus }}
                </v-chip>
              </p>
            </td>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import rateTicket from "./rateTicket";
export default {
  name: "Tickets",
  data: () => ({
    expanded: [],
    singleExpand: true,
    selectedItem: false,
    dialog: false,
    dialogType: "",
    editedIndex: -1,
    editedItem: [],
    knownEvents: ["close-Dialog"],
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
    rateTicket
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
    },
    unSelectItem() {
      this.selectedItem = false;
    },
    showDialog(item, ty) {
      this.dialogType = ty;
      this.editedIndex = this.$store.getters.getTickets.indexOf(item);
      this.editedItem = Object.assign({}, item);
      if (this.dialogType === "rateTicket") {
        this.dialog = true;
      }
    },
    proxyEvent(eventName, eventData) {
      if (eventName==='close-Dialog')
      {
        this.dialog = eventData;
      }
    }
  }
};
</script>

<style scoped></style>
