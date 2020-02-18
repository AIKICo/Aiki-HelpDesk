<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="this.$store.state.WorkOrderService.tickets"
          item-key="woNo"
          class="elevation-1"
          :expanded.sync="expanded"
          :single-expand="singleExpand"
        >
          <template v-slot:item="{ item, expand, isExpanded }">
            <tr
              :key="item.woNo"
              @mouseover="selectItem(item)"
              @mouseleave="unSelectItem()"
            >
              <td style="text-align: center">
                <v-icon class="ml-1" @click="expand(!isExpanded)"
                  >mdi-chevron-down</v-icon
                >{{ item.woNo }}
              </td>
              <td>{{ item.woTime }}</td>
              <td>{{ item.woDate }}</td>
              <td>{{ item.askerCode }}</td>
              <td>{{ item.lastStatus }}</td>
              <td style="text-align: center">{{ item.amval }}</td>
              <td>
                <div v-if="item === selectedItem">
                  <v-btn icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </td>
            </tr>
          </template>

          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">{{ item.needDescription }}</td>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Tickets",
  data: () => ({
    expanded: [],
    singleExpand: true,
    selectedItem: false,
    headers: [
      {text: "کد رهگیری", align: "center", value: "woNo", width: "120px"},
      { text: "ساعت ثبت", value: "woTime", align: "center" },
      { text: "تاریخ ثبت", value: "woDate", align: "center" },
      { text: "انجام دهنده", value: "askerCode", align: "center" },
      { text: "آخرین اقدام", value: "lastStatus", align: "center" },
      { text: "شماره اموال", value: "amval", align: "center" },
      { text: "", value: "actions", align: "center" ,sortable: false, width: "200px" }
    ],
    records:[]
  }),
  methods: {
    selectItem(item) {
      this.selectedItem = item;
    },
    unSelectItem() {
      this.selectedItem = false;
    }
  }
};
</script>

<style scoped></style>
