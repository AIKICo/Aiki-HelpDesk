<template v-slot:items="props">
  <v-container>
    <v-row>
      <v-col>
        <v-row>
          <v-col md="7">
            <v-select
                :items="customers"
                item-text="title"
                item-value="id"
                v-model="customerid"
                label="مشتری"
                chips
                clearable
                @change="customerChanged"
            >
            </v-select>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-row>
          <v-col md="5">
            <v-text-field
                v-model="searchKey"
                append-icon="mdi-magnify"
                label="جستجو..."
                single-line
                hide-details
                clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-data-table
                :footer-props="{'items-per-page-options': [50, 100, 150, 200, 250]}"
                :headers="headers"
                :items="items"
                :items-per-page="itemPerPage"
                class="elevation-1"
                item-key="id"
                multi-sort
                :search="searchKey"
            >
              <template v-slot:item="{ item }">
                <tr
                    :key="item.id"
                    @mouseleave="unSelectItem()"
                    @mouseover="selectItem(item)"
                >
                  <td class="text-center">
                    {{ item.deliverydate | formatDate }}
                  </td>
                  <td class="text-center">
                    <v-chip :color="$store.state.defaultColor + ' lighten-5'"
                            :text-color="$store.state.defaultColor">
                      {{ item.assetnumber }}
                    </v-chip>
                  </td>
                  <td class="text-center">
                    {{ item.title }}
                  </td>
                  <td class="text-center">
                    {{ item.assettypeid }}
                  </td>
                  <td class="text-center">
                    {{ item.assetlocationid }}
                  </td>
                  <td>
                    {{ item.additionalinfo }}
                  </td>
                  <td>
                    <div v-if="item === selectedItem">
                      <v-btn :color="$store.state.defaultColor" @click="delAsset(item)" icon>
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                      <v-btn
                          :color="$store.state.defaultColor"
                          @click="editAsset(item)"
                          icon
                      >
                        <v-icon>mdi-content-save-edit-outline</v-icon>
                      </v-btn>
                    </div>
                    <div v-if="item!=selectedItem">
                      {{ item.lastStatus }}
                    </div>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-col>

      <v-tooltip top v-if="$store.state.isLoggedIn"
      >
        <template v-slot:activator="{on, attr}">
          <v-btn
              bottom
              color="red"
              dark
              fab
              fixed
              left
              @click="newAsset()"
              v-on="on"
              v-bind="attr"
              class="mb-6"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>درج</span>
      </v-tooltip>
    </v-row>

  </v-container>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "AssetList",
  metaInfo: {
    title: "کنترل اموال"
  },
  components: {},
  data() {
    return {
      headers: [
        {
          text: "تاریخ تحویل",
          value: "deliverydate",
          width: 100,
          align: "center",
        },
        {
          text: "شماره اموال",
          value: "assetnumber",
          width: 100,
          align: "center",
        },
        {
          text: "تحویل گیرنده",
          value: "title",
          width: 150,
          align: "center",
        },
        {
          text: "نوع اموال",
          value: "assettypeid",
          width: 150,
          align: "center",
        },
        {
          text: "محل اموال",
          value: "assetlocationid",
          width: 200,
          align: "center",
        },
        {
          text: 'اطلاعات تکمیلی',
          value: 'additionalinfo',
          width: 150,
        },
        {
          text: "",
          value: "actions",
          align: "center",
          sortable: false,
          width: "150px"
        }
      ],
      expanded: [],
      singleExpand: true,
      selectedItem: false,
      editedIndex: -1,
      editedItem: [],
      itemPerPage: 50,
      searchKey: "",
      items: [],
      customers: [],
      customerid: null
    }
  },
  methods: {
    ...mapActions({
      getAssetList: "AssetService/loadAssetsViewByCompanyId",
      deleteAsset: "AssetService/deleteAsset",
      loadCustomer: "CustomerService/loadCustomers"
    }),
    selectItem(item) {
      this.selectedItem = item;
    },
    unSelectItem() {
      this.selectedItem = false;
    },
    delAsset(item) {
      this.deleteAsset({"id": item.id}).then(() => {
        var index = this.items.indexOf(item);
        this.items.splice(index, 1);
      })
    },
    editAsset(item) {
      this.$router.push("/Asset/Edit/" + item.id + '/' + this.customerid);
    },
    customerChanged: function (e) {
      if (e === undefined) this.items = [];
      this.customerid = e;

    },
    newAsset() {
      if (this.customerid) {
        this.$router.push("/Asset/Insert/undefined/" + this.customerid);
      } else {
        this.$router.push("/Asset/Insert/undefined/");
      }
    }
  },
  watch: {
    customerid: function (val) {
      this.getAssetList(val).then((res) => {
        this.items = res.data;
      });
    }
  },
  created() {
    this.loadCustomer().then((res) => {
      this.customers = res.data;
      if (this.$router.currentRoute.params.customerid) {
        this.customerid = this.$router.currentRoute.params.customerid
      }
    });
  }
}
</script>

<style scoped>

</style>
