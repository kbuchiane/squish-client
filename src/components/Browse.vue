<template>
  <v-container>
    <div class="filter">
      <div class="filterTitle">Filter Clips By</div>
      <div class="filterOptionsSetOne">
        <div
          v-if="filterBy.mostPopular"
          @click="mostPopularClick()"
          class="selectedFilterOptionOne"
        >
          Most Popular
        </div>
        <div v-else @click="mostPopularClick()" class="filterOptionOne">
          Most Popular
        </div>
        <div
          v-if="filterBy.followedUsersOnly"
          @click="followedUsersOnlyClick()"
          class="selectedFilterOptionOne"
        >
          Followed Users Only
        </div>
        <div v-else @click="followedUsersOnlyClick()" class="filterOptionOne">
          Followed Users Only
        </div>
        <div
          v-if="filterBy.mostImpressive"
          @click="mostImpressiveClick()"
          class="selectedFilterOptionOne"
        >
          Most Impressive
        </div>
        <div v-else @click="mostImpressiveClick()" class="filterOptionOne">
          Most Impressive
        </div>
        <div
          v-if="filterBy.funniest"
          @click="funniestClick()"
          class="selectedFilterOptionOne"
        >
          Funniest
        </div>
        <div v-else @click="funniestClick()" class="filterOptionOne">
          Funniest
        </div>
        <div
          v-if="filterBy.bestDiscussion"
          @click="bestDiscussionClick()"
          class="selectedFilterOptionOne"
        >
          Best Discussion
        </div>
        <div v-else @click="bestDiscussionClick()" class="filterOptionOne">
          Best Discussion
        </div>
      </div>
      <div class="filterTitle">Timeframe</div>
      <div class="filterOptionsSetTwo">
        <div
          v-if="filterBy.default"
          @click="defaultClick()"
          class="selectedFilterOptionTwo"
        >
          Default
        </div>
        <div v-else @click="defaultClick()" class="filterOptionTwo">
          Default
        </div>
        <div
          v-if="filterBy.pastDay"
          @click="pastDayClick()"
          class="selectedFilterOptionTwo"
        >
          Past Day
        </div>
        <div v-else @click="pastDayClick()" class="filterOptionTwo">
          Past Day
        </div>
        <div
          v-if="filterBy.pastWeek"
          @click="pastWeekClick()"
          class="selectedFilterOptionTwo"
        >
          Past Week
        </div>
        <div v-else @click="pastWeekClick()" class="filterOptionTwo">
          Past Week
        </div>
        <div
          v-if="filterBy.pastMonth"
          @click="pastMonthClick()"
          class="selectedFilterOptionTwo"
        >
          Past Month
        </div>
        <div v-else @click="pastMonthClick()" class="filterOptionTwo">
          Past Month
        </div>
        <div
          v-if="filterBy.pastYear"
          @click="pastYearClick()"
          class="selectedFilterOptionTwo"
        >
          Past Year
        </div>
        <div v-else @click="pastYearClick()" class="filterOptionTwo">
          Past Year
        </div>
        <div
          v-if="filterBy.allTime"
          @click="allTimeClick()"
          class="selectedFilterOptionTwo"
        >
          All Time
        </div>
        <div v-else @click="allTimeClick()" class="filterOptionTwo">
          All Time
        </div>
      </div>
    </div>
    <v-row justify="center" class="text-center">
      <v-col class="mb-5 clipColumn" cols="6">
        <div v-for="clip in clips" :key="clip.id">
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
    followedUsername: "Freddy",
    followerUsername: "Andy",
    followedGame: "Frogger",
    statusMessage: "",
    clips: [
      {
        id: "1",
        type: "video/mp4",
        src: require("../assets/videos/snipe1.mp4"),
        poster: require("../assets/images/snipe1poster.png"),
        title: "Later, GrndpaGaming",
        datePosted: "Dec 22, 2020",
        userProfile: {
          username: "JackiePrince",
          joinedDate: "Dec 24, 2020",
          image: require("../assets/images/crown.png"),
          followed: true,
          followerCount: "346M",
          clipsCount: "54",
          badges: {
            badgeOne: require("../assets/images/badge1.png"),
            badgeTwo: require("../assets/images/badge2.png"),
            badgeThree: require("../assets/images/badge3.png"),
            badgeFour: require("../assets/images/badge4.png"),
          },
        },
        game: {
          id: "1",
          title: "PLAYERUNKNOWN's BATTLEGROUNDS",
          icon: require("../assets/images/pubg.png"),
          releaseDate: "Dec 2017",
          followed: true,
          followerCount: "84k",
          clipsTodayCount: "32k",
          clipsAllTimeCount: "456k",
          tags: ["Battle Royale", "Shooter"],
        },
        liked: true,
        userImage: require("../assets/images/crown.png"),
        badgeOne: require("../assets/images/badge1.png"),
        badgeTwo: require("../assets/images/badge2.png"),
        badgeThree: require("../assets/images/badge3.png"),
        badgeFour: require("../assets/images/badge4.png"),
        impressiveLiked: true,
        impressiveCount: "70.9k",
        funnyLiked: false,
        funnyCount: "12.4k",
        discussionLiked: true,
        discussionCount: "30.6k",
        viewCount: "8.64M",
        likeCount: "1.21M",
        commentCount: "7",
        comments: [
          {
            commentId: "1",
            username: "JackiePrince",
            text: "Wow, this is the best clip I've ever seen!",
            date: "Dec 25, 2020",
            liked: true,
            likes: "203k",
            comments: [
              {
                commentId: "2",
                username: "Jon",
                text: "You're a scrub.",
                date: "Dec 25, 2020",
                liked: false,
                likes: "0",
                comments: [
                  {
                    commentId: "3",
                    username: "JackiePrince",
                    text: "No u.",
                    date: "Dec 25, 2020",
                    liked: true,
                    likes: "5.2M",
                    comments: [],
                  },
                  {
                    commentId: "4",
                    username: "shroud",
                    text:
                      "Harsh. Jackie would beat me in a 1v1 99 times out of 100.",
                    date: "Dec 25, 2020",
                    liked: true,
                    likes: "103.5k",
                    comments: [],
                  },
                ],
              },
              {
                commentId: "5",
                username: "Jack",
                text: "Lame. Play Astrofire.",
                date: "Dec 25, 2020",
                liked: false,
                likes: "1",
                comments: [],
              },
            ],
          },
          {
            commentId: "6",
            username: "chocoTaco",
            text: "OMG",
            date: "Dec 26, 2020",
            liked: true,
            likes: "17k",
            comments: [],
          },
          {
            commentId: "7",
            username: "GrndpaGaming",
            text: "Reported.",
            date: "Dec 27, 2020",
            liked: false,
            likes: "0",
            comments: [],
          },
        ],
      },
      {
        id: "2",
        type: "video/mp4",
        src: require("../assets/videos/snipe2.mp4"),
        poster: require("../assets/images/snipe2poster.png"),
        title: "Destroying A Bot",
        datePosted: "Dec 20, 2020",
        userProfile: {
          username: "JackiePrince",
          joinedDate: "Dec 24, 2020",
          image: require("../assets/images/crown.png"),
          followed: false,
          followerCount: "346M",
          clipsCount: "54",
          badges: {
            badgeOne: require("../assets/images/badge1.png"),
            badgeTwo: require("../assets/images/badge2.png"),
            badgeThree: require("../assets/images/badge3.png"),
            badgeFour: require("../assets/images/badge4.png"),
          },
        },
        game: {
          id: "1",
          title: "PLAYERUNKNOWN's BATTLEGROUNDS",
          icon: require("../assets/images/pubg.png"),
          releaseDate: "Dec 2017",
          followed: false,
          followerCount: "84k",
          clipsTodayCount: "32k",
          clipsAllTimeCount: "456k",
          tags: ["Battle Royale", "Shooter"],
        },
        liked: false,
        userImage: require("../assets/images/crown.png"),
        badgeOne: require("../assets/images/badge1.png"),
        badgeTwo: require("../assets/images/badge2.png"),
        badgeThree: require("../assets/images/badge3.png"),
        badgeFour: require("../assets/images/badge4.png"),
        impressiveLiked: false,
        impressiveCount: "10.8k",
        funnyLiked: true,
        funnyCount: "5005",
        discussionLiked: false,
        discussionCount: "36.3k",
        viewCount: "903.23k",
        likeCount: "133.7k",
        commentCount: "98.9k",
        comments: [],
      },
    ],
    filterBy: {
      mostPopular: true,
      followedUsersOnly: false,
      mostImpressive: false,
      funniest: false,
      bestDiscussion: false,
      default: true,
      pastDay: false,
      pastWeek: false,
      pastMonth: false,
      pastYear: false,
      allTime: false,
    },
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
    clearFilterByType: function () {
      this.filterBy.mostPopular = false;
      this.filterBy.followedUsersOnly = false;
      this.filterBy.mostImpressive = false;
      this.filterBy.funniest = false;
      this.filterBy.bestDiscussion = false;
    },
    mostPopularClick: function () {
      if (!this.filterBy.mostPopular) {
        this.clearFilterByType();
        this.filterBy.mostPopular = true;
      }
    },
    followedUsersOnlyClick: function () {
      if (!this.filterBy.followedUsersOnly) {
        this.clearFilterByType();
        this.filterBy.followedUsersOnly = true;
      }
    },
    mostImpressiveClick: function () {
      if (!this.filterBy.mostImpressive) {
        this.clearFilterByType();
        this.filterBy.mostImpressive = true;
      }
    },
    funniestClick: function () {
      if (!this.filterBy.funniest) {
        this.clearFilterByType();
        this.filterBy.funniest = true;
      }
    },
    bestDiscussionClick: function () {
      if (!this.filterBy.bestDiscussion) {
        this.clearFilterByType();
        this.filterBy.bestDiscussion = true;
      }
    },
    clearFilterByTimeframe: function () {
      this.filterBy.default = false;
      this.filterBy.pastDay = false;
      this.filterBy.pastWeek = false;
      this.filterBy.pastMonth = false;
      this.filterBy.pastYear = false;
      this.filterBy.allTime = false;
    },
    defaultClick: function () {
      if (!this.filterBy.default) {
        this.clearFilterByTimeframe();
        this.filterBy.default = true;
      }
    },
    pastDayClick: function () {
      if (!this.filterBy.pastDay) {
        this.clearFilterByTimeframe();
        this.filterBy.pastDay = true;
      }
    },
    pastWeekClick: function () {
      if (!this.filterBy.pastWeek) {
        this.clearFilterByTimeframe();
        this.filterBy.pastWeek = true;
      }
    },
    pastMonthClick: function () {
      if (!this.filterBy.pastMonth) {
        this.clearFilterByTimeframe();
        this.filterBy.pastMonth = true;
      }
    },
    pastYearClick: function () {
      if (!this.filterBy.pastYear) {
        this.clearFilterByTimeframe();
        this.filterBy.pastYear = true;
      }
    },
    allTimeClick: function () {
      if (!this.filterBy.allTime) {
        this.clearFilterByTimeframe();
        this.filterBy.allTime = true;
      }
    },
  },
  mounted: function () {
    // this.$refs.usernameInput.focus();
  },
};
</script>

<style scoped src='../assets/styles/browse.css'></style>