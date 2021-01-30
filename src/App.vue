<template>
  <v-app>
    <v-app-bar app flat color="black">
      <router-link to="/browse" class="d-flex align-center">
        <v-img
          alt="Squish Logo"
          class="shrink mr-2"
          contain
          src="./assets/images/logo.png"
          transition="scale-transition"
          width="100"
        />
      </router-link>
      <router-link to="/browse" class="clipsRouterLink">
        <div @click="scrollToTop()" class="appBarClips">Clips</div>
      </router-link>
      <router-link to="/browseGames" class="clipsRouterLink">
        <div @click="scrollToTop()" class="appBarClips">Games</div>
      </router-link>
      <router-link v-if="user.loggedIn" to="/post" class="clipsRouterLink">
        <div class="appBarClips">Post</div>
      </router-link>
      <input
        v-model="searchTerm"
        v-on:keyup.enter="search()"
        placeholder="Search"
        class="searchTextBox"
        ref="searchBar"
      />
      <img @click="search()" class="searchImage" :src="searchIcon" />
      <v-spacer></v-spacer>
      <div v-if="user.loggedIn" class="bannerOptions">
        <router-link
          :to="{ name: 'Profile', params: { userProfile: userProfile } }"
          class="d-flex align-center"
        >
          <v-img
            @click="scrollToTop()"
            class="shrink mr-2 userImage"
            contain
            :src="userProfile.image"
          />
          <p @click="scrollToTop()" class="bannerUsername noselect">
            {{ user.username }}
          </p>
        </router-link>
        <v-btn @click="logout()" color="#32cd32" class="bannerLogoutButton"
          >Log Out</v-btn
        >
      </div>
      <div v-if="!user.loggedIn" class="bannerOptions">
        <v-btn to="/login" color="#32cd32" class="bannerLoginButton"
          >Log In</v-btn
        >
        <v-btn to="/signup" color="#32cd32" class="bannerSignupButton"
          >Sign Up</v-btn
        >
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
import BrowseGames from "./components/BrowseGames";
import SingleClip from "./components/SingleClip";
import SingleGame from "./components/SingleGame";
import Profile from "./components/Profile";
import Post from "./components/Post";
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
    BrowseGames,
    SingleClip,
    SingleGame,
    Profile,
    Post,
    Signup,
    VerifyEmail,
    Login,
    ResetPassword,
  },
  data: () => ({
    serverUrl: appConfig.SERVER_URL,
    user: {
      loggedIn: false,
      accessToken: "",
      username: "",
      icon: "",
      usersFollowing: [],
      gamesFollowing: [],
    },
    userProfile: {
      username: "JackiePrince",
      joinedDate: "Dec 24, 2020",
      image: require("./assets/images/crown.png"),
      followed: true,
      followerCount: "346M",
      clipsCount: "54",
      badges: {
        badgeOne: require("./assets/images/badge1.png"),
        badgeTwo: require("./assets/images/badge2.png"),
        badgeThree: require("./assets/images/badge3.png"),
        badgeFour: require("./assets/images/badge4.png"),
      },
    },
    verify: {
      email: "",
      message: "",
    },
    resetPassword: {
      email: "",
      message: "",
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
      comments: [],
    },
    comment: {
      username: "",
      text: "",
      dateCreated: "",
      likes: [],
      comments: [],
    },
    like: {
      username: "",
    },
    game: {
      title: "",
      icon: "",
    },
    searchTerm: "",
    searchIcon: require("./assets/images/searchIcon.png"),
  }),
  methods: {
    search: function () {
      if (this.searchTerm) {
        console.log("searching for: " + this.searchTerm);
        this.searchTerm = "";
      }
    },
    scrollToTop: function () {
      window.scrollTo(0, 0);
    },
    setUserData: function (accessToken, username) {
      this.user.loggedIn = true;
      this.user.accessToken = accessToken;
      this.user.username = username;
    },
    setVerifyData: function (verifyData) {
      this.verify.email = verifyData.email;
      this.verify.message = verifyData.message;
    },
    clearVerifyData: function () {
      this.verify.email = "";
      this.verify.message = "";
    },
    setResetPasswordData: function (resetPasswordData) {
      this.resetPassword.email = resetPasswordData.email;
      this.resetPassword.message = resetPasswordData.message;
    },
    clearResetPasswordData: function () {
      this.resetPassword.email = "";
      this.resetPassword.message = "";
    },
    silentRefresh: function () {
      this.serverSilentRefresh().then((response) => {
        if (response.status === 200 && response.data.message != false) {
          this.setUserData(response.data.accessToken, response.data.username);
        } else {
          this.logout();
        }
      });
    },
    serverSilentRefresh: function () {
      return axios
        .get(this.serverUrl + "/refreshToken", {
          withCredentials: true,
        })
        .then(function (response) {
          return response;
        })
        .catch((error) => {
          return error.response;
        });
    },
    logout: function () {
      this.serverLogout().then((response) => {
        this.clearUserData();
      });
    },
    serverLogout: function () {
      return axios
        .post(
          this.serverUrl + "/logout",
          {},
          {
            withCredentials: true,
          }
        )
        .then(function (response) {
          return response;
        })
        .catch((error) => {
          return error.response;
        });
    },
    clearUserData: function () {
      this.user.loggedIn = false;
      this.user.accessToken = "";
      this.user.username = "";
      this.user.userIcon = "";
      this.usersFollowing = [];
      this.gamesFollowing = [];
      this.searchTerm = "";
    },
  },
  mounted: function () {
    this.silentRefresh();
    setInterval(this.silentRefresh, appConfig.REFRESH_INTERVAL);
  },
};
</script>

<style scoped src='./assets/styles/app.css'></style>