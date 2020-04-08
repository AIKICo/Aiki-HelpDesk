<template>
    <v-toolbar class="mt-3">
        <span>{{ Group.title}}</span>
        <v-spacer></v-spacer>
        <v-divider vertical></v-divider>
        <v-toolbar-items class="hidden-sm-and-down ml-1">
            <v-divider vertical></v-divider>
        </v-toolbar-items>
        <v-menu offset-y>
            <template v-slot:activator="{ on }">
                <v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>
            </template>
            <v-list>
                <v-list-item dense @click="this.editGroup">
                    <v-list-item-icon><v-icon>mdi-border-color</v-icon></v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>ویرایش</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item dense @click="this.deleteGroup">
                    <v-list-item-icon><v-icon>mdi-delete</v-icon></v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>حذف</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-toolbar>
</template>

<script>
    export default {
        name:"GroupRow",
        props:["Group"],
        methods:{
            editGroup(){
                this.$router.push("/Group/Edit/" + this.Group.id);
            },
            deleteGroup(){
                this.$store.dispatch("GroupService/deleteGroup", this.Group.id).then((res)=>{
                    if (res.status===200){
                        this.$emit('deletedRow');
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>