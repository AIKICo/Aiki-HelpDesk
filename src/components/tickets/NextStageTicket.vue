<template>
    <v-bottom-sheet
            v-model="sheet"
            inset
            max-width="500px"
            persistent
            transition="dialog-bottom-transition">
        <v-sheet class="text-center">
            <v-card>
                <v-card-title :class="$store.state.defaultColor + ' ' + $store.state.defaultHeaderTextColor">تغییر وضعیت درخواست {{workorder.woNo}}</v-card-title>
                <v-card-text class="text-center">
                    <v-form class="mt-3">
                        <v-textarea
                                v-model="comment"
                                type="number"
                                label="شرح درخواست"
                                outlined
                                shaped
                                auto-grow
                                autofocus
                                :disabled="endWorkOrder"
                                :color="$store.state.defaultColor"
                        ></v-textarea>
                        <v-select
                                :items="Members"
                                item-text="membername"
                                item-value="id"
                                v-model="nextstageAgent"
                                label="درخواست ارجاع داده شود به"
                                shaped
                                outlined
                                    chips
                        >
                        </v-select>
                        <v-checkbox
                                v-model="endWorkOrder"
                                label="اعلان پایان کار درخواست"
                                :color="$store.state.defaultColor"
                        ></v-checkbox>
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
    import { mapActions } from 'vuex'
    export default {
        name: "NextStageTicket",
        data:()=>{
            return {
                comment:"",
                endWorkOrder:false,
                nextstageAgent:null,
                Members:[]
            }
        },
        props: ["sheet", "workorder"],
        methods: {
            ...mapActions({
               getMembers:"MemberService/loadMembers"
            }),
            closeDialog(dialogResult) {
                this.$emit("close-sheet", {
                    sheet: false,
                    workorder: this.workorder,
                    actionName:"nextStage",
                    dialogResult:dialogResult,
                    historyComment: this.comment,
                    endTicket: this.endWorkOrder,
                    nextStageAgentName: this.nextstageAgent
                });
            }
        },
        created() {
            this.getMembers().then((res)=>{
                this.Members = res.data;
            });
        }
    }
</script>

<style scoped>

</style>