<template v-slot:items="props">
  <v-bottom-sheet v-model="show" inset scrollable persistent>
    <v-sheet class="text-center">
      <v-card v-click-outside="onClickOutside">
        <v-card-title :class="$store.state.defaultColor + ' ' + $store.state.defaultHeaderTextColor">
          <span>رویدادنگاری  </span><b> {{ this.wono }}</b>
        </v-card-title>
        <v-card-text class="text-center" style="overflow-y: scroll;max-height: 600px;">
          <v-btn
              class="mt-6 white--text"
              fab
              color="red"
              @click="$emit('close-sheet', {'sheet':false})"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-timeline class="mx-10" reverse>
            <v-timeline-item
                v-for="item in wonoReports"
                :key="item.id"
                :color="$store.state.defaultColor+  ' lighten-2'"
                large
            >
              <template v-slot:opposite>
                <v-chip color="deep-purple accent-4" outlined pill>
                  <v-icon right class="ml-1">mdi-account-outline</v-icon>
                  {{
                    item.agentname === null
                        ? "سامانه مدیریت درخواست"
                        : item.agentname
                  }}
                </v-chip>
              </template>
              <v-card class="elevation-8">
                <v-card-title :class="$store.state.defaultTextColor">{{
                    item.historydate
                  }}
                </v-card-title>
                <v-card-text class="text-right">
                  {{ item.historycomment }}
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: "TicketTimeline",
  props: ["sheet", "wonoReports", "workorder", "wono"],
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
      this.$emit('close-sheet', {'sheet': false})
    },
  }
};
</script>

<style scoped></style>
