<template v-slot:items="props">
    <v-container>
        <v-row>
            <v-col>
                <MemberRow
                        v-for="item in Members"
                        :member="item"
                        :key="item.id"
                        v-on:onDisabledRow="rowDisabled($event)"
                ></MemberRow>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import MemberRow from "./MemberRow";
    export default {
        name: "MembersList",
        data(){
            return {
                Members: []
            }
        },
        components:{
            MemberRow
        },
        methods:{
            rowDisabled(disabled) {
                if (disabled === true) {
                    this.disabledRow++;
                } else {
                    this.disabledRow--;
                }
            }
        },
        created() {
            this.$store.dispatch("MemberService/loadMembers").then((res)=>{
               this.Members = res.data;
            });
        }
    }
</script>

<style scoped>

</style>