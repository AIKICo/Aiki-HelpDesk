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
                                            <span class="mr-2">
                                                ثبت نام
                                            </span>
                                        </v-card-title>
                                        <v-card-text class="mt-5">
                                            <ValidationProvider
                                                    v-slot="{ errors }"
                                                    name="عنوان شرکت"
                                                    rules="required"
                                                    immediate
                                            >
                                                <v-text-field
                                                        v-model="company.title"
                                                        label="عنوان شرکت"
                                                        clearable
                                                        :error-messages="errors"
                                                        outlined
                                                        shaped
                                                ></v-text-field>
                                            </ValidationProvider>
                                            <ValidationProvider
                                                    v-slot="{ errors }"
                                                    name="آدرس ایمیل"
                                                    rules="required|email"
                                                    vid="email"
                                                    immediate
                                            >
                                                <v-text-field
                                                        v-model="company.email"
                                                        label="آدرس ایمیل"
                                                        clearable
                                                        :type="'email'"
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
                                                    color="$store.state.defaultColor + ' darken-1'"
                                                    :disabled="invalid"
                                                    value="registerUser"
                                                    type="submit"
                                                    text>
                                                ثبت نام
                                            </v-btn>
                                            <v-btn
                                                    :color="$store.state.defaultColor + ' darken-1'"
                                                    text
                                                    @click="$router.push('/login')"
                                            >
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
    import {mapActions} from "vuex";
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
    extend("email", {
        ...email,
        message:"{_field_} آدرس معتبری نمی باشد"
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
                            email: ['آدرس ایمیل قبلا به ثبت رسیده است']
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
        metaInfo: {
            title: 'ثبت نام'
        }
    };
</script>

<style scoped>
</style>
