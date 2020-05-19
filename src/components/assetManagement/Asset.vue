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
                                            name="شماره اموال"
                                            rules="required"
                                    >
                                        <v-text-field
                                                v-model="Asset.assetnumber"
                                                label="شماره اموال"
                                                clearable
                                                :error-messages="errors"
                                                outlined
                                                shaped
                                        ></v-text-field>
                                    </validation-provider>
                                    <validation-provider
                                            v-slot="{ errors }"
                                            name="تحویل گیرنده"
                                            rules="required"
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
                                                :error-messages="errors"
                                                :search-input.sync="EmployeSearchKey"
                                        >
                                        </v-autocomplete>
                                    </validation-provider>
                                    <validation-provider
                                            v-slot="{ errors }"
                                            name="نوع اموال"
                                            rules="required"
                                    >
                                        <v-autocomplete
                                                :items="AssetTypes"
                                                item-text="value1"
                                                item-value="id"
                                                v-model="Asset.assettypeid"
                                                label="نوع اموال"
                                                shaped
                                                outlined
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
    import {required} from "vee-validate/dist/rules";
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
                Asset: null,
                AssetAdditionalInfo: [],
                Employes: [],
                EmployeSearchKey:"",
                AssetLocations: [],
                AssetLocationSearchKey:"",
                AssetTypes: [],
                AssetTypeSearchKey:""
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
                    this.$store.dispatch("AssetService/addAsset", this.Asset).then(res => {
                        if (res.status === 201) {
                            this.closeDialog();
                        }
                    });
                }
            },
            closeDialog() {
                this.$router.push("/AssetList");
            },
            getAsset(id) {
                return this.$store.getters["AssetService/getAsset"](id);
            }
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

            if (this.$route.params.formType === "Edit") {
                this.Asset = this.getAsset(this.$route.params.id);
            } else if (this.$route.params.formType === "Insert") {
                this.Asset = {
                    companyid: this.$store.state.companyId,
                    employeeid:"",
                    assetlocationid:"",
                    assettypeid:"",
                    assetnumber:"",
                    assetadditionalinfo: this.AssetAdditionalInfo
                };
            }
        }
    }
</script>

<style scoped>

</style>