<template>
    <v-container>
        <v-row>
            <v-col>
                <v-treeview :items="OrganizeChartItems"
                            item-key="id"
                            item-text="title"
                            dense activatable hoverable shaped rounded>
                    <template v-slot:append="{ item }">
                        <v-btn icon @click="addChild(item)">
                            <v-icon :color="$store.state.defaultColor">
                                mdi-plus
                            </v-icon>
                        </v-btn>
                        <v-btn icon @click="deleteChild(item)">
                            <v-icon :color="$store.state.defaultColor">
                                mdi-minus
                            </v-icon>
                        </v-btn>
                        <v-btn icon @click="editChild(item)">
                            <v-icon :color="$store.state.defaultColor">
                                mdi-cursor-text
                            </v-icon>
                        </v-btn>
                    </template>
                </v-treeview>
            </v-col>
        </v-row>
        <v-row>
            <OrganizeChart :operation="sheetOperation"
                           :sheet="sheet"
                           :item="selectedItem"
                           @close-sheet="closeSheet"
                           @item-added="addedChild">
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
                sheet:false,
                sheetOperation:"",
                selectedItem:null,
            }
        },
        methods: {
            addChild(parentItem) {
                this.sheetOperation = "insert";
                this.sheet = !this.sheet;
                this.selectedItem = {
                    id:null,
                    title:"",
                    companyId: parentItem.companyid,
                    parent_id : parentItem.id,
                    children:[]
                };
            },
            addedChild(e){
                this.sheet = e.sheet;
            },
            deleteChild(item) {
                alert("delete child");
                console.log(item);
            },
            editChild(item) {
                this.sheetOperation="update";
                this.sheet = !this.sheet;
                this.selectedItem = item;
                this.parentSelectedItem=null;
            },
            closeSheet(e) {
                this.sheet = e.sheet;
            }
        },
        created() {
            this.$store.dispatch("OrganizeChartsJsonView/loadOrganizeCharts_JsonView",
                this.$route.params.id).then((res) => {
                this.OrganizeChartItems = JSON.parse("[" + res.data[0].organizecharts + "]");
            })
        }
    }
</script>

<style scoped>

</style>