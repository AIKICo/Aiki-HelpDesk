<template>
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
                      <v-icon large color="white">mdi-lock-reset</v-icon>
                      <span class="ml-2">بازیابی</span>
                    </v-card-title>
                    <v-card-text class="mt-5">
                      <ValidationProvider
                          v-slot="{ errors }"
                          name="شناسه کاربری"
                          rules="required|email"
                      >
                        <v-text-field
                            v-model="userName"
                            label="شناسه کاربری"
                            clearable
                            :error-messages="errors"
                            outlined
                            shaped
                            immediate
                            type="email"
                            dir="ltr"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-card-text>

                    <v-card-actions>
                      <v-btn
                          :color="$store.state.defaultColor + ' darken-1'"
                          value="resendPassword"
                          text
                          :disabled="invalid"
                          type="submit">
                        بازیابی
                      </v-btn>
                      <v-btn
                          :color="$store.state.defaultColor + ' darken-1'"
                          value="returnLoginPage"
                          text
                          to="/login">
                        برگشت
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
import {required, email} from "vee-validate/dist/rules";
import {mapActions} from 'vuex';
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
  message: "{_field_} معتبر نمی باشد"
});

export default {
  name: "resendPassword",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      userName: ''
    }
  },
  methods: {
    onSubmit() {
      this.resendPassword(this.userName).then(() => {
        this.$toast.success('کلمه عبور به ایمیل شما ارسال گردید');
        this.userName='';
      });
    },
    ...mapActions({
      resendPassword: 'UserService/resendPassword'
    }),
  },
  metaInfo: {
    title: 'بازیابی کلمه عبور'
  }
}
</script>

<style scoped>

</style>