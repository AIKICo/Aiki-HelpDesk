<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="$store.getters.getTickets"
          item-key="Wono"
          class="elevation-1"
          :expanded.sync="expanded"
          :single-expand="singleExpand"
        >
          <template v-slot:item="{ item, expand, isExpanded }">
            <tr :key="item.Wono"
                @mouseover="selectItem(item)"
                @mouseleave="unSelectItem()">
              <td style="text-align: center"><v-icon class="ml-1" @click="expand(!isExpanded)">mdi-chevron-down</v-icon>{{ item.Wono }}</td>
              <td>{{ item.NeedDescription }}</td>
              <td style="text-align: center">{{ item.AR }}</td>
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
            <td :colspan="headers.length">{{ item.NeedDescription }}</td>
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
      {
        text: "کد رهگیری",
        align: "center",
        value: "Wono",
        width: "120px"
      },
      { text: "شرح", value: "NeedDescription", align: "center"},
      { text: "شماره اموال", value: "AR", align: "center"},
      {
        text: "",
        value: "actions",
        align: "center",
        sortable: false,
        width: "100px"
      }
    ]
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
