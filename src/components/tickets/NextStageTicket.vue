<template v-slot:items="props">
    <v-bottom-sheet
            v-model="show"
            inset
            max-width="550px"
            persistent
            transition="dialog-bottom-transition">
        <v-sheet class="text-center">
            <v-card v-click-outside="onClickOutside">
                <v-card-title :class="$store.state.defaultColor + ' ' + $store.state.defaultHeaderTextColor">تغییر وضعیت
                    درخواست {{workorder.ticketfriendlynumber}}
                </v-card-title>
                <v-card-text class="text-center">
                    <v-form class="mt-3">
                        <validationObserver>
                            <validation-provider
                                    v-slot="{ errors }"
                                    name="شرح مختصر اقدام صورت گرفته"
                                    rules="required"
                            >
                                <v-textarea
                                        v-model="comment"
                                        label="شرح مختصر اقدام صورت گرفته"
                                        outlined
                                        shaped
                                        auto-grow
                                        autofocus
                                        :color="$store.state.defaultColor"
                                        :error-messages="errors"
                                ></v-textarea>
                            </validation-provider>
                            <v-select
                                    :items="Members"
                                    item-text="membername"
                                    item-value="id"
                                    v-model="nextstageAgentId"
                                    label="درخواست ارجاع داده شود به"
                                    shaped
                                    outlined
                                    chips
                                    :disabled="endWorkOrder"
                                    clearable
                                    v-on:change="getText"
                                    @click="openSelect=true"
                                    @focusout="openSelect=false"
                            >
                            </v-select>
                            <v-checkbox
                                    v-model="endWorkOrder"
                                    label="اعلان پایان کار درخواست"
                                    :color="$store.state.defaultColor"
                            ></v-checkbox>
                        </validationObserver>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :color="$store.state.defaultColor +  ' darken-1'" text @click="closeDialog('ok')">
                        تایید
                    </v-btn>
                    <v-btn :color="$store.state.defaultColor + ' darken-1'" text @click="closeDialog('cancel')">
                        انصراف
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-sheet>
    </v-bottom-sheet>
</template>

<script>
    import {mapActions} from 'vuex'
    import {
        extend,
        ValidationObserver,
        ValidationProvider,
        setInteractionMode
    } from "vee-validate";
    import {required} from "vee-validate/dist/rules";
    setInteractionMode("eager");
    extend("required", {
        ...required,
        message: "{_field_} نمی تواند خالی باشد"
    });
    export default {
        name: "NextStageTicket",
        data: () => {
            return {
                comment: "",
                endWorkOrder: false,
                nextstageAgentId: null,
                choiceText:"",
                Members: [],
                openSelect:false
            }
        },
        components: {
            ValidationObserver,
            ValidationProvider
        },
        props: ["sheet", "workorder"],
        methods: {
            ...mapActions({
                getMembers: "MemberService/loadMembers"
            }),
            closeDialog(dialogResult) {
                if (dialogResult==="ok")
                {
                    if (this.comment==="") return;
                }
                this.$emit("close-sheet", {
                    sheet: false,
                    workorder: this.workorder,
                    actionName: "nextStage",
                    dialogResult: dialogResult,
                    historyComment: this.comment,
                    endTicket: this.endWorkOrder,
                    nextStageAgentId: this.nextstageAgentId,
                    nesxtStageAgentName: this.choiceText
                });
            },
            getText (e) {
                this.choiceText = this.Members.find(obj=>{
                    return obj.id == e
                }).membername;
            },
            onClickOutside () {
                if (this.openSelect===false)
                    this.closeDialog('Cancel');
            },
        },
        computed: {
            show: {
                get: function () {
                    return this.sheet;
                },
                set: function (value) {
                    this.$emit("input", value);
                }
            }
        },
        created() {
            this.getMembers().then((res) => {
                this.Members = res.data;
            });
            this.Members=[];
            this.nextstageAgentId=null;
            this.choiceText="";
        }
    }
</script>

<style scoped>

</style>