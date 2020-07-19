<template v-slot:items="props">
    <v-container>
        <v-row>
            <v-col cols="3">
                <component :is="this.CustomerComponentName" v-bind="this.CustomersInfoData"
                           :key="CustomerComponentName"></component>
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
                customers: [],
                CustomerComponentName: "",
                CustomersInfoData: {
                    totalCount: 0,
                    disabledCount: 0
                },
                disabledRow: null
            };
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
            disabledRow: function () {
                this.CustomersInfoData = {
                    "customer-counts": this.customers.length,
                    "customer-disabled-counts": this.disabledRow
                };
            }
        },
        created() {
            this.$store.dispatch("CustomerService/loadCustomers").then((res) => {
                this.customers = res.data;
                this.disabledRow = this.customers.filter(function (el) {
                    return (el.disabled===true)
                }).length;
                this.CustomerComponentName = "CustomersInfo";
                this.CustomersInfoData = {
                    "customer-counts": this.customers.length,
                    "customer-disabled-counts": this.disabledRow
                };
            });
        }
    };
</script>

<style scoped></style>
