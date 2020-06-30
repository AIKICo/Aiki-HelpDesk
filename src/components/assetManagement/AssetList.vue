<template>
    <v-container>
        <v-row>
            <v-col>
                <v-spacer></v-spacer>
                <v-row>
                    <v-col cols="5">
                        <v-text-field
                                v-model="searchKey"
                                append-icon="mdi-magnify"
                                label="جستجو بر اساس شماره اموال"
                                single-line
                                hide-details
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-data-table
                                :footer-props="{
                                            'items-per-page-options': [50, 100, 150, 200, 250]
                                          }"
                                :headers="headers"
                                :items="items"
                                :items-per-page="itemPerPage"
                                class="elevation-1"
                                item-key="id"
                                multi-sort
                                :search="searchKey"
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
                                            <v-btn :color="$store.state.defaultColor" @click="delAsset(item)" icon>
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                            <v-btn
                                                    :color="$store.state.defaultColor"
                                                    @click="editAsset(item)"
                                                    icon
                                            >
                                                <v-icon>mdi-content-save-edit-outline</v-icon>
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
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "AssetList",
        metaInfo: {
            title: "کنترل اموال"
        },
        components: {},
        data() {
            return {
                headers: [
                    {
                        text: "شماره اموال",
                        value: "assetnumber",
                        width: 100,
                        align: "center",
                    },
                    {
                        text: "تحویل گیرنده",
                        value: "employeeid",
                        width: 150,
                        align: "center",
                    },
                    {
                        text: "نوع اموال",
                        value: "assettypeid",
                        width: 150,
                        align: "center",
                    },
                    {
                        text: "محل اموال",
                        value: "assetlocationid",
                        width: 200,
                        align: "center",
                    },
                    {
                        text: "",
                        value: "actions",
                        align: "center",
                        sortable: false,
                        width: "150px"
                    }
                ],
                expanded: [],
                singleExpand: true,
                selectedItem: false,
                editedIndex: -1,
                editedItem: [],
                itemPerPage: 50,
                searchKey: "",
                items:[],
            }
        },
        methods: {
            ...mapActions({
                getAssetList: "AssetService/loadAssetsView",
                deleteAsset: "AssetService/deleteAsset"
            }),
            selectItem(item) {
                this.selectedItem = item;
            },
            unSelectItem() {
                this.selectedItem = false;
            },
            delAsset(item) {
                this.deleteAsset({"id": item.id}).then(() => {
                    var index = this.items.indexOf(item);
                    this.items.splice(index, 1);
                })
            },
            editAsset(item) {
                this.$router.push("/Asset/Edit/" + item.id);
            }
        },
        created() {
            this.getAssetList().then((res)=>{
                this.items = res.data;
            });
        }
    }
</script>

<style scoped>

</style>