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
                    name="عنوان"
                    rules="required"
                    immediate
                  >
                    <v-text-field
                      v-model="Customer.title"
                      label="عنوان مشتری"
                      clearable
                      :error-messages="errors"
                      immediate
                      outlined
                      shaped
                    ></v-text-field>
                  </validation-provider>
                  <v-textarea
                    v-model="Customer.description"
                    label="شرح مختصر در خصوص فعالیت شرکت"
                    clearable
                    outlined
                    shaped
                  ></v-textarea>
                  <v-text-field
                    v-model="Customer.domains"
                    label="دامنه های اینترنتی شرکت"
                    clearable
                    outlined
                    shaped
                    dir="ltr"
                  ></v-text-field>
                  <validation-provider
                          v-slot="{ errors }"
                          name="توافق نامه سطح سرویس"
                          rules="required"
                          immediate
                  >
                    <v-select
                            :items="SLAItems"
                            :error-messages="errors"
                            item-text="title"
                            item-value="id"
                            v-model="Customer.operatinghourid"
                            label="توافق نامه سطح سرویس"
                            shaped
                            outlined
                    >
                    </v-select>
                  </validation-provider>

                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    :color="$store.state.defaultColor + ' darken-1'"
                    text
                    :disabled="invalid"
                    type="submit"
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
import { required } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";
setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} نمی تواند خالی باشد"
});
export default {
  name: "Customer",
  data() {
    return {
      Customer: null,
      SLAItems:[]
    };
  },
  components: {
    ValidationObserver,
    ValidationProvider
  },
  computed: {},
  methods: {
    onSubmit() {
      if (this.$route.params.formType === "Edit") {
        this.$store
          .dispatch("CustomerService/editCustomer", this.Customer)
          .then(res => {
            if (res.status === 200) {
              this.closeDialog();
            }
          });
      } else if (this.$route.params.formType === "Insert") {
        this.$store
          .dispatch("CustomerService/addCustomer", this.Customer)
          .then(res => {
            if (res.status === 201) {
              this.closeDialog();
            }
          });
      }
    },
    closeDialog() {
      this.$router.push("/CustomerList");
    },
    getCustomer(id) {
      return this.$store.getters["CustomerService/getCustomer"](id);
    },
  },
  created() {
    if (this.$route.params.formType === "Edit") {
      this.Customer = this.getCustomer(this.$route.params.id);
    } else if (this.$route.params.formType === "Insert") {
      this.Customer = {
        title: "",
        description: null,
        domains: null,
        schema: null
      };
    }
    this.$store.dispatch("SLASettingService/loadSLASettings").then(() => {
      this.SLAItems = this.$store.getters["SLASettingService/getSLASettings"];
    });
  }
};
</script>

<style scoped></style>
