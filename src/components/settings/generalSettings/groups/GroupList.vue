<template v-slot:items="props">
    <v-container>
        <v-row>
            <v-col cols="12">
                <GroupRow
                        v-for="(item, index) in Groups"
                        :group="item"
                        :key="index"
                        v-on:deletedRow="deleteRow(index)"
                ></GroupRow>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import GroupRow from "./GroupRow";

    export default {
        name:"GroupList",
        components:{
            GroupRow,
        },
        data: () => {
            return{
                Groups:null,
            }
        },
        methods:{
            deleteRow: function(index){
                this.Groups.splice(index, 1);
            }
        },
        created(){
            this.$store.dispatch("GroupService/loadGroups").then((res) => {
                this.Groups = res.data;
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>
