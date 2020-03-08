<template>
  <v-container>
    <v-row>
      <v-col cols="3">
          <customers-info :customer-counts.sync="CustomersInfoData.totalCount" :customer-disabled-counts.sync="CustomersInfoData.disabledCount"></customers-info>
      </v-col>
      <v-col cols="9">
        <customer-row
          v-for="item in this.customers"
          :customer="item"
          :key="item.id"
          v-on:onDisabledRow="rowDisabled($event)"
        ></customer-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CustomersInfo from "./CustomersInfo";
import CustomerRow from "./CustomerRow";
export default {
  name: "CustomerList",
  components: {
    CustomersInfo,
    CustomerRow
  },
  data: () => {
    return {
      CustomersInfoData: {
        totalCount:0,
        disabledCount:0
      },
      disabledRow: null
    };
  },
  computed: {
    customerCounts: function() {
      return this.$store.getters["CustomerService/getCustomersCount"];
    },
    customerDisabledCounts: function() {
      return this.$store.getters["CustomerService/getDisabledCustomersCount"];
    },
    customers: function() {
      return this.$store.getters["CustomerService/getCustomers"];
    }
  },
  methods: {
    rowDisabled(disabled) {
      if (disabled === true) {
        this.disabledRow++;
      } else {
        this.disabledRow--;
      }
    }
  },
  watch: {
    disabledRow: function() {
      this.CustomersInfoData = {
        totalCount: this.customerCounts,
        disabledCount: this.disabledRow
      };
    }
  },
  created() {
    this.$store.dispatch("CustomerService/loadCustomers").then(() => {
      this.disabledRow = this.customerDisabledCounts;
      this.CustomersInfoData = {
        totalCount: this.customerCounts,
        disabledCount: this.customerDisabledCounts
      };
    });
  }
};
</script>

<style scoped></style>
