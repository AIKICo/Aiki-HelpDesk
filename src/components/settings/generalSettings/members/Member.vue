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
                      name="نام و نام خانوادگی"
                      rules="required"
                      immediate
                  >
                    <v-text-field
                        v-model="Member.membername"
                        label="نام و نام خانوادگی"
                        clearable
                        :error-messages="errors"
                        outlined
                        shaped
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                      v-slot="{ errors }"
                      name="کلمه عبور"
                      immediate
                  >
                    <v-text-field
                        v-model="Member.password"
                        label="کلمه عبور"
                        clearable
                        :error-messages="errors"
                        type="password"
                        outlined
                        shaped
                        dir="ltr"
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                      v-slot="{ errors }"
                      name="آدرس ایمیل"
                      rules="required|email"
                      immediate
                      vid="email"
                  >
                    <v-text-field
                        v-model="Member.email"
                        label="آدرس ایمیل"
                        clearable
                        :error-messages="errors"
                        type="email"
                        outlined
                        shaped
                        dir="ltr"
                        :disabled="disabled"
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                      v-slot="{ errors }"
                      name="نقش کاربر"
                      rules="required"
                      immediate
                  >
                    <v-select
                        :items="Roles"
                        item-text="Label"
                        item-value="Value"
                        v-model="Member.roles"
                        :error-messages="errors"
                        label="نقش کاربر"
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
import {required, email, regex} from "vee-validate/dist/rules";
import {mapActions} from "vuex"
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
extend("regex", {
  ...regex,
  message: "{_field_} کلمه عبور نانعتیر می باشد"
});
export default {
  name: "Member",
  data() {
    return {
      Member: null,
      Roles: [
        {Label: "مدیر", Value: "admin"},
        {Label: "کارشناس عملیات", Value: "user"},
        {Label: "کارشناس پشتیبانی", Value: "backupuser"}
      ],
      disabled: false
    };
  },
  components: {
    ValidationObserver,
    ValidationProvider
  },
  methods: {
    ...mapActions({
      IsEmailExists: "UserService/IsEmailExists"
    }),
    onSubmit() {

      if (this.$route.params.formType === "Edit") {
        this.$store
            .dispatch("MemberService/editMember", this.Member)
            .then(res => {
              if (res.status === 200) {
                this.closeDialog();
              }
            });
      } else if (this.$route.params.formType === "Insert") {
        this.IsEmailExists(this.Member.email).then((res) => {
          if (res.data === true) {
            this.$refs.observer.setErrors({
              email: ['آدرس ایمیل قبلا به ثبت رسیده است']
            });
          } else {
            this.$store
                .dispatch("MemberService/addMember", this.Member)
                .then(res => {
                  if (res.status === 201) {
                    this.closeDialog();
                  }
                });
          }
        });

      }
    },
    closeDialog() {
      this.$router.push("/Members");
    },
    getMember(id) {
      return this.$store.getters["MemberService/getMember"](id);
    }
  },
  created() {
    if (this.$route.params.formType === "Edit") {
      this.disabled = true;
      this.Member = this.getMember(this.$route.params.id);
    } else if (this.$route.params.formType === "Insert") {
      this.Member = {
        memberName: "",
        password: "",
        email: "",
        roles: [],
        disabled: false,
        allowdelete: false
      };
    }
  }
};
</script>

<style scoped></style>
