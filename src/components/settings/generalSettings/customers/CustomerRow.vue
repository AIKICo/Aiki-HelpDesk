<template>
  <v-toolbar>
    <span class="subheading">{{ this.customer.title }}</span>

    <v-spacer></v-spacer>
    <v-divider vertical></v-divider>
    <v-toolbar-items class="hidden-sm-and-down ml-1">
      <div class="mx-1">
        <div>وضعیت</div>
        <v-subheader class="mt-3">{{
          this.customer.disabled ? "غیرفعال" : "فعال"
        }}</v-subheader>
      </div>
      <v-divider vertical></v-divider>

      <div class="mx-1">
        <div>دامنه ها</div>
        <v-subheader class="mt-3">{{ this.customer.domains }}</v-subheader>
      </div>

      <v-divider vertical></v-divider>
    </v-toolbar-items>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>
      </template>
      <v-list>
        <v-list-item dense @click="this.anyThing">
          <v-list-item-icon
          ><v-icon>mdi-border-color</v-icon></v-list-item-icon
          >
          <v-list-item-content>
            <v-list-item-title>ویرایش</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense @click="this.anyThing">
          <v-list-item-icon>
            <v-icon color="red">mdi-cancel</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="red--text">غیرفعال</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-toolbar>
</template>

<script>
export default {
  name: "CustomerRow",
  props: ["customer"],
  methods: {
    anyThing() {
      this.$router.push('/Customer/Edit/'+this.customer.id);
    }
  }
};
</script>

<style scoped>
.v-subheader {
  height: 10px !important;
}
</style>
