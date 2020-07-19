<template v-slot:items="props">
  <v-card>
    <v-card-text>
      <v-list>
        <v-list-item v-for="item in items" :key="item.name" dense>
          <v-list-item-icon>
            <v-icon :color="item.iconColor">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            {{ item.valueCount }}
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CustomersInfo",
  props: ["customerCounts", "customerDisabledCounts"],
  data: () => ({
    items: []
  }),
  watch: {
    customerCounts: function() {

    },
    customerDisabledCounts: function() {
      this.items=[];
      this.items.push({
        name: "Total",
        title: "تعداد کل مشتریان",
        valueCount: this.customerCounts,
        icon: "mdi-human",
        iconColor: "black"
      });
      this.items.push({
        name: "enabled",
        title: "فعال",
        valueCount: this.customerCounts - this.customerDisabledCounts,
        icon: "mdi-check",
        iconColor: "green"
      });
      this.items.push({
        name: "disabled",
        title: "غیرفعال",
        valueCount: this.customerDisabledCounts,
        icon: "mdi-block-helper",
        iconColor: "red"
      });
    }
  },
  created() {
    this.items.push({
      name: "Total",
      title: "تعداد کل مشتریان",
      valueCount: this.customerCounts,
      icon: "mdi-human",
      iconColor: "black"
    });
    this.items.push({
      name: "enabled",
      title: "فعال",
      valueCount: this.customerCounts - this.customerDisabledCounts,
      icon: "mdi-check",
      iconColor: "green"
    });
    this.items.push({
      name: "disabled",
      title: "غیرفعال",
      valueCount: this.customerDisabledCounts,
      icon: "mdi-block-helper",
      iconColor: "red"
    });
  }
};
</script>

<style scoped>
.v-application--is-rtl .v-list-item__action:first-child,
.v-application--is-rtl .v-list-item__icon:first-child {
  margin-left: 3px !important;
}
</style>
