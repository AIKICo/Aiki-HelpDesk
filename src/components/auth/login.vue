<template>
  <v-container fluid fill-height style="background-color: #0d47a1">
    <v-layout align-center >
      <v-row justify="center" align="center" no-gutters>
        <v-col cols="12" md="5" lg="5" >
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <v-card class="mx-auto" outlined>
                <v-card-title :class="$store.state.defaultColor + ' white--text'">
                  <v-icon large color="white">mdi-handshake</v-icon>
                  میزکار خدمات رایانه ای AiKi
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
                    ></v-text-field>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="کلمه عبور"
                    rules="required"
                  >
                    <v-text-field
                      v-model="loginDetails.password"
                      label="کلمه عبور"
                      clearable
                      :type="'password'"
                      :error-messages="errors"
                      outlined
                      shaped
                    ></v-text-field>
                  </ValidationProvider>
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    :color="$store.state.defaultColor + ' darken-1'"
                    value="login"
                    type="submit"
                    text
                    >ورود به سامانه</v-btn
                  >
                </v-card-actions>
              </v-card>
            </form>
          </ValidationObserver>
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
      submitStatus: null
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    loginUser: function() {
      const authUser = {};
      var app = this;
      this.$store
        .dispatch("login", {
          userName: this.loginDetails.userName,
          passwd: this.loginDetails.password
        })
        .then(response => {
          if (response.status === 200) {
            authUser.data = response.data;
            authUser.token = response.data.token;
            app.$store.state.isLoggedIn = true;
            window.localStorage.setItem("userInfo", JSON.stringify(authUser));
            window.localStorage.setItem("access_token", authUser.token);
            app.$router.push("/cartabl");
          }
        })
        .catch(function(err) {
          console.log(err.data);
        });
    },
    onSubmit() {
      this.loginUser();
    }
  }
};
</script>

<style scoped>
</style>
