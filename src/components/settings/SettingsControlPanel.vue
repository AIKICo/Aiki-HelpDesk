<template>
  <v-container>
    <v-item-group
      v-for="header in $store.state.SettingsService.controlPanelItems"
      :key="header.name"
    >
      <v-container>
        <v-row>{{ header.label }}</v-row>
        <v-row>
          <v-col
            :key="setting.name"
            v-for="setting in header.items"
            cols="12"
            md="2"
          >
            <v-item v-slot:default="{ active, toggle }">
              <v-card
                height="158px"
                @click="toggle"
                :to="setting.path"
                hover
              >
                <v-img
                        :src="getStaticImage(setting.image)"
                        @click="toggle"/>
                <v-card-actions>
                  <div class="indigo--text">{{setting.label}}</div>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </v-container>
</template>
<script>
export default {
  name: "SettingsControlPanel",
  metaInfo: {
    title: "تنظیمات"
  }
};
</script>

<style scoped></style>
