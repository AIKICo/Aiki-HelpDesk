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
                <div v-if="item === selectedItem || item.ManageRate>0">
                  <v-rating v-model="item.ManageRate" color="indigo"></v-rating>
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
                icon="mdi-fire"
                border="left"
                class="mt-1"
              >
                {{ item.needDescription }}
              </v-alert>
              <v-btn rounded outlined color="indigo" class="mb-2">
                <v-icon left>mdi-clock-fast</v-icon>
                {{ item.lastStatus }}
              </v-btn>
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
    editedIndex: -1,
    editedItem: [],
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
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
    },
    unSelectItem() {
      this.selectedItem = false;
    },
  },
  watch: {
  },
};
</script>

<style scoped></style>
