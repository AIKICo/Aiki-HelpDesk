<template v-slot:items="props">
    <v-bottom-sheet v-model="show" inset max-width="600px">
        <v-sheet class="text-center">
            <v-card>
                <v-card-title :class="$store.state.defaultColor + ' ' + $store.state.defaultHeaderTextColor">بستن
                    درخواست {{workorder.ticketfriendlynumber}}
                </v-card-title>
                <v-card-text class="text-center">
                    <v-form class="mt-3">
                        <v-text-field
                                v-model="workorder.mandays"
                                type="number"
                                label="نفر ساعت مصرفی"
                                outlined
                                shaped
                        ></v-text-field>
                        <v-select
                                :items="commentItems"
                                v-model="workorder.operateid"
                                item-text="value1"
                                item-value="id"
                                outlined
                                shaped
                                label="نوع فرآیند"
                        ></v-select>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :color="$store.state.defaultColor + ' darken-1'" text @click="closeDialog('ok')">
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

    export default {
        name: "CloseTicket",
        props: ["sheet", "workorder"],
        data: () => ({
            commentItems:[]
        }),
        methods: {
            ...mapActions({
                getAppConstantItem:"AppConstantItemsService/loadAppConstantItems"
            }),
            closeDialog(dialogResult) {
                this.$emit("close-sheet", {
                    sheet: false,
                    workorder: this.workorder,
                    dialogResult: dialogResult,
                    actionName: "closeTicket"
                });
            }
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
            this.getAppConstantItem("416e2a28-cfc4-49f9-9bf1-6ef0451a5b7a").then((res)=>{
                this.commentItems = res.data;
            });
        }
    }
</script>

<style scoped></style>
