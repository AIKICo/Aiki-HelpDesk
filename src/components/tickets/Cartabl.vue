<template>
    <div>
        <Tickets v-if="!$store.state.IsMobile"></Tickets>
    </div>
</template>

<script>
    import Tickets from "./Tickets";
    import {mapActions} from "vuex";

    export default {
        name: "Cartabl",
        components:{
            Tickets
        },
        methods:{
            ...mapActions({
                getTickets: "TicketService/loadTickets",
            }),
        },
        created() {
            this.getTickets()
        },
        metaInfo: {
            title: 'کارتابل'
        }
    }
</script>

<style scoped>

</style>