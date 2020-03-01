<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <CustomersInfo :customer-counts="this.customerCounts" :customer-disabled-counts="this.customerDisabledCounts"></CustomersInfo>
      </v-col>
      <v-col cols="9">
        <customer-row v-for="item in this.customers" :customer="item" :key="item.id"></customer-row>
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
  computed: {
    customerCounts: function() {
      return this.$store.getters['CustomerService/getCustomersCount'];
    },
    customerDisabledCounts: function() {
      return this.$store.getters['CustomerService/getDisabledCustomersCount'];
    },
    customers:function () {
      return this.$store.getters['CustomerService/getCustomers'];
    }
  },
  created() {
    this.$store.dispatch("CustomerService/loadCustomers");
  }
};
</script>

<style scoped></style>
