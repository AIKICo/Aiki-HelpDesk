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
          <template v-slot:item="{ item, expand, isExpanded }">
            <tr
              :key="item.woNo"
              @mouseover="selectItem(item)"
              @mouseleave="unSelectItem()"
            >
              <td class="text-center">
                <v-icon class="ml-1" @click="expand(!isExpanded)"
                  >mdi-chevron-down</v-icon><v-chip color="indigo lighten-5" text-color="indigo">
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
                  <v-btn icon color="indigo">
                    <v-icon>mdi-history</v-icon>
                  </v-btn>
                  <v-btn icon color="indigo">
                    <v-icon>mdi-check-circle</v-icon>
                  </v-btn>
                  <v-btn icon color="indigo">
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                  <v-btn icon color="indigo">
                    <v-icon>mdi-star</v-icon>
                  </v-btn>
                  <v-btn icon color="indigo">
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
export default {
  name: "Tickets",
  data: () => ({
    expanded: [],
    singleExpand: true,
    selectedItem: false,
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
    ],
    records: []
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
