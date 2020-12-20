<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5 logSignColumn" cols="12">
        <h2 class="headline font-weight-bold mb-3 noselect">Test Button</h2>
        <p></p>
        <v-row justify="center">
          <v-btn
            @click="followUser(followerUsername, followedUsername)"
            color="green"
            class="logsignButton"
            >Test
          </v-btn>
        </v-row>
        <p></p>
        <v-row justify="center">
          <v-btn
            @click="followGame(followerUsername, followedGame)"
            color="green"
            class="logsignButton"
            >Follow Game
          </v-btn>
        </v-row>
        <p></p>
        <p></p>
        <v-row justify="center">
          <p class="browseMessage noselect">{{ statusMessage }}</p>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import appConfig from "../config/app.config";

export default {
  name: "Browse",
  data: () => ({
    serverUrl: appConfig.SERVER_URL,
    // followerUsername: "jon",
    followedUsername: "jackie",
    followerUsername: "jack",
    followedGame: "frogger",
    statusMessage: ""
  }),
  props: ["user"],
  methods: {
    followUser: function (followerUsername, followedUsername) {
      followerUsername = followerUsername.trim();
      followedUsername = followedUsername.trim();

      return axios({
        method: "post",
        url: this.serverUrl + "/followUser",
        headers: {
          authorization: "Bearer " + this.user.accessToken,
        },
        data: {
          followerUsername: followerUsername,
          followedUsername: followedUsername,
        },
      }).then(function (response) {
        this.statusMessage = response.data.message;
        return response;
      });
    },

    followGame: function (followerUsername, followedGame) {
      followerUsername = followerUsername.trim();
      followedGame = followedGame.trim();

      return axios({
        method: "post",
        url: this.serverUrl + "/followGame",
        headers: {
          authorization: "Bearer " + this.user.accessToken,
        },
        data: {
          followerUsername: followerUsername,
          followedGame: followedGame,
        },
      })
        .then(function (response) {
          this.statusMessage = response.data.message;
          return response;      
        });
    },
  },

  clearEntries: function () {
    this.followedUsername = "";
    this.followedGame = "";
    this.statusMessage = "";
  },

  mounted: function () {
    // this.$refs.usernameInput.focus();
  },
};
</script>

<style scoped src='../assets/styles/browse.css'></style>