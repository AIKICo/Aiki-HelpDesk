<template v-slot:items="props">
  <v-container fluid fill-height v-if="!$store.state.isLoggedIn">
    <v-layout align-center>
      <v-row justify="center" align="center" no-gutters>
        <v-col cols="12" md="4" lg="4">
          <v-row>
            <v-col>
              <ValidationObserver ref="observer" v-slot="{ handleSubmit, invalid }">
                <form @submit.prevent="handleSubmit(onSubmit)" autocomplete="off">
                  <v-card class="mx-auto" outlined>
                    <v-card-title :class="$store.state.defaultColor + ' white--text'">
                      <v-icon large color="white">mdi-login-variant</v-icon>
                      <span class="ml-2">ورود</span>
                    </v-card-title>
                    <v-card-text class="mt-5">
                      <ValidationProvider
                          v-slot="{ errors }"
                          name="شناسه کاربری"
                          rules="required"
                      >
                        <v-text-field
                            v-model="loginDetails.userName"
                            label="شناسه کاربری"
                            clearable
                            :error-messages="errors"
                            outlined
                            shaped
                            immediate
                            dir="ltr"
                        ></v-text-field>
                      </ValidationProvider>
                      <ValidationProvider
                          v-slot="{ errors }"
                          name="کلمه عبور"
                          rules="required"
                          immediate
                      >
                        <v-text-field
                            v-model="loginDetails.password"
                            label="کلمه عبور"
                            clearable
                            :type="showPassword?'text':'password'"
                            :error-messages="errors"
                            outlined
                            shaped
                            dir="ltr"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="() => (showPassword = !showPassword)"
                        ></v-text-field>
                      </ValidationProvider>
                      <div style="text-align: center" v-if="$store.state.isOnline && hCaptchaVerified===false">
                        <vue-hcaptcha
                            sitekey="e3605ee2-18a4-4e7c-9a8e-5885075be08e"
                            @verify="captchaVerified"
                            @error="hCaptchaVerified=false">
                        </vue-hcaptcha>
                      </div>
                    </v-card-text>

                    <v-card-actions>
                      <v-btn
                          :color="$store.state.defaultColor + ' darken-1'"
                          :disabled="invalid"
                          value="login"
                          type="submit"
                          text
                      >ورود به سامانه
                      </v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </form>
              </ValidationObserver>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn x-large value="register" class="col-12 white--text" style="background-color: #6200EE" @click="$router.push('/registerUser')">
                ثبت نام رایگان
              </v-btn>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col>
              <v-alert class="primary white--text">
                نظرات و پیشنهادات خود را به آدرس moh.mehrnia@gmail.com ارسال نمایید
              </v-alert>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import {required} from "vee-validate/dist/rules";
import VueHcaptcha from '@hcaptcha/vue-hcaptcha';

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
  name: "login",
  data() {
    return {
      loginDetails: {
        userName: "",
        password: ""
      },
      submitStatus: null,
      hCaptchaVerified: true,
      showPassword: false
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    VueHcaptcha
  },
  methods: {
    onSubmit: function () {
      if (this.hCaptchaVerified !== true && this.$store.state.isOnline) return;
      this.$store
          .dispatch("UserService/authenticate", {
            userName: this.loginDetails.userName,
            passwd: this.loginDetails.password
          })
          .then((response) => {
            if (response.status === 200) {
              this.$store.state.isLoggedIn = true;
              this.$router.push("/dashboard");
            } else if (response === "error") {
              this.hCaptchaVerified = false;
            }
          })
    },
    captchaVerified(e) {
      if (e) this.hCaptchaVerified = true;
      else this.hCaptchaVerified = false;
    }
  },
  metaInfo: {
    title: 'ورو به سامانه'
  }
};
</script>

<style scoped>
</style>
