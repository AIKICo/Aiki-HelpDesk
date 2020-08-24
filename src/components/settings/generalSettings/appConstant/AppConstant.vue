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
                                    <v-row>
                                        <v-col>
                                            <validation-provider
                                                    v-slot="{ errors }"
                                                    name="عنوان"
                                                    rules="required"
                                                    immediate
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
                                            <v-text-field
                                                    v-model="AppConstantItem.value2"
                                                    label="ارزش"
                                                    clearable
                                                    outlined
                                                    shaped
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>

                                    <v-row no-gutters>
                                        <v-col cols="6" class="ml-2">
                                            <v-select
                                                    :items="AppConstants"
                                                    item-text="value1"
                                                    item-value="value1"
                                                    v-model="label"
                                                    label="عنوان"
                                            >
                                            </v-select>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field
                                                    placeholder="مقدار"
                                                    v-model="valueLabel"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="1" class="mt-7">
                                            <v-icon
                                                    x-large
                                                    :color="$store.state.defaultColor"
                                                    @click="addAdditionalInfo"
                                            >
                                                mdi-plus
                                            </v-icon>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-spacer></v-spacer>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-row
                                                    v-for="(item, index) in AppConstantItem.additionalinfo"
                                                    :key="index"
                                            >
                                                <v-col>
                                                    <span class="text-bold ml-3">{{ item.label }}</span>
                                                    <span v-text="item.value"></span>
                                                    <span>
                                                    <v-icon
                                                            color="red"
                                                            @click="deleteAdditionalInfo(item)"
                                                    >
                                                      mdi-delete
                                                    </v-icon>
                                                  </span>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            :color="$store.state.defaultColor + ' darken-1'"
                                            text
                                            type="submit"
                                            :disabled="invalid"
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
    import {mapActions} from 'vuex'
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
                AppConstantItem: "",
                AppConstants: [],
                label: "",
                valueLabel: ""
            };
        },
        components: {
            ValidationObserver,
            ValidationProvider
        },
        computed: {},
        methods: {
            ...mapActions({
                getAppConstant: "AppConstantItemsService/loadAppConstantItems",
                getSingleAppConstant: "AppConstantItemsService/loadAppConstantItem"
            }),
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
            deleteAdditionalInfo(item) {
                let newItems = this.AppConstantItem.additionalinfo.filter(function (
                    el
                ) {
                    return el.label != item.label;
                });
                this.AppConstantItem.additionalinfo = newItems;
            },
            addAdditionalInfo() {
                this.AppConstantItem.additionalinfo.push({label: this.label, value: this.valueLabel});
                this.label = "";
                this.valueLabel = "";
            },
        },
        created() {
            if (this.$route.params.formType === "Edit") {
                this.getSingleAppConstant(this.$route.params.id).then((res) => {
                    this.AppConstantItem = res.data;
                    console.log(this.AppConstantItem);
                });

            } else if (this.$route.params.formType === "Insert") {
                this.AppConstantItem = {
                    appconstantid: this.$route.params.parentid,
                    value1: "",
                    value2: "",
                    allowdelete: true,
                    additionalinfo: []
                };
            }

            this.getAppConstant("9c3a6fa5-9f5e-4af2-bded-f2b256b1fea4").then((res) => {
                this.AppConstants = res.data;
            })
        }
    }
</script>

<style scoped>

</style>
