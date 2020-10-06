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
                            v-model="orgItem.email"
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
                            v-model="orgItem.title"
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
                            v-model="orgItem.titletype"
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
                          v-for="(itemProp, index) in orgItem.additionalinfo"
                          :key="index"
                      >
                        <v-col class="text-right">
                          <span class="text-bold ml-3">{{ itemProp.label }}</span>
                          <span v-text="itemProp.value"></span>
                          <span>
                            <v-icon
                                color="red"
                                @click="deleteAdditionalInfo(index)">
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
});
extend("email", {
  ...email,
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
      orgItem:''
    }
  },

  methods: {
    onSubmit() {
      if (this.operation === "insert") {
        this.$emit("item-added", {'sheet': false, "itemAdded": this.orgItem});
      } else {
        this.$emit("item-updated", {'sheet': false, "itemUpdated": this.orgItem});
      }
    },
    closeDialog() {
      this.$emit("close-sheet", {'sheet': false});
    },
    deleteAdditionalInfo(index) {
      this.orgItem.additionalinfo.splice(index, 1);
    },
    addAdditionalInfo() {
      if (!('additionalinfo' in this.item)){
        this.orgItem.additionalinfo=[];
      }
      this.orgItem.additionalinfo.push({label: this.label, value: this.valueLabel});
      this.label='';
      this.valueLabel='';
    },
    ...mapActions({
      loadAppConstantItems: "AppConstantItemsService/loadAppConstantItems",
      loadSingleOrganizeChart:"OrganizeChartService/loadSingleOrganizeChart"
    })
  },
  watch: {
    sheet: function(newValue){
      if (newValue){
        if ('id' in this.item){
          this.orgItem=null;
          this.loadSingleOrganizeChart(this.item.id).then((res)=>{
            this.orgItem = res.data;
          });
        }
        else{
          this.orgItem = this.item;
        }
      }
    }
  },
  created() {
    this.loadAppConstantItems("416e2a28-cfc4-49f9-9bf1-6ef0451a5b7b").then((res) => {
      this.AppConstants = res.data;
    });
    this.loadAppConstantItems("0e5aa3a0-f7c5-4960-8fb2-a6e58b1f663b").then((res) => {
      this.titletypes = res.data;
    });
  },
}
</script>

<style scoped>

</style>
