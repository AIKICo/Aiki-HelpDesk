<template v-slot:items="props">
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
            v-model="searchKey"
            append-icon="mdi-magnify"
            label="جستجو"
            single-line
            hide-details
            clearable
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <AppConstantRow
            v-for="(item, index) in filteredItems"
            :app-constant-item="item"
            :key="index"
            v-on:deletedRow="deleteRow(index)"
        ></AppConstantRow>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppConstantRow from "./AppConstantRow";

export default {
  name: "AppConstantList",
  components: {
    AppConstantRow,
  },
  data: () => {
    return {
      AppConstantItems: null,
      searchKey: ""
    }
  },
  methods: {
    deleteRow: function (index) {
      this.AppConstantItems.splice(index, 1);
    }
  },
  computed: {
    filteredItems() {
      if (this.searchKey!==''){
        return this.AppConstantItems.filter(item => {
          return item.value1.indexOf(this.searchKey) > -1
        });
      }
      else{
        return this.AppConstantItems;
      }
    }
  },
  created() {
    this.$store.dispatch("AppConstantItemsService/loadAppConstantItems", this.$route.params.id).then((res) => {
      this.AppConstantItems = res.data;
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
