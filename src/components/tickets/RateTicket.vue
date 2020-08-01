<template v-slot:items="props">
  <v-bottom-sheet v-model="show" inset :max-width="500">
    <v-sheet class="text-center">
      <v-card v-click-outside="onClickOutside">
        <v-card-title :class="$store.state.defaultColor + ' ' + $store.state.defaultHeaderTextColor">ارزیابی
          ناظر درخواست {{ workorder.ticketfriendlynumber }}
        </v-card-title>
        <v-card-text class="text-center">
          <vue-feedback-reaction
              v-model="workorder.ticketrate"
              :labels="labels"
              value="Number" />
<!--          <v-rating v-model="workorder.ticketrate" :color="$store.state.defaultColor"></v-rating>-->
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn :color="$store.state.defaultColor +  ' darken-1'" text @click="closeDialog('OK')">
            تایید
          </v-btn>
          <v-btn :color="$store.state.defaultColor + ' darken-1'" text @click="closeDialog('Cancel')">
            انصراف
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import {VueFeedbackReaction} from 'vue-feedback-reaction';

export default {
  name: "RateTicket",
  props: ["sheet", "workorder"],
  components:{
    VueFeedbackReaction
  },
  data: () => ({
    labels:["خیلی ضعیف","ضعیف","متوسط","خوب","عالی"]
  }),
  computed: {
    show: {
      get: function () {
        return this.sheet;
      },
      set: function (value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    onClickOutside() {
      this.closeDialog('Cancel');
    },
    closeDialog(action) {
      if (action === "OK") {
        console.log(this.workorder.ticketrate);
        this.$emit("close-sheet", {
          sheet: false,
          rate: this.workorder.ticketrate,
          actionName: "setRate",
          dialogResult: "ok"
        });
      } else {
        this.$emit("close-sheet", {
          sheet: false,
          rate: this.workorder.ticketrate,
          actionName: "setRate",
          dialogResult: "cancel"
        });
      }
    },
  }
};
</script>

<style scoped></style>
