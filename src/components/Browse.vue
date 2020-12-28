<template>
  <v-container>
    <div class="filter">
      <div class="filterTitle">Filter By</div>
      <div class="filterOptionsSetOne">
        <div class="selectedFilterOption">Most Popular</div>
        <div class="filterOption">Followed Only</div>
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
      <v-col class="mb-5 clipColumn" cols="8">
        <div v-for="clip in clips" :key="clip.src">
          <ClipPlayer :clip="clip"/>
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
    ClipPlayer
  },
  data: () => ({
    serverUrl: appConfig.SERVER_URL,
    // followerUsername: "jon",
    followedUsername: "jackie",
    followerUsername: "jack",
    followedGame: "frogger",
    statusMessage: "",
    clips: [
      {
        id: "1",
        type: "video/mp4",
        src: require("../assets/videos/snipe1.mp4"),
        poster: require("../assets/images/snipe1poster.png"),
        title: "Later, GrndpaGaming",
        datePosted: "Dec 22, 2020",
        username: "JackiePrince",
        game: "PLAYERUNKNOWN's BATTLEGROUNDS",
        userImage: require("../assets/images/crown.png"),
        badgeOne: require("../assets/images/badge1.png"),
        badgeTwo: require("../assets/images/badge2.png"),
        badgeThree: require("../assets/images/badge3.png"),
        badgeFour: require("../assets/images/badge4.png"),
        impressiveCount: "70.9k",
        funnyCount: "12.4k",
        discussionCount: "30.6k",
        viewCount: "8.64M",
        likeCount: "1.21M",
        commentCount: "755.1k"
      },
      {
        id: "2",
        type: "video/mp4",
        src: require("../assets/videos/snipe2.mp4"),
        poster: require("../assets/images/snipe2poster.png"),
        title: "Destroying A Bot",
        datePosted: "Dec 20, 2020",
        username: "JackiePrince",
        game: "PLAYERUNKNOWN's BATTLEGROUNDS",
        userImage: require("../assets/images/crown.png"),
        badgeOne: require("../assets/images/badge1.png"),
        badgeTwo: require("../assets/images/badge2.png"),
        badgeThree: require("../assets/images/badge3.png"),
        badgeFour: require("../assets/images/badge4.png"),
        impressiveCount: "10.8k",
        funnyCount: "5005",
        discussionCount: "36.3k",
        viewCount: "903.23k",
        likeCount: "133.7k",
        commentCount: "98.9k"
      }
    ]
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
  }
};
</script>

<style scoped src='../assets/styles/browse.css'></style>