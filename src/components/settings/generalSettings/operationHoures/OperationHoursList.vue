<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <OperationHoursRow
                        v-for="item in this.operationHoursList"
                        :operation-hour="item"
                        :key="item.id"
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
        computed:{
            operationHoursList: function(){
                return this.$store.getters["OperationHourService/getOperationsHours"]
            }
        },
        created() {
            this.$store.dispatch("OperationHourService/loadOperationHours");
        }
    }
</script>

<style scoped>

</style>