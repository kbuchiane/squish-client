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
      <p class="bannerUsername noselect">{{ userData.username }}</p>
      <v-btn
        v-if="userData.username.length > 0"
        @click="logout()"
        color="orange"
        class="bannerLogoutButton"
      >Log Out</v-btn>
    </v-app-bar>

    <v-content>
      <Index @updateUsername="updateUsername" />
    </v-content>
  </v-app>
</template>

<script>
import Index from "./components/Index";
import axios from "axios";

export default {
  name: "App",
  components: {
    Index
  },
  data: () => ({
    serverUrl: "http://localhost:3000",
    userData: {
      username: "",
      email: ""
    }
  }),
  methods: {
    updateUsername: function(username) {
      this.userData.username = username;
    },
    logout: function() {
      this.serverLogout(this.userData.username).then(data => {
        this.userData.username = "";
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

<style scoped src='./assets/styles/app.css'></style>