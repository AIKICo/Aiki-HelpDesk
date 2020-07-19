<template v-slot:items="props">
  <v-toolbar class="mt-3">
    <span>{{ OperationHour.title}}</span>
    <span v-if="OperationHour.isdefault" class="indigo white--text mx-5" style="border-radius: 3px">پیش فرض</span>
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
        <v-list-item dense @click="this.editOperationHour">
          <v-list-item-icon><v-icon>mdi-border-color</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>ویرایش</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense @click="this.deleteOperationHour">
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
  name: "OperationHoursRow",
  props: ["OperationHour"],
  data() {
    return {};
  },
  methods: {
      editOperationHour() {
          this.$router.push("/OperationHours/Edit/" + this.OperationHour.id);
      },
    deleteOperationHour(){
      this.$store.dispatch("OperationHourService/deleteOperationHour", this.OperationHour.id).then((res)=>{
        if (res.status===200){
          this.$emit('deletedRow');
        }
      });
    }
  },
};
</script>

<style scoped></style>
