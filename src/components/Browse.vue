<template>
  <v-container>
    <div class="filter">
      <div class="filterTitle">Filter Clips By</div>
      <div class="filterOptionsSetOne">
        <div class="selectedFilterOption">Most Popular</div>
        <div class="filterOption">Followed Users Only</div>
        <div class="filterOption">Specific Games</div>
        <div class="filterOption">Most Impressive</div>
        <div class="filterOption">Funniest</div>
        <div class="filterOption">Best Discussion</div>
      </div>
      <div class="filterTitle">Timeframe</div>
      <div class="filterOptionsSetTwo">
        <div class="selectedFilterOption">Default</div>
        <div class="filterOption">Past Day</div>
        <div class="filterOption">Past Week</div>
        <div class="filterOption">Past Month</div>
        <div class="filterOption">Past Year</div>
        <div class="filterOption">All Time</div>
      </div>
    </div>
    <v-row justify="center" class="text-center">
      <v-col class="mb-5 clipColumn" cols="6">
        <div v-for="clip in clips" :key="clip.ClipId">
          <ClipPlayer :clip="clip" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ClipPlayer from "./ClipPlayer";
import axios from "axios";
import appConfig from "../config/app.config";

export default {
  name: "Browse",
  components: {
    ClipPlayer,
  },
  data: () => ({
    serverUrl: appConfig.SERVER_URL,
    statusMessage: "",
    clips: [],
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
      }).then(function (response) {
        this.statusMessage = response.data.message;
        return response;
      });
    },
    clearEntries: function () {
      this.followedUsername = "";
      this.followedGame = "";
      this.commenter = "";
      this.comment = "";
      this.statusMessage = "";
    },
    getPageContents: function () {
      var vm = this;

      return axios({
        method: "get",
        responseType: "json",
        url: vm.serverUrl + "/browse/browse",
        headers: {
          authorization: "Bearer " + vm.user.accessToken,
        },
        params: {
          username: vm.user.username,
          // FIXME implement filter and timeframe
          filter: "MostPopular",
          timeframe: "all",
        },
      }).then(function (response) {
        vm.clips = response.data;
      });
    },
  },
  beforeMount: function () {
//    console.log("Browse    User: " + this.user.username);
   this.getPageContents();
  },
};
</script>

<style scoped src='../assets/styles/browse.css'></style>