<template>
    <div>
        <Tickets v-if="!$store.state.IsMobile"></Tickets>
    </div>
</template>

<script>
    import Tickets from "./Tickets";

    export default {
        name: "Cartabl",
        components:{
            Tickets
        },
        created() {
        },
        metaInfo: {
            title: 'کارتابل'
        }
    }
</script>

<style scoped>

</style>