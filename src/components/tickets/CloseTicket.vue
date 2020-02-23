<template>
  <v-bottom-sheet v-model="sheet" inset max-width="500px">
    <v-sheet class="text-center">
      <v-card>
        <v-card-title :class="$store.state.defaultColor + ' ' + $store.state.defaultHeaderTextColor">بستن درخواست {{workorder.woNo}}</v-card-title>
        <v-card-text class="text-center">
          <v-form class="mt-3">
            <v-text-field
              v-model="workorder.manDays"
              type="number"
              label="نفر ساعت مصرفی"
              outlined
              shaped
            ></v-text-field>
            <v-select
              :items="commentItems"
              item-text="consCommentText"
              item-value="consCommentCode"
              outlined
              shaped
              label="گروه درخواست"
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :color="$store.state.defaultColor + ' darken-1'" text @click="closeDialog">
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
  name: "CloseTicket",
  props: ["sheet", "workorder", "commentItems"],
  data: () => ({}),
  methods: {
    closeDialog() {
      this.$emit("close-sheet", { sheet: false, workorder: this.workorder });
    }
  }
};
</script>

<style scoped></style>
