<template>
  <v-bottom-sheet v-model="sheet" inset scrollable persistent>
    <v-sheet class="text-center">
      <v-card>
        <v-card-title :class="$store.state.defaultColor + ' ' + $store.state.defaultHeaderTextColor">تاریخچه درخواست {{this.wono}}</v-card-title>
        <v-card-text class="text-center" style="overflow-y: scroll;max-height: 600px;">
          <v-btn
                  class="mt-6"
                  icon
                  :color="$store.state.defaultColor"
                  @click="$emit('close-sheet', {'sheet':false})"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-timeline class="mx-10" reverse >
            <v-timeline-item
                    v-for="item in wonoReports"
                    :key="item.reportID"
                    :color="$store.state.defaultColor+  ' lighten-2'"
                    large
            >
              <template v-slot:opposite>
                <v-chip :color="$store.state.defaultColor" outlined pill>
                  <v-icon right class="ml-1">mdi-account-outline</v-icon>
                  {{
                  item.memberName === null
                  ? "سامانه مدیریت درخواست"
                  : item.memberName
                  }}
                </v-chip>
              </template>
              <v-card class="elevation-2">
                <v-card-title :class="$store.state.defaultTextColor">{{
                  item.reportDate
                  }}</v-card-title>
                <v-card-text class="text-right">
                  {{ item.reportComment }}
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
  props: ["sheet", "wonoReports","workorder", "wono"],
};
</script>

<style scoped></style>
