<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-data-table
                        :headers="headers"
                        item-key="id"
                        multi-sort
                        :items="items"
                        class="elevation-1"
                >
                    <template v-slot:item="{ item }">
                        <tr
                                :key="item.id"
                                @mouseover="selectItem(item)"
                                @mouseleave="unSelectItem()"
                        >
                            <td class="text-center">
                                <v-chip :color="$store.state.defaultColor + ' lighten-5'"
                                        :text-color="$store.state.defaultColor">
                                    {{ item.assetnumber }}
                                </v-chip>
                            </td>
                            <td>
                                <div v-if="item === selectedItem">
                                    <v-btn icon :color="$store.state.defaultColor" @click="showHistorySheet(item)">
                                        <v-icon>mdi-history</v-icon>
                                    </v-btn>
                                    <v-btn
                                            icon
                                            :color="$store.state.defaultColor"
                                            @click="nextStageTicket(item)"
                                    >
                                        <v-icon>mdi-check-circle</v-icon>
                                    </v-btn>
                                    <v-btn icon :color="$store.state.defaultColor" @click="closeTicket(item)">
                                        <v-icon>mdi-close-circle</v-icon>
                                    </v-btn>
                                    <v-btn
                                            icon
                                            :color="$store.state.defaultColor"
                                            @click="showStarsheet(item, 'rateTicket')"
                                    >
                                        <v-icon>mdi-star</v-icon>
                                    </v-btn>
                                    <v-btn icon :color="$store.state.defaultColor" @click="rejectWorkOrder(item)">
                                        <v-icon>mdi-cancel</v-icon>
                                    </v-btn>
                                </div>
                                <div v-if="item!=selectedItem">
                                    {{ item.lastStatus }}
                                </div>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: "AssetList",
        components: {},
        data() {
            return {
                headers: [
                    {
                        text: "شماره اموال",
                        value: "assetnumber",
                        width: 60,
                        align: "center",
                    },
                    {
                        text: "",
                        value: "actions",
                        align: "center",
                        sortable: false,
                        width: "350px"
                    }
                ],
                expanded: [],
                singleExpand: true,
                selectedItem: false,
                editedIndex: -1,
                editedItem: [],
            }
        },
        computed: {
            ...mapState({
                items: state => state.AssetService.current
            })
        },
        methods: {
            ...mapActions({
                getAssetList: "AssetService/loadAssets"
            }),
            selectItem(item) {
                this.selectedItem = item;
            },
            unSelectItem() {
                this.selectedItem = false;
            },
        },
        created() {
            this.getAssetList();
        }
    }
</script>

<style scoped>

</style>