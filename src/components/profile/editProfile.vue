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
                                    ویرایش پروفایل
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
                                            name="نام کاربری"
                                            rules="required"
                                            immediate
                                    >
                                        <v-text-field
                                                v-model="Member.username"
                                                label="نام کاربری"
                                                clearable
                                                :error-messages="errors"
                                                outlined
                                                shaped
                                                disabled
                                        ></v-text-field>
                                    </validation-provider>
                                    <validation-provider
                                            v-slot="{ errors }"
                                            name="کلمه عبور"
                                            rules="password:@confirm"
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
                                                ref="password"
                                                dir="ltr"
                                        ></v-text-field>
                                    </validation-provider>
                                    <validation-provider
                                            v-slot="{ errors }"
                                            name="تکرار کلمه عبور"
                                            rules=""
                                            immediate
                                            vid="confirm"
                                    >
                                        <v-text-field
                                                v-model="verificationPassword"
                                                label="تکرار کلمه عبور"
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
                                            rules="required"
                                            immediate
                                    >
                                        <v-text-field
                                                v-model="Member.email"
                                                label="آدرس ایمیل"
                                                clearable
                                                :error-messages="errors"
                                                type="email"
                                                outlined
                                                shaped
                                                disabled
                                                dir="ltr"
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
                                                disabled
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
    import {required} from "vee-validate/dist/rules";
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
    extend("password", {
        params: ["target"],
        validate(value, { target }) {
            return value === target;
        },
        message: "تأیید رمز عبور مطابقت ندارد"
    });
    export default {
        name: "editProfile",
        data() {
            return {
                verificationPassword:"",
                Member: {
                    memberName: "",
                    userName: "",
                    password: "",
                    email: "",
                    roles: []
                },
                Roles: [
                    {Label: "مدیر", Value: "admin"},
                    {Label: "کارشناس", Value: "operator"}
                ]
            };
        },
        components: {
            ValidationObserver,
            ValidationProvider
        },
        methods: {
            ...mapActions({
                getMember: "MemberService/loadMember"
            }),
            onSubmit() {
                this.$store
                    .dispatch("MemberService/editMember", this.Member).then((res)=>{
                        if (res.status===200){
                            this.$toast.success("اطلاعات پروفایل شما تغییر داده شد");
                        }
                });
            },
            closeDialog() {
                this.$router.push("/");
            },
        },
        created() {
            this.getMember(this.$store.state.memberid).then((res) => {
                this.Member = res.data;
            });
        }
    }
</script>

<style scoped>

</style>
