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
                <v-card-text :class="'mt-3'">
                  <validation-provider
                      v-slot="{ errors }"
                      name="عنوان"
                      rules="required"
                      immediate
                  >
                    <v-text-field
                        v-model="Group.title"
                        label="عنوان گروه"
                        clearable
                        :error-messages="errors"
                        outlined
                        shaped
                    ></v-text-field>
                  </validation-provider>
                  <v-textarea
                      v-model="Group.description"
                      label="شرح مختصر در خصوص گروه"
                      clearable
                      outlined
                      shaped
                  ></v-textarea>
                  <v-select
                      :items="Members"
                      item-text="membername"
                      item-value="id"
                      v-model="Group.agents"
                      label="کارشناسان"
                      shaped
                      outlined
                      multiple
                      chips
                  >
                  </v-select>
                  <v-select
                      :items="Members"
                      item-text="membername"
                      item-value="id"
                      v-model="Group.leader"
                      label="سرپرست"
                      shaped
                      outlined
                  >
                  </v-select>
                  <v-text-field
                      v-model="Group.supportemail"
                      label="پست الترونیک پشتیبان"
                      type="email"
                      clearable
                      outlined
                      shaped
                  ></v-text-field>
                  <v-select
                      :items="OperatingHours"
                      item-text="title"
                      item-value="id"
                      v-model="Group.operatinghourid"
                      label="ساعات کاری"
                      shaped
                      outlined
                  >
                  </v-select>
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
  name: "Group",
  data() {
    return {
      Group: null,
      changedGroup:null,
      OperatingHours: [],
      Members: []
    };
  },
  components: {
    ValidationObserver,
    ValidationProvider
  },
  methods: {
    onSubmit() {
      if (this.$route.params.formType === "Edit") {
        this.changedGroup = this.Group
        this.changedGroup.agents = JSON.stringify(this.Group.agents);
        this.$store.dispatch("GroupService/editGroup", this.changedGroup).then(res => {
          if (res.status === 200) {
            this.closeDialog();
          }
        });
      } else if (this.$route.params.formType === "Insert") {
        this.changedGroup= this.Group
        this.changedGroup.agents = JSON.stringify(this.Group.agents);
        this.$store.dispatch("GroupService/addGroup", this.changedGroup).then(res => {
          if (res.status === 201) {
            this.closeDialog();
          }
        });
      }
    },
    closeDialog() {
      this.$router.push("/Groups");
    },
    getGroup(id) {
      return this.$store.getters["GroupService/getGroup"](id);
    }
  },
  created() {
    if (this.$route.params.formType === "Edit") {
      this.Group = this.getGroup(this.$route.params.id);
      this.Group.agents = JSON.parse(this.Group.agents)
    } else if (this.$route.params.formType === "Insert") {
      this.Group = {
        title: "",
        description: null,
        operatinghourid: null,
        agents: "",
        leader: "",
        supportemail: ""
      };
    }
    this.$store.dispatch("OperationHourService/loadOperationHours").then((res) => {
      this.OperatingHours = res.data;
    });

    this.$store.dispatch("MemberService/loadMembers").then((res) => {
      this.Members = res.data;
    });
  }
};
</script>

<style scoped></style>
