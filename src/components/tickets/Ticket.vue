<template v-slot:items="props">
  <v-container fluid>
    <v-layout align-center>
      <v-row justify="center" align="center" no-gutters>
        <v-col cols="8">
          <validationObserver ref="observer" v-slot="{ handleSubmit, invalid }">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <v-card outlined>
                <v-card-title
                    :class="$store.state.defaultColor + ' white--text'"
                >
                  <v-icon large color="white">mdi-edit</v-icon>
                  {{ $route.params.formType === "Edit" ? "ویرایش" : "درج" }}
                </v-card-title>
                <v-card-text class="mt-3">
                  <validation-provider
                      v-slot="{ errors }"
                      name="مشتری"
                      rules="required"
                      immediate
                  >
                    <v-select
                        :items="customers"
                        item-text="title"
                        item-value="id"
                        v-model="Ticket.customerid"
                        label="مشتری"
                        shaped
                        outlined
                        chips
                        clearable
                        :error-messages="errors"
                        @change="customerChanged"
                    >
                    </v-select>
                  </validation-provider>

                  <validation-provider
                      v-slot="{ errors }"
                      name="اموال"
                      rules=""
                      vid="asset"
                      immediate
                  >
                    <v-text-field
                        v-model="Ticket.asset"
                        type="number"
                        label="شماره اموال"
                        clearable
                        :error-messages="errors"
                        outlined
                        shaped
                        :disabled="diabledControl"
                        dir="ltr"
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                      v-slot="{ errors }"
                      name="درخواست کننده"
                      :rules="Ticket.asset!==null?'':'required'"
                      immediate
                  >
                    <v-autocomplete
                        v-if="Ticket.asset===null"
                        :items="Employes"
                        item-text="title"
                        item-value="id"
                        v-model="Ticket.requester"
                        label="درخواست کننده"
                        shaped
                        outlined
                        chips
                        clearable
                        :error-messages="errors"
                        :search-input.sync="EmployeSearchKey"
                    >
                    </v-autocomplete>
                  </validation-provider>

                  <validation-provider
                      v-slot="{ errors }"
                      name="شرح مختصر ایراد/درخواست"
                      rules="required"
                      immediate
                  >
                    <v-textarea
                        v-model="Ticket.description"
                        label="شرح مختصر ایراد/درخواست"
                        clearable
                        outlined
                        shaped
                        :error-messages="errors"
                        :disabled="diabledControl"
                    ></v-textarea>
                  </validation-provider>
                  <v-select
                      :items="TicketTypes"
                      item-text="value1"
                      item-value="id"
                      v-model="Ticket.tickettype"
                      label="نوع درخواست"
                      shaped
                      outlined
                      chips
                      clearable
                  >
                  </v-select>
                  <v-select
                      :items="TicketCategories"
                      item-text="value1"
                      item-value="id"
                      v-model="Ticket.ticketcategory"
                      label="گروه درخواست"
                      shaped
                      outlined
                      chips
                      clearable
                  >
                  </v-select>
                  <v-select
                      :items="TicketTags"
                      item-text="value1"
                      item-value="id"
                      v-model="Ticket.tickettags"
                      label="برچسب درخواست"
                      shaped
                      outlined
                      chips
                      clearable
                  >
                  </v-select>
                  <v-select
                      :items="SLAItems"
                      item-text="title"
                      item-value="id"
                      v-model="Ticket.operateid"
                      label="قرارداد سطح سرویس"
                      shaped
                      outlined
                      chips
                      clearable
                      @change="loadPriority">
                  </v-select>
                  <v-select
                      :items="requestpriority"
                      item-text="title"
                      item-value="title"
                      v-model="Ticket.requestpriority"
                      label="اولویت"
                      shaped
                      outlined
                      chips
                      clearable>
                  </v-select>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      :color="$store.state.defaultColor + ' darken-1'"
                      text
                      type="submit"
                      :disabled="invalid"
                  >
                    تایید
                  </v-btn>
                  <v-btn
                      :color="$store.state.defaultColor + ' darken-1'"
                      text
                      @click="closeDialog"
                  >
                    برگشت
                  </v-btn>
                </v-card-actions>
              </v-card>
            </form>
          </validationObserver>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import {required} from "vee-validate/dist/rules";
import {mapActions} from 'vuex'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} نمی تواند خالی باشد"
});
export default {
  name: "Ticket",
  data() {
    return {
      Ticket: "",
      TicketTypes: [],
      TicketCategories: [],
      TicketTags: [],
      diabledControl: false,
      customers: [],
      requestpriority: [],
      SLAItems: [],
      Employes: [],
      EmployeSearchKey: "",
    }
  },
  components: {
    ValidationObserver,
    ValidationProvider
  },
  methods: {
    ...mapActions({
      loadConstant: "AppConstantItemsService/loadAppConstantItems",
      loadCustomer: "CustomerService/loadCustomers",
      loadTicket: "TicketService/loadTicket",
      addTicket: "TicketService/addTicket",
      editTicket: "TicketService/editTicket",
      isAssetExists: "AssetService/isAssetExists",
      GetSLAByCustomerID: "SLASettingService/loadByCustomerID",
      LoadSLASettings: "SLASettingService/loadSLASettings",
      LoadSLASetting: "SLASettingService/loadSLASettings",
      loadOrganizeCharteChartByCustomerId: "OrganizeChartService/loadOrganizeCharteChartByCustomerId"
    }),
    onSubmit() {
      if (this.$route.params.formType === "Edit") {
        this.editTicket(this.Ticket).then(res => {
          if (res.status === 200) {
            this.closeDialog();
          }
        });
      } else if (this.$route.params.formType === "Insert") {
        this.isAssetExists(this.Ticket.asset).then((res) => {
          if (res.data === false) {
            this.$refs.observer.setErrors({
              asset: ['شماره اموال وجود ندارد']
            });
            return;
          } else {
            this.addTicket(this.Ticket).then(res => {
              if (res.status === 201) {
                this.closeDialog();
              }
            });
          }
        });
      }
    },
    closeDialog() {
      this.$router.push("/cartabl");
    },
    loadPriority(e) {
      if (e) {
        this.LoadSLASetting(e).then((res) => {
          this.requestpriority = res.data[0].targetspriority;
        });
      }
    },
    customerChanged(e) {
      this.loadOrgannizeChart(e);
    },
    loadOrgannizeChart(customerid){
      this.loadOrganizeCharteChartByCustomerId(customerid).then((res) => {
        this.Employes = [];
        this.Employes = this.lodash.filter(res.data, item => item.titletype === "5232ad99-404f-4d77-9698-9a9e3ff3dbbd");
      });
    },
  },
  created() {
    this.loadConstant('473b359f-30a7-4963-a671-6f618b277e48').then((res) => {
      this.TicketTypes = res.data
    });
    this.loadConstant('0a8b50c5-762e-47ea-b60d-4ed9d0a71f50').then((res) => {
      this.TicketCategories = res.data
    });
    this.loadConstant('e215f24f-4d28-46e7-b75d-26a19feb656a').then((res) => {
      this.TicketTags = res.data
    });
    this.loadCustomer().then((res) => {
      this.customers = res.data;
    });
    this.LoadSLASettings().then((res) => {
      this.SLAItems = res.data;
    })
    if (this.$route.params.formType === "Edit") {
      this.loadTicket(this.$route.params.id).then((res) => {
        this.Ticket = res.data;
        this.diabledControl = true;
        this.loadPriority(this.Ticket.customerid);
        this.loadOrgannizeChart(this.Ticket.customerid);
      });
    } else if (this.$route.params.formType === "Insert") {
      this.Ticket = {
        registerdate: null,
        enddate: null,
        description: null,
        tickettype: null,
        ticketcategory: null,
        tickettags: null,
        asset: null,
        requestpriority: ""
      };
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
