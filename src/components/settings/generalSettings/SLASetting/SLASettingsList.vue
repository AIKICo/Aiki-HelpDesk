<template>
    <div>
        SLA Settings
    </div>
</template>

<script>
    export default {
        name:"SLASettingsList",
        data: () => {
            return{
                
            }
        },
        created(){
            this.$store.dispatch("SLASettingService/loadSLASettings")
        }
    }
</script>

<style lang="scss" scoped>

</style>