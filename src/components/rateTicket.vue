<template>
  <v-card>
    <v-card-title>ارزیابی ناظر</v-card-title>
    <div class="text-center">
      <v-rating v-model="rating" color="indigo"></v-rating>
    </div>
    <v-card-text> </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="green darken-1" text @click="closeDialog(false)">
        تایید
      </v-btn>

      <v-btn color="green darken-1" text @click="closeDialog(false)">
        انصراف
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "rateTicket",
  data: () => ({
    rating: 1,
  }),
  methods: {
      closeDialog(dialog){
          this.$emit('close-Dialog', dialog);
      }
  }
};
</script>

<style scoped></style>
