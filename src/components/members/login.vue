<template >
  <v-container fluid fill-height>
    <v-layout row wrap align-center>
      <v-row justify="center" align="center">
        <v-col cols="5">

          <v-form v-on:submit.prevent="loginUser()">
            <v-card
                    class="mx-auto"
                    outlined
            >
              <v-card-title>میزکار خدمات رایانه ای</v-card-title>
              <v-card-text>
                <v-text-field
                        v-model="loginDetails.userName"
                        label="نام کاربری"
                        required
                        clearable
                ></v-text-field>
                <v-text-field
                        v-model="loginDetails.password"
                        label="کلمه عبور"
                        required
                        clearable
                        :type="'password'"
                ></v-text-field>
              </v-card-text>

              <v-card-actions>
                <v-btn :color="$store.state.defaultColor + ' darken-1'" type="submit" value="login" text>ورود به سامانه</v-btn>
              </v-card-actions>
            </v-card>

          </v-form>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginDetails: {
        userName: "",
        password: ""
      }
    };
  },
  methods: {
    loginUser: function() {
      const authUser = {};
      var app = this;
      this.$store
        .dispatch("login", {
          userName: this.loginDetails.userName,
          passwd: this.loginDetails.password
        })
        .then(response => {
          if (response.status === 200) {
            authUser.data = response.data;
            authUser.token = response.data.token;
            app.$store.state.isLoggedIn = true;
            window.localStorage.setItem("userInfo", JSON.stringify(authUser));
            window.localStorage.setItem("access_token", authUser.token);
            app.$router.push('/cartabl');
          }
        })
        .catch(function(err) {
          console.log(err.data);
        });
    },
  },
  created: function() {
  }
};
</script>

<style scoped>
</style>
