<template v-slot:items="props">
    <v-toolbar class="mt-3">
        <span class="subheading text-wrap">{{ member.membername }} <span :class="$store.state.defaultTextColor">({{member.username}})</span></span>

        <v-spacer></v-spacer>
        <v-divider vertical v-if="member.allowdelete"></v-divider>
        <v-toolbar-items class="hidden-sm-and-down ml-1" v-if="member.allowdelete">
            <div class="mx-1">
                <v-subheader class="mt-3">{{
                    this.disabledRow ? "غیرفعال" : "فعال"
                    }}</v-subheader>
            </div>
            <v-divider vertical></v-divider>
        </v-toolbar-items>
        <v-menu offset-y v-if="member.allowdelete">
            <template v-slot:activator="{ on }">
                <v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>
            </template>
            <v-list>
                <v-list-item dense @click="this.editMember">
                    <v-list-item-icon><v-icon>mdi-border-color</v-icon></v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>ویرایش</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item dense @click="this.disabledMember">
                    <v-list-item-icon>
                        <v-icon :color="!this.disabledRow ? 'red' : 'green'">{{
                            !this.disabledRow ? "mdi-cancel" : "mdi-check"
                            }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title
                                :class="!this.disabledRow ? 'text--green' : 'text--red'"
                        >{{ !this.disabledRow ? "غیرفعال" : "فعال" }}</v-list-item-title
                        >
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-toolbar>
</template>

<script>
    export default {
        name: "MemberRow",
        props:["member"],
        data() {
            return {
                disabledRow: false,
            };
        },
        methods: {
            editMember() {
                this.$router.push("/Member/Edit/" + this.member.id);
            },
            disabledMember() {
                this.disabledRow = !this.disabledRow;
            }
        },
        watch: {
            disabledRow: function() {
                this.$store
                    .dispatch("MemberService/patchMember", {
                        id: this.member.id,
                        patchDoc: [
                            {
                                op: "replace",
                                path: "/disabled",
                                value: this.disabledRow
                            },
                            {
                                op: "replace",
                                path: "/membername",
                                value: this.member.membername
                            }
                        ]
                    })
                    .then(res => {
                        if (res.status === 200) {
                            this.$emit("onDisabledRow",this.disabledRow)
                        }
                    });
            }
        },
        created() {
            this.disabledRow = this.member.disabled;
        }
    }
</script>

<style scoped>

</style>