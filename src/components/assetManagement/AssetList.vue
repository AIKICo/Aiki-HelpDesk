<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-data-table
                        :headers="headers"
                        multi-sort
                        :items="items"
                        class="elevation-1"
                >
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: "AssetList",
        components: {},
        data() {
            return {
                headers: [
                    {
                        text: "شماره اموال",
                        value: "assetnumber",
                        width: 200
                    }
                ]
            }
        },
        computed: {
            ...mapState({
                items: state => state.AssetService.current
            })
        },
        methods: {
            ...mapActions({
                getAssetList: "AssetService/loadAssets"
            })
        },
        created() {
            this.getAssetList();
        }
    }
</script>

<style scoped>

</style>