<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <AppConstantRow
                        v-for="(item, index) in AppConstantItems"
                        :app-constant-item="item"
                        :key="index"
                        v-on:deletedRow="deleteRow(index)"
                ></AppConstantRow>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import AppConstantRow from "./AppConstantRow";

    export default {
        name:"AppConstantList",
        components:{
            AppConstantRow,
        },
        data: () => {
            return{
                AppConstantItems:null,
            }
        },
        methods:{
            deleteRow: function(index){
                this.AppConstantItems.splice(index, 1);
            }
        },
        created(){
            this.$store.dispatch("AppConstantItemsService/loadAppConstantItems", {id: this.$route.params.id}).then(() => {
                this.AppConstantItems = this.$store.getters["AppConstantItemsService/getAppConstantItems"];
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>