<template v-slot:items="props">
  <v-container fluid fill-height>
    <v-layout align-center>
      <v-row justify="center" align="center" no-gutters>
        <v-col cols="12" md="5" lg="5">
          <v-row>
            <v-col>
              <ValidationObserver ref="observer" v-slot="{ handleSubmit, invalid }">
                <form @submit.prevent="handleSubmit(onSubmit)" autocomplete="off">
                  <v-card class="mx-auto" outlined>
                    <v-card-title :class="$store.state.defaultColor + ' white--text'">
                      <v-icon large color="white">mdi-account-plus</v-icon>
                      <span class="mr-2">{{$t('formName.register')}}</span>
                    </v-card-title>
                    <v-card-text class="mt-5">
                      <ValidationProvider
                          v-slot="{ errors }"
                          name="companyTitle"
                          rules="required"
                          immediate
                      >
                        <v-text-field
                            v-model="company.title"
                            :label="$t('register.companyTitle')"
                            clearable
                            :error-messages="errors"
                            outlined
                            shaped
                        ></v-text-field>
                      </ValidationProvider>
                      <ValidationProvider
                          v-slot="{ errors }"
                          name="emailAddress"
                          rules="required|email"
                          vid="email"
                          immediate
                      >
                        <v-text-field
                            v-model="company.email"
                            :label="$t('register.emailAddress')"
                            clearable
                            :type="'email'"
                            :error-messages="errors"
                            outlined
                            shaped
                            dir="ltr"
                        ></v-text-field>
                      </ValidationProvider>
                      <ValidationProvider
                          v-slot="{ errors }"
                          name="subdomainTitle"
                          :rules="{  required,regex: /^[a-zA-Z0-9]*$/ }"
                          vid="subdomain"
                          immediate
                      >
                        <v-text-field
                            v-model="company.subdomain"
                            :label="$t('register.subdomain')"
                            clearable
                            :error-messages="errors"
                            outlined
                            shaped
                            dir="ltr"
                        ></v-text-field>
                      </ValidationProvider>
                      <div style="text-align: center" v-if="$store.state.isOnline">
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
                          value="registerUser"
                          type="submit"
                          text>
                        {{ $t('register.register_btn') }}
                      </v-btn>
                      <v-btn
                          :color="$store.state.defaultColor + ' darken-1'"
                          text
                          @click="$router.push('/login')"
                      >
                        {{ $t('general.back_button') }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </form>
              </ValidationObserver>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import {required, email, regex} from "vee-validate/dist/rules";
import {mapActions} from "vuex";
import VueHcaptcha from '@hcaptcha/vue-hcaptcha';
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

setInteractionMode("eager");
extend("regex", {
  ...regex,
});
extend("required", {
  ...required,
});
extend("email", {
  ...email,
});

export default {
  name: "registerUser",
  data() {
    return {
      company: {
        title: "",
        email: ""
      },
      submitStatus: null,
      hCaptchaVerified: false
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    VueHcaptcha
  },
  methods: {
    ...mapActions({
      registerUser: "CompanyService/addCompany",
      IsEmailExists: "UserService/IsEmailExists"
    }),
    onSubmit: function () {
      if (this.hCaptchaVerified !== true && this.$store.state.isOnline) return;
      this.IsEmailExists(this.company.email).then((res) => {
        if (res.data === true) {
          this.$refs.observer.setErrors({
            email: [this.$t('register.dublicate_emailAddressMessage')]
          });
        } else {
          this.registerUser(this.company).then(() => {
            this.$router.push("/registerUserConfirm")
          });
        }
      });
    },
    captchaVerified(e) {
      if (e) this.hCaptchaVerified = true;
      else this.hCaptchaVerified = false;
    }
  },
  metaInfo() {
    return{
      title: this.$t('formName.register')
    }
  }
};
</script>

<style scoped>
</style>
