<template v-slot:items="props">
    <v-bottom-sheet v-model="sheet" inset :max-width="700">
        <v-sheet>
            <v-row no-gutters>
                <v-col>
                    <v-card outlined>
                        <v-card-title>
                            منتقل شود به:
                        </v-card-title>
                        <v-card-text class="mt-3">
                            <v-text-field
                                    v-model="searchKey"
                                    label="جستجو در چارت سازمانی"
                                    clearable
                                    outlined
                                    shaped
                            ></v-text-field>
                            <v-treeview
                                    :items="orgCharts"
                                    :search="searchKey"
                                    :filter="filter"
                                    item-key="id"
                                    item-text="title"
                                    activatable
                                    dense
                                    rounded
                                    transition>
                                <template slot="label" slot-scope="{ item }">
                                    <a @click="selectItem(item)">{{ item.title }}</a>
                                </template>
                            </v-treeview>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    :color="$store.state.defaultColor + ' darken-1'"
                                    text
                                    @click="closeDialog('ok')"
                            >
                                تایید
                            </v-btn>
                            <v-btn
                                    :color="$store.state.defaultColor + ' darken-1'"
                                    text
                                    @click="closeDialog('cancel')"
                            >
                                برگشت
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>

        </v-sheet>
    </v-bottom-sheet>
</template>

<script>
    export default {
        name: "moveSheet",
        props: ["sheet", "item", "orgCharts"],
        data() {
            return {
                selectedItem:null,
                searchKey: "",
                caseSensitive: false,
            }
        },
        computed: {
            filter() {
                return this.caseSensitive
                    ? (item, search, textKey) => item[textKey].indexOf(search) > -1
                    : undefined
            },
        },
        methods: {
            selectItem(item){
              this.selectedItem = item;
            },
            closeDialog(ty) {
                this.$emit("close-moveSheet", {moveSheet: false, selectedItem: this.selectedItem, item:this.item, closetype:ty});
            },
        }
    }
</script>

<style scoped>

</style>
