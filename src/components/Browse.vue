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
        <div v-for="clip in clips" :key="clip.ClipId">
          <ClipPlayer :clip="clip" :userData="userData" />
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
  props: ["user"],
  data: () => ({
    serverUrl: appConfig.SERVER_URL,
    userData: undefined,
    statusMessage: "",
    clips: [],
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
    getPageContents: function () {
      var vm = this;

      // TODO update /browse/browse

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
    this.getPageContents();
  },
  mounted: function () {
    this.userData = this.user;
  },
};
</script>

<style scoped src='../assets/styles/browse.css'></style>