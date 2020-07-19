<template v-slot:items="props">
    <v-container fluid>
        <v-layout align-center>
            <v-row justify="center" align="center" no-gutters>
                <v-col>
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
                                    <v-row no-gutters>
                                        <v-col cols="10">
                                            <ValidationProvider
                                                    v-slot="{ errors }"
                                                    name="عنوان"
                                                    rules="required"
                                                    immediate
                                            >
                                                <v-text-field
                                                        v-model="SLASetting.title"
                                                        label="عنوان توافق نامه"
                                                        clearable
                                                        :error-messages="errors"
                                                        outlined
                                                        shaped
                                                ></v-text-field>
                                            </ValidationProvider>
                                            <v-textarea
                                                    v-model="SLASetting.description"
                                                    shaped
                                                    outlined
                                                    clearable
                                                    placeholder="شرح مختصر"
                                            >
                                            </v-textarea>
                                            <ValidationProvider
                                                    v-slot="{ errors }"
                                                    name="ساعات کاری"
                                                    rules="required"
                                                    immediate
                                            >
                                                <v-select
                                                        :items="OperatingHours"
                                                        item-text="title"
                                                        item-value="id"
                                                        v-model="SLASetting.operatinghourid"
                                                        label="ساعات کاری"
                                                        shaped
                                                        outlined
                                                        :error-messages="errors"
                                                >
                                                </v-select>
                                            </ValidationProvider>

                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-card>
                                                <v-card-title>تعیین اولویت اهداف</v-card-title>
                                                <v-card-text>
                                                    <v-row
                                                            v-for="item in SLASetting.targetspriority"
                                                            :key="item.title"
                                                            no-gutters
                                                    >
                                                        <v-col>
                                                            <v-row>
                                                                <v-col cols="1">
                                                                    <v-row>
                                                                        <v-col>
                                                                            <v-text-field
                                                                                    v-model="item.title"
                                                                                    label="اولویت"
                                                                                    placeholder="اولویت"
                                                                            ></v-text-field>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-col>
                                                                <v-col>
                                                                    <v-row>
                                                                        <v-col>
                                                                            <v-text-field
                                                                                    v-model="item.responseTime"
                                                                                    placeholder="زمان پاسخ گویی"
                                                                                    label="مدت زمان پاسخ گویی"
                                                                                    type="number"
                                                                            ></v-text-field>
                                                                        </v-col>
                                                                        <v-col>
                                                                            <v-select
                                                                                    v-model="item.responseTimeUnit"
                                                                                    :items="priorityUnit"
                                                                                    placeholder="واحد"
                                                                            ></v-select>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-col>
                                                                <v-col>
                                                                    <v-row>
                                                                        <v-col>
                                                                            <v-text-field
                                                                                    v-model="item.resolveTime"
                                                                                    placeholder="زمان کل مشکل"
                                                                                    label="مدت زمان رفع ایراد"
                                                                                    type="number"
                                                                            ></v-text-field>
                                                                        </v-col>
                                                                        <v-col>
                                                                            <v-select
                                                                                    v-model="item.resolveTimeUnit"
                                                                                    :items="priorityUnit"
                                                                                    placeholder="واحد"
                                                                            ></v-select>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>
                                                    </v-row>
                                                </v-card-text>
                                            </v-card>
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
    import {extend, ValidationObserver, setInteractionMode, ValidationProvider} from "vee-validate";

    setInteractionMode("eager");
    extend("required", {
        ...required,
        message: "{_field_} نمی تواند خالی باشد"
    });
    export default {
        name: "SLASetting",
        components: {
            ValidationObserver,
            ValidationProvider
        },
        data() {
            return {
                SLASetting: null,
                OperatingHours: null,
                targetspriority: [],
                requesttypepriority: [],
                priorityUnit: ["روز","ساعت","دقیقه"]
            };
        },
        methods: {
            onSubmit() {
                if (this.$route.params.formType === "Insert") {
                    this.$store
                        .dispatch("SLASettingService/addSLASetting", this.SLASetting)
                        .then(res => {
                            if (res.status === 201) {
                                this.closeDialog();
                            }
                        });
                } else if (this.$route.params.formType === "Edit") {
                    this.$store
                        .dispatch("SLASettingService/editSLASetting", this.SLASetting)
                        .then(res => {
                            if (res.status === 200) {
                                this.closeDialog();
                            }
                        });
                }
            },
            addTargetsPriority() {
            },
            addRequestTypePriority() {
            },
            deleteTargetsPriority(item) {
                console.log(item);
            },
            deleteRequestTypePriority(item) {
                console.log(item);
            },
            closeDialog() {
                this.$router.push("/SLASettings");
            },
            getSLASetting(id) {
                return this.$store.getters["SLASettingService/getSLASetting"](id);
            }
        },
        created() {
            if (this.$route.params.formType === "Edit") {
                let record = this.getSLASetting(this.$route.params.id);
                this.SLASetting = {
                    id: this.$route.params.id,
                    title: record.title,
                    description: record.description,
                    operatinghourid: record.operatinghourid,
                    targetspriority: record.targetspriority,
                    requesttypepriority: record.requesttypepriority
                };
            } else if (this.$route.params.formType === "Insert") {
                this.SLASetting = {
                    title: "",
                    description: "",
                    operatinghourid: "",
                    targetspriority: [
                        {title: "کم", responseTime: "4", responseTimeUnit:"ساعت", resolveTime: "1", resolveTimeUnit:"روز"},
                        {title: "متوسط", responseTime: "4", responseTimeUnit:"ساعت", resolveTime: "8", resolveTimeUnit:"ساعت"},
                        {title: "بالا", responseTime: "2", responseTimeUnit:"ساعت", resolveTime: "4", resolveTimeUnit:"ساعت"},
                        {title: "آنی", responseTime: "1", responseTimeUnit:"ساعت", resolveTime: "3", resolveTimeUnit:"روز"}
                    ],
                    requesttypepriority: [
                        {title: "Web Protal", priority: "Medium"},
                        {title: "Email Channel", priority: "Medium"}
                    ]
                };
            }
            this.$store.dispatch("OperationHourService/loadOperationHours").then(() => {
                this.OperatingHours = this.$store.getters[
                    "OperationHourService/getOperationsHours"
                    ];
            });
        }
    };
</script>

<style lang="scss" scoped></style>
