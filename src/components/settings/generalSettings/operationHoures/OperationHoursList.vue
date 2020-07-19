<template v-slot:items="props">
    <v-container>
        <v-row>
            <v-col cols="12">
                <OperationHoursRow
                        v-for="(item, index) in operationHoursList"
                        :operation-hour="item"
                        :key="index"
                        v-on:deletedRow="deleteRow(index)"
                ></OperationHoursRow>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import OperationHoursRow from "./OperationHoursRow";
    export default {
        name: "OperationHoursList",
        components:{
            OperationHoursRow
        },
        data(){
            return{
                operationHoursList:[]
            }
        },
        computed:{
        },
        methods:{
            deleteRow: function(index){
                this.operationHoursList.splice(index, 1);
            }
        },
        created() {
            this.$store.dispatch("OperationHourService/loadOperationHours").then((res)=>{
                this.operationHoursList = res.data;
            });
        }
    }
</script>

<style scoped>

</style>