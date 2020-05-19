<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-data-table
                        :headers="headers"
                        :items="items"
                        class="elevation-1"
                        item-key="id"
                        multi-sort
                >
                    <template v-slot:item="{ item }">
                        <tr
                                :key="item.id"
                                @mouseleave="unSelectItem()"
                                @mouseover="selectItem(item)"
                        >
                            <td class="text-center">
                                <v-chip :color="$store.state.defaultColor + ' lighten-5'"
                                        :text-color="$store.state.defaultColor">
                                    {{ item.assetnumber }}
                                </v-chip>
                            </td>
                            <td class="text-center">
                                {{ item.title }}
                            </td>
                            <td class="text-center">
                                {{ item.assettypeid }}
                            </td>
                            <td class="text-center">
                                {{ item.assetlocationid }}
                            </td>
                            <td>
                                <div v-if="item === selectedItem">
                                    <v-btn :color="$store.state.defaultColor" @click="closeTicket(item)" icon>
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                    <v-btn
                                            :color="$store.state.defaultColor"
                                            @click="showStarsheet(item, 'rateTicket')"
                                            icon
                                    >
                                        <v-icon>mdi-star</v-icon>
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
                        text: "تحویل گیرنده",
                        value: "assetnumber",
                        width: 150,
                        align: "title",
                    },
                    {
                        text: "نوع اموال",
                        value: "assettypeid",
                        width: 200,
                        align: "title",
                    },
                    {
                        text: "محل اموال",
                        value: "assetlocationid",
                        width: 200,
                        align: "title",
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
                getAssetList: "AssetService/loadAssetsView"
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