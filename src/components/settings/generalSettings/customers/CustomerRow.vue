<template v-slot:items="props">
  <v-toolbar class="mt-3">
    <span class="subheading text-wrap">{{ this.customer.title }}</span>

    <v-spacer></v-spacer>
    <v-divider vertical></v-divider>
    <v-toolbar-items class="hidden-sm-and-down ml-1">
      <div class="mx-1">
        <div>وضعیت</div>
        <v-subheader class="mt-3">{{
          this.disabledRow ? "غیرفعال" : "فعال"
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
        <v-list-item dense @click="this.editCustomer">
          <v-list-item-icon><v-icon>mdi-border-color</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>ویرایش</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense @click="this.disabledCustomer">
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
  name: "CustomerRow",
  props: ["customer"],
  data() {
    return {
      disabledRow: this.customer.disabled
    };
  },
  computed: {},
  methods: {
    editCustomer() {
      this.$router.push("/Customer/Edit/" + this.customer.id);
    },
    disabledCustomer() {
      this.disabledRow = !this.disabledRow;
    }
  },
  watch: {
    disabledRow: function() {
      this.$store
        .dispatch("CustomerService/patchCustomer", {
          id: this.customer.id,
          patchDoc: [
            {
              op: "replace",
              path: "/disabled",
              value: this.disabledRow
            },
            {
              op: "replace",
              path: "/title",
              value: this.customer.title
            }
          ]
        })
        .then(res => {
          if (res.status === 200) {
            this.$emit("onDisabledRow",this.disabledRow)
          }
        });
    }
  }
};
</script>

<style scoped>
.v-subheader {
  height: 10px !important;
}
</style>
