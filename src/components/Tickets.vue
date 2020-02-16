<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="this.$store.getters.getTickets"
          :items-per-page="5"
          item-key="Wono"
          class="elevation-1"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr
                v-for="item in items"
                :key="item.Wono"
                @mouseover="selectItem(item)"
                @mouseleave="unSelectItem()"
              >
                <td style="text-align: center">{{ item.Wono }}</td>
                <td style="text-align: center">{{ item.NeedDescription }}</td>
                <td style="text-align: center">{{ item.AR }}</td>
                <td>
                  <div v-if="item === selectedItem">
                    <v-btn icon>
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </td>
              </tr>
            </tbody>
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
    selectedItem: false,
    headers: [
      {
        text: "کد رهگیری",
        align: "center",
        sortable: false,
        value: "Wono"
      },
      { text: "شرح", value: "NeedDescription", align: 'center' },
      { text: "شماره اموال", value: "AR", align: "center" },
      {
        text: "",
        value: "actions",
        align: "center",
        sortable: false,
        width: "100px"
      }
    ],
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
