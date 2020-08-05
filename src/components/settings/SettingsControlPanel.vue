<template v-slot:items="props">
  <v-container>
    <v-item-group
        v-for="(header) in controlPanelItemsFilterd"
        :key="header.name">
      <v-container>
        <v-row>
          <v-col>
            <v-card
            >
              <v-card-title style="padding: 0">
                <v-list width="100%" disabled style="padding: 1px">
                  <v-list-item-group :color="$store.state.defaultColor" mandatory>
                    <v-list-item to="/settingsControlPanel">
                      <v-list-item-icon>
                        <v-icon v-text="header.icon" :color="$store.state.defaultColor" large dense ></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title class="font-weight-bold" style="font-size: 20px" v-text="header.label" :color="$store.state.defaultColor"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col
                      :key="setting.name"
                      v-for="setting in header.items"
                      v-show="setting.roles.split(',').includes($store.state.memberRole)"
                      cols="12"
                      md="2"
                      align="center"
                  >
                    <v-item v-slot:default="{ active, toggle }">
                      <v-row>
                        <v-col>
                          <v-row no-gutters>
                            <v-col>
                              <v-avatar
                                  size="110"
                                  @click="toggle">
                                <embed type="image/svg+xml" :src="getStaticImage(setting.image)" @click="toggle"/>
                              </v-avatar>
                            </v-col>
                          </v-row>
                          <v-row no-gutters>
                            <v-col>
                              <v-hover v-slot:default="{ hover }" open-delay="50">
                                <v-chip class="mt-3"
                                        :to="setting.path"
                                        :color="hover? $store.state.defaultColor:''"
                                        :text-color="hover ? 'white' : ''" ripple>
                                  {{ setting.label }}
                                </v-chip>
                              </v-hover>

                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-item>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </v-container>
</template>
<script>
import {mapState} from 'vuex'

export default {
  name: "SettingsControlPanel",
  metaInfo: {
    title: "تنظیمات"
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      memberRole: state => state.memberRole,
      controlPanelItemsFilterd: state => state.SettingsService.controlPanelItems.filter(function (el) {
        return el.roles.split(",").includes(state.memberRole)
      })
    }),
  },
  methods: {}
};
</script>

<style scoped>
</style>
