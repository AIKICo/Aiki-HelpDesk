<template v-slot:items="props">
  <v-bottom-sheet v-model="sheet" inset :max-width="500">
    <v-sheet class="text-center">
      <v-row no-gutters>
        <v-col>
          <validationObserver ref="observer" v-slot="{ handleSubmit, invalid }">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <v-card outlined>
                <v-card-title
                    :class="$store.state.defaultColor + ' ' + $store.state.defaultHeaderTextColor">
                  درج
                  و ویرایش
                </v-card-title>
                <v-card-text class="mt-3">
                  <v-row no-gutters>
                    <v-col>
                      <ValidationProvider
                          v-slot="{ errors }"
                          name="آدرس ایمیل"
                          rules="email"
                          vid="email"
                          immediate
                      >
                        <v-text-field
                            v-model="item.email"
                            label="آدرس ایمیل"
                            clearable
                            :type="'email'"
                            :error-messages="errors"
                            outlined
                            shaped
                            dir="ltr"
                        ></v-text-field>
                      </ValidationProvider>
                      <validation-provider
                          v-slot="{ errors }"
                          name="عنوان"
                          rules="required"
                          immediate
                      >
                        <v-text-field
                            v-model="item.title"
                            label="عنوان"
                            clearable
                            :error-messages="errors"
                            outlined
                            shaped
                        ></v-text-field>
                      </validation-provider>
                      <validation-provider
                          v-slot="{ errors }"
                          name="نوع"
                          rules="required"
                          immediate
                      >
                        <v-select
                            :items="titletypes"
                            item-text="value1"
                            item-value="id"
                            v-model="item.titletype"
                            label="نوع"
                            shaped
                            outlined
                            chips
                            clearable
                            :error-messages="errors"
                        >
                        </v-select>
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="6" class="ml-2">
                      <v-select
                          :items="AppConstants"
                          item-text="value1"
                          item-value="value1"
                          v-model="label"
                          label="عنوان"
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                          placeholder="مقدار"
                          v-model="valueLabel"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="1" class="mt-7">
                      <v-icon
                          x-large
                          :color="$store.state.defaultColor"
                          @click="addAdditionalInfo"
                      >
                        mdi-plus
                      </v-icon>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-spacer></v-spacer>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-row
                          v-for="item in item.additionalinfo"
                          :key="item.value"
                      >
                        <v-col>
                          <span class="text-bold ml-3">{{ item.label }}</span>
                          <span v-text="item.value"></span>
                          <span>
                            <v-icon
                                color="red"
                                @click="deleteAdditionalInfo(item)">
                              mdi-delete
                            </v-icon>
                           </span>
                        </v-col>
                      </v-row>
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

    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import {email, required} from "vee-validate/dist/rules";
import {mapActions} from "vuex";
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
extend("email", {
  ...email,
  message: "{_field_} آدرس معتبری نمی باشد"
});

export default {
  name: "OrganizeChart",
  props: ["sheet", "operation", "item"],
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      label: "",
      valueLabel: "",
      AppConstants: [],
      titletypes: [],
    }
  },

  methods: {
    onSubmit() {
      if (this.operation === "insert") {
        this.$emit("item-added", {'sheet': false, "itemAdded": this.item});
      } else {
        this.$emit("item-updated", {'sheet': false, "itemUpdated": this.item});
      }
    },
    closeDialog() {
      this.$emit("close-sheet", {'sheet': false});
    },
    deleteAdditionalInfo(item) {
      var newItems = this.item.additionalinfo.filter(function (
          el
      ) {
        return el.label != item.label;
      });
      this.item.additionalinfo = newItems;
    },
    addAdditionalInfo() {
      this.item.additionalinfo.push({label: this.label, value: this.valueLabel});
      this.label = "";
      this.valueLabel = "";
    },
    ...mapActions({
      loadAppConstantItems: "AppConstantItemsService/loadAppConstantItems"
    })
  },
  created() {
    this.loadAppConstantItems("416e2a28-cfc4-49f9-9bf1-6ef0451a5b7b").then((res) => {
      this.AppConstants = res.data;
    });
    this.loadAppConstantItems("0e5aa3a0-f7c5-4960-8fb2-a6e58b1f663b").then((res) => {
      this.titletypes = res.data;
    });
  }
}
</script>

<style scoped>

</style>
