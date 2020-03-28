<template>
  <v-container fluid>
    <v-layout align-center>
      <v-row justify="center" align="center" no-gutters>
        <v-col>
          <validationObserver ref="observer" v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <v-card outlined>
                <v-card-title
                  :class="$store.state.defaultColor + ' white--text'"
                >
                  <v-icon large color="white">mdi-edit</v-icon>
                  {{ $route.params.formType === "Edit" ? "ویرایش" : "درج" }}
                </v-card-title>
                <v-card-text class="mt-3">
                  <v-row no-gutters>
                    <v-col cols="10">
                      <v-text-field v-model="OperationHour.title" placeholder="عنوان"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row
                    v-for="item in OperationHour.workdays"
                    :key="item.DayName"
                    align="center"
                    justify="center"
                    no-gutters
                  >
                    <v-col>
                      {{ item.DayName }}
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="item.StartTime"
                        style="width: 100px;"
                        type="time"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="item.EndTime"
                        style="width: 100px;"
                        type="time"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-card>
                        <v-card-title>روزهای تعطیل</v-card-title>
                        <v-card-text>
                          <v-row no-gutters>
                            <v-col cols="3" class="mt-7"><date-picker v-model="holiday"></date-picker></v-col>
                            <v-col cols="8">
                              <v-text-field placeholder="علت تعطیلی" v-model="holidayComment"></v-text-field>
                            </v-col>
                            <v-col cols="1" class="mt-7">
                              <v-icon x-large :color="$store.state.defaultColor" @click="addHoliday">
                                mdi-plus
                              </v-icon>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-spacer></v-spacer>
                          </v-row>
                          <v-row v-for="item in OperationHour.holidays" :key="item.Day" no-gutters>
                            <v-col>
                              <span v-text="item.Day" class="text-bold ml-3"></span>
                              <span v-text="item.Reason"></span>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
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
import { extend, ValidationObserver, setInteractionMode } from "vee-validate";
setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} نمی تواند خالی باشد"
});
export default {
  name: "OperationHours",
  components: {
    ValidationObserver
  },
  data() {
    return {
      OperationHour: null,
      holiday:"",
      holidayComment:""
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
    addHoliday(){
      this.OperationHour.holidays.push({Day:this.holiday, Reason:this.holidayComment})
      this.holiday="";
      this.holidayComment="";
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
        { DayName: "شنبه", StartTime: "08:00", EndTime: "14:00" },
        { DayName: "یکشنبه", StartTime: "08:00", EndTime: "14:00" },
        { DayName: "دوشنبه", StartTime: "08:00", EndTime: "14:00" },
        { DayName: "سه شنبه", StartTime: "08:00", EndTime: "14:00" },
        { DayName: "چهار شنبه", StartTime: "08:00", EndTime: "14:00" },
        { DayName: "پنج شنیه", StartTime: "08:00", EndTime: "14:00" },
        { DayName: "جمعه", StartTime: "00:00", EndTime: "00:00" }
      ],
      holidays: []
    };
  }
};
</script>

<style scoped></style>
