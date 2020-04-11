<template>
    <v-container fluid>
        <v-layout align-center>
            <v-row justify="center" align="center" no-gutters>
                <v-col cols="8">
                    <validationObserver ref="observer" v-slot="{ handleSubmit }">
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
                                            name="عنوان"
                                            rules="required"
                                    >
                                        <v-text-field
                                                v-model="AppConstantItem.value1"
                                                label="عنوان"
                                                clearable
                                                :error-messages="errors"
                                                outlined
                                                shaped
                                        ></v-text-field>
                                    </validation-provider>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            :color="$store.state.defaultColor + ' darken-1'"
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
        name: "AppConstant",
        data() {
            return {
                AppConstantItem: null,
            };
        },
        components: {
            ValidationObserver,
            ValidationProvider
        },
        computed: {},
        methods: {
            onSubmit() {
                if (this.$route.params.formType === "Edit") {
                    this.$store
                        .dispatch("AppConstantItemsService/editAppConstantItem", this.AppConstantItem)
                        .then(res => {
                            if (res.status === 200) {
                                this.closeDialog();
                            }
                        });
                } else if (this.$route.params.formType === "Insert") {
                    this.$store
                        .dispatch("AppConstantItemsService/addAppConstantItem", this.AppConstantItem)
                        .then(res => {
                            if (res.status === 201) {
                                this.closeDialog();
                            }
                        });
                }
            },
            closeDialog() {
                this.$router.push("/AppConstants/" + this.$route.params.parentid);
            },
            getAppConstantItem(id) {
                return this.$store.getters["AppConstantItemsService/getAppConstantItem"](id);
            },
        },
        created() {
            if (this.$route.params.formType === "Edit") {
                this.AppConstantItem = this.getAppConstantItem(this.$route.params.id);
            } else if (this.$route.params.formType === "Insert") {
                this.AppConstantItem = {
                    companyid: this.$store.state.companyId,
                    appconstantid:this.$route.params.parentid,
                    value1:"",
                    value2:""
                };
            }
        }
    }
</script>

<style scoped>

</style>