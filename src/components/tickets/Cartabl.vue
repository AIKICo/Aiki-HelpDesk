<template>
    <div>
        <Tickets v-if="!$store.state.IsMobile"></Tickets>
        <TicketsMobileView v-if="$store.state.IsMobile"></TicketsMobileView>
    </div>
</template>

<script>
    import TicketsMobileView from "./TicketsMobileView";
    import Tickets from "./Tickets";

    export default {
        name: "Cartabl",
        components:{
            TicketsMobileView,
            Tickets
        },
        created() {
            this.$store.dispatch('getTickets');
        },
    }
</script>

<style scoped>

</style>