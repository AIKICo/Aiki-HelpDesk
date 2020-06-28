<template>
    <v-container fluid>
        <v-layout align-center>
            <v-row justify="center" align="center" no-gutters>
                <v-col cols="5">
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
                                                    name="شماره اموال"
                                                    rules="required"
                                                    vid="assetnumber"
                                                    immediate
                                            >
                                                <v-text-field
                                                        v-model="Asset.assetnumber"
                                                        label="شماره اموال"
                                                        clearable
                                                        :error-messages="errors"
                                                        outlined
                                                        shaped
                                                        :disabled="disableControl"
                                                ></v-text-field>
                                            </validation-provider>
                                            <validation-provider
                                                    v-slot="{ errors }"
                                                    name="تحویل گیرنده"
                                                    rules="required"
                                                    immediate
                                            >
                                                <v-autocomplete
                                                        :items="Employes"
                                                        item-text="title"
                                                        item-value="id"
                                                        v-model="Asset.employeeid"
                                                        label="تحویل گیرنده"
                                                        shaped
                                                        outlined
                                                        chips
                                                        clearable
                                                        :error-messages="errors"
                                                        :search-input.sync="EmployeSearchKey"
                                                >
                                                </v-autocomplete>
                                            </validation-provider>
                                            <validation-provider
                                                    v-slot="{ errors }"
                                                    name="نوع اموال"
                                                    rules="required"
                                                    immediate
                                            >
                                                <v-autocomplete
                                                        :items="AssetTypes"
                                                        item-text="value1"
                                                        item-value="id"
                                                        v-model="Asset.assettypeid"
                                                        label="نوع اموال"
                                                        shaped
                                                        outlined
                                                        clearable
                                                        chips
                                                        :error-messages="errors"
                                                        :search-input.sync="AssetTypeSearchKey"
                                                >
                                                </v-autocomplete>
                                            </validation-provider>
                                            <validation-provider
                                                    v-slot="{ errors }"
                                                    name="موقعیت اموال"
                                                    rules="required"
                                                    immediate
                                            >
                                                <v-autocomplete
                                                        :items="AssetLocations"
                                                        item-text="value1"
                                                        item-value="id"
                                                        v-model="Asset.assetlocationid"
                                                        label="موقعیت اموال"
                                                        shaped
                                                        outlined
                                                        chips
                                                        :error-messages="errors"
                                                        :search-input.sync="AssetLocationSearchKey"
                                                >
                                                </v-autocomplete>
                                            </validation-provider>
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
                                                    v-for="item in Asset.assetadditionalinfo"
                                                    :key="item.value"
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
        name: "Asset",
        data() {
            return {
                Asset: {
                    companyid: this.$store.state.companyId,
                    employeeid: null,
                    assetlocationid: null,
                    assettypeid: null,
                    assetnumber: null,
                    assetadditionalinfo: []
                },
                Employes: [],
                EmployeSearchKey: "",
                AssetLocations: [],
                AssetLocationSearchKey: "",
                AssetTypes: [],
                AssetTypeSearchKey: "",
                label: "",
                valueLabel: "",
                AppConstants: [],
                disableControl:false
            }
        },
        components: {
            ValidationObserver,
            ValidationProvider
        },
        methods: {
            onSubmit() {
                if (this.$route.params.formType === "Edit") {
                    this.$store.dispatch("AssetService/editAsset", this.Asset).then(res => {
                        if (res.status === 200) {
                            this.closeDialog();
                        }
                    });
                } else if (this.$route.params.formType === "Insert") {
                    this.isAssetExists(this.Asset.assetnumber).then((res)=>{
                        if (res.data===true)
                        {
                            this.$refs.observer.setErrors({
                                assetnumber: ['شماره اموال وجود دارد']
                            });
                            return;
                        }else{
                            this.$store.dispatch("AssetService/addAsset", this.Asset).then(res => {
                                if (res.status === 201) {
                                    this.closeDialog();
                                }
                            });
                        }
                    });
                }
            },
            closeDialog() {
                this.$router.push("/AssetList");
            },
            deleteAdditionalInfo(item) {
                var newItems = this.Asset.assetadditionalinfo.filter(function(
                    el
                ) {
                    return el.label != item.label;
                });
                this.Asset.assetadditionalinfo = newItems;
            },
            addAdditionalInfo() {
                this.Asset.assetadditionalinfo.push({label: this.label, value: this.valueLabel});
                this.label="";
                this.valueLabel="";
            },
            ...mapActions({
                isAssetExists:"AssetService/isAssetExists"
            }),
        },
        created() {
            this.$store.dispatch("OrganizeChartService/loadOrganizeChart").then((res) => {
                this.Employes = res.data;
            });

            this.$store.dispatch("AppConstantItemsService/loadAppConstantItems", "416e2a28-cfc4-49f9-9bf1-6ef0451a5b7f").then((res) => {
                this.AssetLocations = res.data;
            });

            this.$store.dispatch("AppConstantItemsService/loadAppConstantItems", "416e2a28-cfc4-49f9-9bf1-6ef0451a5b7e").then((res) => {
                this.AssetTypes = res.data;
            });

            this.$store.dispatch("AppConstantItemsService/loadAppConstantItems", "416e2a28-cfc4-49f9-9bf1-6ef0451a5b7D").then((res) => {
                this.AppConstants = res.data;
            });

            if (this.$route.params.formType === "Edit") {
                this.$store.dispatch("AssetService/loadAsset", this.$route.params.id).then((res) => {
                    this.Asset = res.data;
                    this.disableControl = true;
                });
            } else if (this.$route.params.formType === "Insert") {
                this.Asset = {
                    companyid: this.$store.state.companyId,
                    employeeid: "",
                    assetlocationid: "",
                    assettypeid: "",
                    assetnumber: "",
                    assetadditionalinfo: []
                };
            }
        },
        mounted() {
            extend("isAssetExists", {
                validate: this.isAssetExists,
                message: "اموال تحویل شخصی دیگری داده شده است"
            });
        }
    }
</script>

<style scoped>

</style>