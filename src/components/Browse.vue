<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
      <p
        @userlogin="setUsername()"
        @usersignup="setUsername()"
        class="bannerUsername"
      >{{ username }}</p>
      <v-btn @click="logout()" color="orange" class="logoutButton">Log Out</v-btn>
    </v-app-bar>
  </v-app>
</template>


<script>
import axios from "axios";

export default {
  name: "Browse",
  data: () => ({
    serverUrl: "http://localhost:3000",
    userData: {
      username: "",
      email: ""
    }
  }),
  methods: {
    logout: function() {
      this.serverLogout(this.username).then(data => {
        this.username = "";
      });
    },
    serverLogout: function(username) {
      return axios
        .get(this.serverUrl + "/logout", {
          params: {
            username: username
          }
        })
        .then(function(response) {
          return response.data;
        });
    }
  }
};
</script>

<style scoped src='./assets/styles/topBanner.css'></style>