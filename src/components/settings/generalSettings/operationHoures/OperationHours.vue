<template v-slot:items="props">
  <v-container fluid>
    <v-layout align-center>
      <v-row justify="center" align="center" no-gutters>
        <v-col>
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
                  <v-row no-gutters>
                    <v-col cols="10">
                      <v-text-field
                          v-model="OperationHour.title"
                          placeholder="عنوان"
                      ></v-text-field>
                      <v-checkbox
                          v-model="OperationHour.isdefault"
                          label="پیش فرض"
                          v-if="!existsIsDefault"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                  <v-row
                      v-for="item in OperationHour.workdays"
                      :key="item.dayName"
                      align="center"
                      justify="center"
                      no-gutters
                  >
                    <v-col>
                      {{ item.dayName }}
                    </v-col>
                    <v-col>
                      <v-text-field
                          v-model="item.startTime"
                          style="width: 100px;"
                          type="time"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                          v-model="item.endTime"
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
                            <v-col cols="3" class="mt-7">
                              <date-picker v-model="holiday"></date-picker>
                            </v-col>
                            <v-col cols="8">
                              <v-text-field
                                  placeholder="علت تعطیلی"
                                  v-model="holidayComment"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="1" class="mt-7">
                              <v-icon
                                  x-large
                                  :color="$store.state.defaultColor"
                                  @click="addHoliday"
                              >
                                mdi-plus
                              </v-icon>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-spacer></v-spacer>
                          </v-row>
                          <v-row
                              v-for="item in OperationHour.holidays"
                              :key="item.Day"
                              no-gutters
                          >
                            <v-col>
                              <span class="text-bold ml-3">{{
                                  item.day | formatDate
                                }}</span>
                              <span v-text="item.reason"></span>
                              <span>
                                <v-icon
                                    color="red"
                                    @click="deleteHoliday(item)"
                                >
                                  mdi-delete
                                </v-icon>
                              </span>
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
                      :disabled="invalid"
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
import {required} from "vee-validate/dist/rules";
import {extend, ValidationObserver, setInteractionMode} from "vee-validate";

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
      holiday: "",
      holidayComment: "",
      existsIsDefault: false
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
      } else if (this.$route.params.formType === "Edit") {
        this.$store
            .dispatch(
                "OperationHourService/editOperationHours",
                this.OperationHour
            )
            .then(res => {
              if (res.status === 200) {
                this.closeDialog();
              }
            });
      }
    },
    addHoliday() {
      this.OperationHour.holidays.push({
        day: this.holiday,
        reason: this.holidayComment
      });
      this.holiday = "";
      this.holidayComment = "";
    },
    deleteHoliday(item) {
      var newItems = this.OperationHour.holidays.filter(function (
          el
      ) {
        return el.day != item.day;
      });
      this.OperationHour.holidays = newItems;
    },
    closeDialog() {
      this.$router.push("/OperationHoursList");
    },
    getOperationHour(id) {
      return this.$store.getters["OperationHourService/getOperationsHour"](id);
    }
  },
  created() {
    if (this.$route.params.formType === "Edit") {
      var record = this.getOperationHour(this.$route.params.id);
      this.OperationHour = {
        id: this.$route.params.id,
        title: record.title,
        timezone: "",
        workdays: record.workdays,
        holidays: record.holidays,
        isdefault: record.isdefault
      };
    } else if (this.$route.params.formType === "Insert") {
      this.OperationHour = {
        title: "",
        timezone: "",
        workdays: [
          {dayName: "شنبه", startTime: "08:00", endTime: "14:00"},
          {dayName: "یکشنبه", startTime: "08:00", endTime: "14:00"},
          {dayName: "دوشنبه", startTime: "08:00", endTime: "14:00"},
          {dayName: "سه شنبه", startTime: "08:00", endTime: "14:00"},
          {dayName: "چهار شنبه", startTime: "08:00", endTime: "14:00"},
          {dayName: "پنج شنیه", startTime: "08:00", endTime: "14:00"},
          {dayName: "جمعه", startTime: "00:00", endTime: "00:00"}
        ],
        holidays: [],
        isdefault: false
      };

      this.existsIsDefault =
          this.$store.getters["OperationHourService/getExistsIsDefault"] > 0;
    }
  }
};
</script>

<style scoped></style>
