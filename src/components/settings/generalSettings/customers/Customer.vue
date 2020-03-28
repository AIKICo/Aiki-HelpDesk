<template>
  <v-container fluid>
    <v-layout align-center>
      <v-row justify="center" align="center" no-gutters>
        <v-col cols="8">
          <validationObserver ref="observer" v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <v-card outlined>
                <v-card-title
                  :class="$store.state.defaultColor + ' white--text'"
                >
                  <v-icon large color="white">mdi-edit</v-icon>
                  {{$route.params.formType === "Edit"?"ویرایش":"درج"}}
                </v-card-title>
                <v-card-text class="mt-3">
                  <validation-provider
                    v-slot="{ errors }"
                    name="عنوان"
                    rules="required"
                  >
                    <v-text-field
                      v-model="Customer.title"
                      label="عنوان شرکت"
                      clearable
                      :error-messages="errors"
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
                  ></v-text-field>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    :color="$store.state.defaultColor + ' darken-1'"
                    text
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
      Customer: null
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
      }else if (this.$route.params.formType === "Insert"){
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
    }
  },
  created() {
    if (this.$route.params.formType === "Edit") {
      this.Customer = this.getCustomer(this.$route.params.id);
    } else if (this.$route.params.formType === "Insert"){
      this.Customer = {
        companyid: this.$store.state.companyId,
        title: "",
        description: null,
        domains: null,
        schema: null
      };
    }
  }
};
</script>

<style scoped>
</style>
