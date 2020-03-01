<template>
  <v-toolbar>
    <span class="subheading">{{ this.customer.title }}</span>

    <v-spacer></v-spacer>
    <v-divider vertical></v-divider>
    <v-toolbar-items class="hidden-sm-and-down">
      <div class="mx-1 mt-3">
        <div>وضعیت</div>
        <v-subheader>{{
          this.customer.disabled ? "غیرفعال" : "فعال"
        }}</v-subheader>
      </div>
      <v-divider vertical></v-divider>

      <div class="mx-1 mt-3">
        <div>دامنه ها</div>
        <v-subheader>{{ this.customer.domains }}</v-subheader>
      </div>

      <v-divider vertical></v-divider>
    </v-toolbar-items>

    <div class="text-center">
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-app-bar-nav-icon v-on="on" class="justify-center"></v-app-bar-nav-icon>
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
    </div>
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
.v-application--is-rtl .v-list-item__action:first-child,
.v-application--is-rtl .v-list-item__icon:first-child {
  margin-left: 3px;
}
</style>
