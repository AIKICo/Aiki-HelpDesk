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
                      <span class="ml-2">{{ $t('login.loginpanel_title') }}</span>
                    </v-card-title>
                    <v-card-text class="mt-5">
                      <ValidationProvider
                          v-slot="{ errors }"
                          name="userName"
                          rules="required|email"
                      >
                        <v-text-field
                            v-model="loginDetails.userName"
                            :label="$t('login.username_label')"
                            clearable
                            :error-messages="errors"
                            outlined
                            shaped
                            immediate
                            type="email"
                            dir="ltr"
                        ></v-text-field>
                      </ValidationProvider>
                      <ValidationProvider
                          v-slot="{ errors }"
                          name="password"
                          rules="required"
                          immediate
                      >
                        <v-text-field
                            v-model="loginDetails.password"
                            :label="$t('login.password_label')"
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
                      <v-select
                          :label="$t('login.langauge_label')"
                          :items="lanuages"
                          item-text="name"
                          item-value="value"
                          v-model="selectedlanguage"
                          shaped
                          rounded
                          @change="changeLanguage"
                          outlined>
                      </v-select>
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
                          :color="$store.state.defaultColor + ' darken-4'"
                          :disabled="invalid"
                          value="login"
                          type="submit"
                          text>
                        {{ $t('login.login_button') }}
                      </v-btn>
                      <v-btn
                          :color="$store.state.defaultColor + ' darken-1'"
                          value="resendPassword"
                          text
                          to="/resetPassword">
                        {{ $t('login.resend_password') }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </form>
              </ValidationObserver>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn x-large value="register" class="col-12 white--text" style="background-color: #c62828"
                     @click="$router.push('/registerUser')">
                {{ $t('login.register_button') }}
              </v-btn>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col>
              <v-alert class="primary white--text">
                {{$t('general.app_contactInfo')}}
              </v-alert>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import VueHcaptcha from '@hcaptcha/vue-hcaptcha';
import { localize } from 'vee-validate';
import {required, email} from "vee-validate/dist/rules";


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
  name: "login",
  data() {
    return {
      loginDetails: {
        userName: "",
        password: ""
      },
      submitStatus: null,
      hCaptchaVerified: true,
      showPassword: false,
      lanuages: [
        {name: 'English', value: 'en'},
        {name: 'فارسی', value: 'fa'}
      ],
      selectedlanguage: ''
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
    },
    changeLanguage() {
      this.$i18n.locale = this.selectedlanguage;
      this.$vuetify.lang.current = this.selectedlanguage;
      this.$vuetify.rtl = this.selectedlanguage === 'fa';
      localize(this.selectedlanguage);
    }
  },
  mounted() {
    this.selectedlanguage = 'fa';
    localize(this.selectedlanguage);
    this.$i18n.locale = this.selectedlanguage;
  },
  metaInfo: {
    title: 'ورو به سامانه'
  }
};
</script>

<style scoped>
</style>
