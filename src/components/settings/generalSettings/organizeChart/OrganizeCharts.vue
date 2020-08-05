<template v-slot:items="props">
  <v-container>
    <v-row>
      <v-col>
        <v-select
            :items="customers"
            item-text="title"
            item-value="id"
            v-model="selectedCustomer"
            label="مشتری"
            @change="customerChanged"
        >
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
            v-model="searchKey"
            label="جستجو در چارت سازمانی"
            clearable
            outlined
            shaped
            v-if="showSearchTextBox"
        ></v-text-field>
        <v-treeview
            :items="OrganizeChartItems"
            :search="searchKey"
            :filter="filter"
            item-key="id"
            item-text="title"
            activatable
            dense
            rounded
            hoverable
            transition>
          <template v-slot:label="{ item }">
            <v-hover v-slot:default="{ hover }">
              <div>
                <span>{{ item.title }}</span>
                <v-tooltip top v-if="hover">
                  <template v-slot:activator="{on, attr}">
                    <v-btn
                        class="mr-5"
                        :color="$store.state.defaultColor"
                        @click="addChild(item)"
                        icon v-on="on"
                        v-bind="attr">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <span>افزودن</span>
                </v-tooltip>
                <v-tooltip top v-if="hover && item.allowdelete && item.children && item.children.length===0">
                  <template v-slot:activator="{on, attr}">
                    <v-btn v-if="hover && item.allowdelete && item.children.length===0" icon
                           @click="deleteChild(item)"
                           v-on="on"
                           v-bind="attr">
                      <v-icon :color="$store.state.defaultColor">
                        mdi-minus
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>حذف</span>
                </v-tooltip>
                <v-tooltip top v-if="hover">
                  <template v-slot:activator="{on, attr}">
                    <v-btn v-if="hover" icon @click="editChild(item)"
                           v-on="on"
                           v-bind="attr">
                      <v-icon :color="$store.state.defaultColor">
                        mdi-content-save-edit-outline
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>ویرایش</span>
                </v-tooltip>
                <v-tooltip top v-if="hover && item.children && item.children.length===0">
                  <template v-slot:activator="{on, attr}">
                    <v-btn v-on="on" v-bind="attr" icon @click="showMoveTree(item)">
                      <v-icon :color="$store.state.defaultColor">
                        mdi-file-tree
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>منتقل گردد به:</span>
                </v-tooltip>
              </div>
            </v-hover>
          </template>
        </v-treeview>
      </v-col>
    </v-row>
    <v-row>
      <OrganizeChart :operation="sheetOperation"
                     :sheet="sheet"
                     :item.sync="selectedItem"
                     @close-sheet="closeSheet"
                     @item-added="addedChild"
                     @item-updated="updatedItem">
      </OrganizeChart>
      <move-sheet
          :sheet="moveSheet"
          :org-charts="OrganizeChartItems"
          :item="selectItemForMove"
          @close-moveSheet="closeMoveSheet">

      </move-sheet>
    </v-row>
  </v-container>

</template>

<script>
import OrganizeChart from "./OrganizeChart";
import {mapActions} from "vuex";
import MoveSheet from "./moveSheet";

export default {
  name: "OrganizeCharts",
  components: {MoveSheet, OrganizeChart},
  data() {
    return {
      OrganizeChartItems: [],
      sheet: false,
      moveSheet: false,
      sheetOperation: "",
      selectedItem: null,
      parentItem: null,
      customers: null,
      selectedCustomer: null,
      selectItemForMove: null,
      searchKey: "",
      caseSensitive: false,
      showSearchTextBox: false,
    }
  },
  computed: {
    filter() {
      return this.caseSensitive
          ? (item, search, textKey) => item[textKey].indexOf(search) > -1
          : undefined
    },
  },
  methods: {
    ...mapActions({
      loadOrganizeCharts_JsonView_ByCustomerId: "OrganizeChartsJsonView/loadOrganizeCharts_JsonView_ByCustomerId",
      loadCustomers: "CustomerService/loadCustomers",
      patchOrganizeChart: "OrganizeChartService/patchOrganizeChart"
    }),
    addChild(parentItem) {
      if (this.selectedCustomer) {
        this.sheetOperation = "insert";
        this.sheet = !this.sheet;
        this.selectedItem = {
          title: "",
          parent_id: parentItem.id,
          customerid: this.selectedCustomer,
          children: [],
          additionalinfo: [],
          allowdelete: true
        };
        this.ParentItem = parentItem;
      }
    },
    addedChild(e) {
      if (!this.ParentItem.children) {
        this.$set(this.ParentItem, "children", []);
      }
      this.$store.dispatch("OrganizeChartService/addOrganizeChart", e.itemAdded).then((res) => {
        if (res.status === 201) {
          this.$set(res.data, "children", []);
          this.ParentItem.children.push(res.data);
        }
      });
      this.sheet = e.sheet;
    },
    deleteChild(item) {
      if (item.parent_id != null) {
        this.$store.dispatch("OrganizeChartService/deleteOrganizeChart", item.id).then((res) => {
          if (res.status === 200) {
            this.deleteFromJson(this.OrganizeChartItems, item.id);
          }
        });
      }
    },
    deleteFromJson(itemArr, nId) {
      for (var i = 0; i < itemArr.length; i++) {
        if (itemArr[i].id && itemArr[i].id === nId) {
          itemArr.splice(i, 1);
        } else {
          if (itemArr[i].children) {
            this.deleteFromJson(itemArr[i].children, nId);
          }
        }
      }
    },
    editChild(item) {
      this.sheetOperation = "update";
      this.sheet = !this.sheet;
      this.selectedItem = item;
    },
    updatedItem(e) {
      this.sheet = !this.sheet;
      this.$store.dispatch("OrganizeChartService/editOrganizeChart", e.itemUpdated).then((res) => {
        if (res.status === 200) {
          this.selectedItem = e.itemUpdated;
        }
      });
    },
    customerChanged(e) {
      this.loadOrganizeCharts_JsonView_ByCustomerId(e).then((res) => {
        this.OrganizeChartItems = [];
        this.OrganizeChartItems.push(JSON.parse(res.data[0].organizecharts));
        this.showSearchTextBox = true;
      });
    },
    closeSheet(e) {
      this.sheet = e.sheet;
    },
    showMoveTree(item) {
      this.selectItemForMove = item;
      this.moveSheet = true;
    },
    closeMoveSheet(e) {
      if (e.closetype === "ok") {
        this.moveSheet = e.moveSheet;
        this.patchOrganizeChart({
          id: this.selectItemForMove.id,
          patchDoc: [
            {
              op: "replace",
              path: "/parent_id",
              value: e.selectedItem.id
            }
          ]
        }).then((res) => {
          if (res.status === 200) {
            this.selectItemForMove.parent_id = e.selectedItem.id;
            this.deleteFromJson(this.OrganizeChartItems, this.selectItemForMove.id);
            e.selectedItem.children.push(this.selectItemForMove);
          }
        });
      } else {
        this.moveSheet = e.moveSheet;
      }
    }
  },
  created() {
    this.loadCustomers().then((res) => {
      this.customers = res.data;
    });
  }
}
</script>

<style scoped>

</style>
