<template>
    <v-container fluid>
        <v-layout align-center>
            <v-row justify="center" align="center" no-gutters>
                <v-col>
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
    import {extend, ValidationObserver, setInteractionMode} from "vee-validate";

    setInteractionMode("eager");
    extend("required", {
        ...required,
        message: "{_field_} نمی تواند خالی باشد"
    });
    export default {
        name: "SLASetting",
        components: {
            ValidationObserver
        },
        data() {
            return {
                SLASetting: null,
                targetspriority:[],
                requesttypepriority:[]
            };
        },
        methods: {
            onSubmit() {
                if (this.$route.params.formType === "Insert") {
                    this.$store
                        .dispatch(
                            "SLASettingService/addSLASetting",
                            this.SLASetting
                        )
                        .then(res => {
                            if (res.status === 201) {
                                this.closeDialog();
                            }
                        });
                } else if (this.$route.params.formType === "Edit") {
                    this.$store
                        .dispatch(
                            "SLASettingService/editSLASetting",
                            this.SLASetting
                        )
                        .then(res => {
                            if (res.status === 200) {
                                this.closeDialog();
                            }
                        });
                }
            },
            addTargetsPriority() {

            },
            addRequestTypePriority(){

            },
            deleteTargetsPriority(item) {
                console.log(item);
            },
            deleteRequestTypePriority(item) {
                console.log(item);
            },
            closeDialog() {
                this.$router.push("/SLASettingsList");
            },
            getSLASetting(id) {
                return this.$store.getters["SLASettingService/getSLASetting"](id);
            }
        },
        created() {
            if (this.$route.params.formType === "Edit") {
                var record = this.getOperationHour(this.$route.params.id);
                this.SLASetting = {
                    id: this.$route.params.id,
                    companyid: this.$store.state.companyId,
                    title: record.title,
                    description: record.description,
                    operatinghourid: record.operatinghourid,
                    targetspriority: record.targetspriority,
                    requesttypepriority: record.requesttypepriority
                };
            } else if (this.$route.params.formType === "Insert") {
                this.OperationHour = {
                    companyid: this.$store.state.companyId,
                    description: "",
                    operatinghourid: "",
                    targetspriority: [
                        {title: "Low", reponseTime: "4 HOURS", resolveTime: "1 DAY"},
                        {title: "Medium", reponseTime: "4 HOURS", resolveTime: "8 HOURS"},
                        {title: "High", reponseTime: "2 HOURS", resolveTime: "4 HOURS"},
                        {title: "Urgent", reponseTime: "1 HOURS", resolveTime: "3 HOURS"},
                    ],
                    requesttypepriority: [
                        {title: "Web Protal", priority: "Medium"},
                        {title: "Email Channel", priority: "Medium"}
                    ],
                };
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>