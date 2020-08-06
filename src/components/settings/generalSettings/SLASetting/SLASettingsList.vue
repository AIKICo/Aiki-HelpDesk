<template v-slot:items="props">
    <v-container>
        <v-row>
            <v-col cols="12">
                <SLASettingRow
                        v-for="(item, index) in SLAItems"
                        :s-l-a-setting="item"
                        :key="index"
                        v-on:deletedRow="deleteRow(index)"
                ></SLASettingRow>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import SLASettingRow from "./SLASettingRow";
    export default {
        name:"SLASettingsList",
        components:{
            SLASettingRow,
        },
        data: () => {
            return{
                SLAItems:null,
            }
        },
        methods:{
            deleteRow: function(index){
                this.SLAItems.splice(index, 1);
            }
        },
        created(){
            this.$store.dispatch("SLASettingService/loadSLASettings").then((res) => {
                this.SLAItems = res.data;
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>
