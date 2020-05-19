<template>
  <v-app>
    <v-app-bar app color="green" dark>
      <router-link to="/browse" class="d-flex align-center">
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
      </router-link>

      <v-spacer></v-spacer>
      <div v-if="user.loggedIn" class="bannerOptions">
        <p class="bannerUsername noselect">{{ user.username }}</p>
        <v-btn @click="logout()" color="orange" class="bannerLogoutButton">Log Out</v-btn>
      </div>
      <div v-if="!user.loggedIn" class="bannerOptions">
        <v-btn to="/login" color="blue" class="bannerLoginButton">Log In</v-btn>
        <v-btn to="/signup" color="orange" class="bannerSignupButton">Sign Up</v-btn>
      </div>
    </v-app-bar>

    <!-- Event listeners from child components -->
    <router-view
      @userLogin="setUserLogin"
      @userVerify="setUserVerify"
      @clearVerify="clearVerify"
      :verify="verify"
    />
  </v-app>
</template>

<script>
import Browse from "./components/Browse";
import Signup from "./components/Signup";
import VerifyEmail from "./components/VerifyEmail";
import Login from "./components/Login";
import axios from "axios";
import privateConfig from "./config/private.config";

export default {
  name: "App",
  components: {
    Browse,
    Signup,
    VerifyEmail,
    Login
  },
  data: () => ({
    serverUrl: privateConfig.SERVER_URL,
    user: {
      loggedIn: false,
      jwtToken: "",
      username: "",
      icon: "",
      usersFollowing: [],
      gamesFollowing: []
    },
    verify: {
      email: "",
      message: ""
    },
    clip: {
      username: "",
      video: "",
      title: "",
      gameTitle: "",
      duration: "",
      dateCreated: "",
      thumbnail: "",
      viewCount: "",
      likes: [],
      comments: []
    },
    comment: {
      username: "",
      text: "",
      dateCreated: "",
      likes: [],
      comments: []
    },
    like: {
      username: ""
    },
    game: {
      title: "",
      icon: ""
    }
  }),
  methods: {
    setUserLogin: function(token, username) {
      this.user.loggedIn = true;
      this.user.jwtToken = token;
      this.user.username = username;
    },
    setUserVerify: function(verifyData) {
      this.verify.email = verifyData.email;
      this.verify.message = verifyData.message;
    },
    clearVerify: function() {
      this.verify.email = "";
      this.verify.message = "";
    },
    logout: function() {
      this.serverLogout(this.user.username).then(response => {
        this.clearUserData();
      });
    },
    serverLogout: function(username) {
      return axios
        .post(
          this.serverUrl + "/logout",
          {
            auth: {
              username: username
            }
          },
          {
            headers: {
              Authorization: "Bearer " + this.user.jwtToken
            }
          }
        )
        .then(function(response) {
          return response;
        })
        .catch(error => {
          return error.response;
        });
    },
    clearUserData: function() {
      this.user.loggedIn = false;
      this.user.jwtToken = "";
      this.user.username = "";
      this.user.userIcon = "";
      this.usersFollowing = [];
      this.gamesFollowing = [];
    }
  }
};
</script>

<style scoped src='./assets/styles/app.css'></style>