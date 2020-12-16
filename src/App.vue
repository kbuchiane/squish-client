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
      @setUserData="setUserData"
      @setVerifyData="setVerifyData"
      @clearVerifyData="clearVerifyData"
      :verify="verify"
      @setResetPasswordData="setResetPasswordData"
      @clearResetPasswordData="clearResetPasswordData"
      :resetPassword="resetPassword"
      :user="user"
    />
  </v-app>
</template>

<script>
import Browse from "./components/Browse";
import Signup from "./components/Signup";
import VerifyEmail from "./components/VerifyEmail";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import axios from "axios";
import appConfig from "./config/app.config";
import cookieUtil, { cookieExists } from "./utils/cookie.util";

export default {
  name: "App",
  components: {
    Browse,
    Signup,
    VerifyEmail,
    Login,
    ResetPassword
  },
  data: () => ({
    serverUrl: appConfig.SERVER_URL,
    user: {
      loggedIn: false,
      accessToken: "",
      username: "",
      icon: "",
      usersFollowing: [],
      gamesFollowing: []
    },
    verify: {
      email: "",
      message: ""
    },
    resetPassword: {
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
    setUserData: function(accessToken, username) {
      this.user.loggedIn = true;
      this.user.accessToken = accessToken;
      this.user.username = username;
    },
    setVerifyData: function(verifyData) {
      this.verify.email = verifyData.email;
      this.verify.message = verifyData.message;
    },
    clearVerifyData: function() {
      this.verify.email = "";
      this.verify.message = "";
    },
    setResetPasswordData: function(resetPasswordData) {
      this.resetPassword.email = resetPasswordData.email;
      this.resetPassword.message = resetPasswordData.message;
    },
    clearResetPasswordData: function() {
      this.resetPassword.email = "";
      this.resetPassword.message = "";
    },
    silentRefresh: function() {
      this.serverSilentRefresh().then(response => {
        if (response.status === 200 && response.data.message != false) {
          this.setUserData(response.data.accessToken, response.data.username);
        } else {
          this.logout();
        }
      });
    },
    serverSilentRefresh: function() {
      return axios
        .get(this.serverUrl + "/refreshToken", {
          withCredentials: true
        })
        .then(function(response) {
          return response;
        })
        .catch(error => {
          return error.response;
        });
    },
    logout: function() {
      this.serverLogout().then(response => {
        this.clearUserData();
      });
    },
    serverLogout: function() {
      return axios
        .post(
          this.serverUrl + "/logout",
          {},
          {
            withCredentials: true
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
      this.user.accessToken = "";
      this.user.username = "";
      this.user.userIcon = "";
      this.usersFollowing = [];
      this.gamesFollowing = [];
    }
  },
  mounted: function() {
    this.silentRefresh();
    setInterval(this.silentRefresh, appConfig.REFRESH_INTERVAL);
  }
};
</script>

<style scoped src='./assets/styles/app.css'></style>