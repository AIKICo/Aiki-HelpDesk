<template>
    <v-container>
        <v-row>
            <v-col>
                <v-treeview
                        :items="OrganizeChartItems"
                        item-key="id"
                        item-text="title"
                        activatable
                        dense
                        rounded
                        transition>
                    <template v-slot:label="{ item }">
                        <v-hover v-slot:default="{ hover }">
                            <div>
                                <span>{{item.title}}</span>
                                <v-btn class="mr-5" v-if="hover" icon @click="addChild(item)">
                                    <v-icon :color="$store.state.defaultColor">
                                        mdi-plus
                                    </v-icon>
                                </v-btn>
                                <v-btn v-if="hover" icon @click="deleteChild(item)">
                                    <v-icon :color="$store.state.defaultColor">
                                        mdi-minus
                                    </v-icon>
                                </v-btn>
                                <v-btn v-if="hover" icon @click="editChild(item)">
                                    <v-icon :color="$store.state.defaultColor">
                                        mdi-cursor-text
                                    </v-icon>
                                </v-btn>
                            </div>
                        </v-hover>
                    </template>
                </v-treeview>
            </v-col>
        </v-row>
        <v-row>
            <OrganizeChart :operation="sheetOperation"
                           :sheet="sheet"
                           :item.sync="selectedItem"
                           @close-sheet="closeSheet"
                           @item-added="addedChild"
                           @item-updated="updatedItem">
            </OrganizeChart>
        </v-row>
    </v-container>

</template>

<script>
    import OrganizeChart from "./OrganizeChart";

    export default {
        name: "OrganizeCharts",
        components: {OrganizeChart},
        data() {
            return {
                OrganizeChartItems: [],
                sheet: false,
                sheetOperation: "",
                selectedItem: null,
                parentItem: null
            }
        },
        methods: {
            addChild(parentItem) {
                this.sheetOperation = "insert";
                this.sheet = !this.sheet;
                this.selectedItem = {
                    title: "",
                    companyId: parentItem.companyid,
                    parent_id: parentItem.id,
                    children: []
                };
                this.ParentItem = parentItem;
            },
            addedChild(e) {
                if (!this.ParentItem.children) {
                    this.$set(this.ParentItem, "children", []);
                }
                this.$store.dispatch("OrganizeChartService/addOrganizeChart", e.itemAdded).then((res) => {
                    if (res.status === 201) {
                        this.ParentItem.children.push(res.data);
                    }
                });
                this.sheet = e.sheet;
            },
            deleteChild(item) {
                console.log(item);
            },
            editChild(item) {
                this.sheetOperation = "update";
                this.sheet = !this.sheet;
                this.selectedItem = item;
            },
            updatedItem(e) {
                this.sheet = !this.sheet;
                this.$store.dispatch("OrganizeChartService/editOrganizeChart", e.itemUpdated).then((res) => {
                    if (res.status === 201) {
                        this.selectedItem = e.itemUpdated;
                    }
                });
            },
            closeSheet(e) {
                this.sheet = e.sheet;
            },
        },
        created() {
            this.$store.dispatch("OrganizeChartsJsonView/loadOrganizeCharts_JsonView",
                this.$route.params.id).then((res) => {
                this.OrganizeChartItems = JSON.parse(res.data[0].organizecharts);
            })
        }
    }
</script>

<style scoped>

</style>