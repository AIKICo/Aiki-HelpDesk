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
    </v-container>

</template>

<script>
    export default {
        name: "OrganizeCharts",
        data() {
            return {
                OrganizeChartItems: [],
            }
        },
        methods: {
            addChild(item) {
                alert("add child");
                console.log(item);
            },
            deleteChild(item) {
                alert("delete child");
                console.log(item);
            },
            editChild(item) {
                alert("edit child");
                console.log(item);
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