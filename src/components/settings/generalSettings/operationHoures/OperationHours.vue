<template>
  <v-container fluid>
    <v-layout align-center>
      <v-row justify="center" align="center" no-gutters>
        <v-col cols="12">
          <validationObserver ref="observer" v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <v-card outlined>
                <v-card-title
                  :class="$store.state.defaultColor + ' white--text'"
                >
                  <v-icon large color="white">mdi-edit</v-icon>
                  {{ $route.params.formType === "Edit" ? "ویرایش" : "درج" }}
                </v-card-title>
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
  setInteractionMode
} from "vee-validate";
setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} نمی تواند خالی باشد"
});
export default {
  name: "OperationHours",
  components: {
    ValidationObserver,
  },
  data() {
    return {
      OperationHour: null
    };
  },
  methods: {
    onSubmit() {
      if (this.$route.params.formType === "Insert") {
        this.$store
          .dispatch(
            "OperationHourService/addOperationHours",
            this.OperationHour
          )
          .then(res => {
            if (res.status === 201) {
              this.closeDialog();
            }
          });
      }
    },
    closeDialog() {
      this.$router.push("/OperationHoursList");
    }
  },
  created() {
    this.OperationHour = {
      companyid: this.$store.state.companyId,
      title: "",
      timezone: "",
      workdays: [
        { dayName: "Monday", startTime: "8:00", endTime: "14:00" },
        { dayName: "Tuesday", startTime: "8:00", endTime: "14:00" },
        { dayName: "Wednesday", startTime: "8:00", endTime: "14:00" },
        { dayName: "Thursday", startTime: "8:00", endTime: "14:00" },
        { dayName: "Friday", startTime: "8:00", endTime: "14:00" },
        { dayName: "Saturday", startTime: "8:00", endTime: "14:00" },
        { dayName: "Sunday", startTime: "8:00", endTime: "14:00" }
      ],
      holidays: []
    };
  }
};
</script>

<style scoped></style>
