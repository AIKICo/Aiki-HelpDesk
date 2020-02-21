<template>
  <v-bottom-sheet v-model="sheet" inset :max-width="300">
    <v-sheet class="text-center">
      <v-card>
        <v-card-title :class="$store.state.defaultColor + ' ' + $store.state.defaultHeaderTextColor">ارزیابی ناظر</v-card-title>
        <v-card-text class="text-center">
          <v-rating v-model="workorder.manageRate" :color="$store.state.defaultColor"></v-rating>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn :color="$store.state.defaultColor +  ' darken-1'" text @click="closeDialog">
            تایید
          </v-btn>
          <v-btn :color="$store.state.defaultColor + ' darken-1'" text @click="closeDialog">
            انصراف
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-sheet>
  </v-bottom-sheet>

</template>

<script>
export default {
  name: "rateTicket",
  props: ["sheet","workorder"],
  data: () => ({
  }),
  methods: {
    closeDialog() {
      this.$emit("close-sheet", {'sheet':false, 'rate':this.workorder.manageRate});
    },
  }
};
</script>

<style scoped></style>
