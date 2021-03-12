<template>
  <v-container>
    <div class="filter">
      <div class="filterTitle">Filter Clips By</div>
      <div class="filterOptionsSetOne">
        <div
          v-if="filters.MostPopular"
          @click="mostPopularClick()"
          class="selectedFilterOptionOne"
        >
          Most Popular
        </div>
        <div v-else @click="mostPopularClick()" class="filterOptionOne">
          Most Popular
        </div>
        <div
          v-if="filters.FollowedUsersOnly"
          @click="followedUsersOnlyClick()"
          class="selectedFilterOptionOne"
        >
          Followed Users Only
        </div>
        <div v-else @click="followedUsersOnlyClick()" class="filterOptionOne">
          Followed Users Only
        </div>
        <div
          v-if="filters.MostImpressive"
          @click="mostImpressiveClick()"
          class="selectedFilterOptionOne"
        >
          Most Impressive
        </div>
        <div v-else @click="mostImpressiveClick()" class="filterOptionOne">
          Most Impressive
        </div>
        <div
          v-if="filters.Funniest"
          @click="funniestClick()"
          class="selectedFilterOptionOne"
        >
          Funniest
        </div>
        <div v-else @click="funniestClick()" class="filterOptionOne">
          Funniest
        </div>
        <div
          v-if="filters.BestDiscussion"
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
          v-if="timeframes.Day"
          @click="pastDayClick()"
          class="selectedFilterOptionTwo"
        >
          Past Day
        </div>
        <div v-else @click="pastDayClick()" class="filterOptionTwo">
          Past Day
        </div>
        <div
          v-if="timeframes.Week"
          @click="pastWeekClick()"
          class="selectedFilterOptionTwo"
        >
          Past Week
        </div>
        <div v-else @click="pastWeekClick()" class="filterOptionTwo">
          Past Week
        </div>
        <div
          v-if="timeframes.Month"
          @click="pastMonthClick()"
          class="selectedFilterOptionTwo"
        >
          Past Month
        </div>
        <div v-else @click="pastMonthClick()" class="filterOptionTwo">
          Past Month
        </div>
        <div
          v-if="timeframes.Year"
          @click="pastYearClick()"
          class="selectedFilterOptionTwo"
        >
          Past Year
        </div>
        <div v-else @click="pastYearClick()" class="filterOptionTwo">
          Past Year
        </div>
        <div
          v-if="timeframes.All"
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
    filters: {
      MostPopular: true,
      FollowedUsersOnly: false,
      MostImpressive: false,
      Funniest: false,
      BestDiscussion: false,
    },
    timeframes: {
      Day: false,
      Week: false,
      Month: false,
      Year: false,
      All: true,
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
    clearFilters: function () {
      this.filters.MostPopular = false;
      this.filters.FollowedUsersOnly = false;
      this.filters.MostImpressive = false;
      this.filters.Funniest = false;
      this.filters.BestDiscussion = false;
    },
    mostPopularClick: function () {
      if (!this.filters.MostPopular) {
        this.clearFilters();
        this.filters.MostPopular = true;
        this.getPageContents();
      }
    },
    followedUsersOnlyClick: function () {
      if (!this.filters.FollowedUsersOnly) {
        this.clearFilters();
        this.filters.FollowedUsersOnly = true;
        this.getPageContents();
      }
    },
    mostImpressiveClick: function () {
      if (!this.filters.MostImpressive) {
        this.clearFilters();
        this.filters.MostImpressive = true;
        this.getPageContents();
      }
    },
    funniestClick: function () {
      if (!this.filters.Funniest) {
        this.clearFilters();
        this.filters.Funniest = true;
        this.getPageContents();
      }
    },
    bestDiscussionClick: function () {
      if (!this.filters.BestDiscussion) {
        this.clearFilters();
        this.filters.BestDiscussion = true;
        this.getPageContents();
      }
    },
    clearTimeframes: function () {
      this.timeframes.Day = false;
      this.timeframes.Week = false;
      this.timeframes.Month = false;
      this.timeframes.Year = false;
      this.timeframes.All = false;
    },
    pastDayClick: function () {
      if (!this.filters.Day) {
        this.clearTimeframes();
        this.timeframes.Day = true;
        this.getPageContents();
      }
    },
    pastWeekClick: function () {
      if (!this.filters.Week) {
        this.clearTimeframes();
        this.timeframes.Week = true;
        this.getPageContents();
      }
    },
    pastMonthClick: function () {
      if (!this.filters.Month) {
        this.clearTimeframes();
        this.timeframes.Month = true;
        this.getPageContents();
      }
    },
    pastYearClick: function () {
      if (!this.filters.Year) {
        this.clearTimeframes();
        this.timeframes.Year = true;
        this.getPageContents();
      }
    },
    allTimeClick: function () {
      if (!this.filters.All) {
        this.clearTimeframes();
        this.timeframes.All = true;
        this.getPageContents();
      }
    },
    getPageContents: function () {
      var vm = this;
      let filter = this.getFilter();
      let timeframe = this.getTimeframe();

      return axios({
        method: "get",
        responseType: "json",
        url: vm.serverUrl + "/browse/browse",
        headers: {
          authorization: "Bearer " + vm.user.accessToken,
        },
        params: {
          username: vm.user.username,
          filter: filter,
          timeframe: timeframe,
        },
      }).then(function (response) {
        vm.clips = response.data;
      });
    },
    getFilter: function () {
      let filter = "MostPopular";

      if (this.filters.FollowedUsersOnly) {
        filter = "FollowedUsersOnly";
      } else if (this.filters.MostImpressive) {
        filter = "MostImpressive";
      } else if (this.filters.Funniest) {
        filter = "Funniest";
      } else if (this.filters.BestDiscussion) {
        filter = "BestDiscussion";
      }

      return filter;
    },
    getTimeframe: function () {
      let timeframe = "All";

      if (this.timeframes.Day) {
        timeframe = "Day";
      } else if (this.timeframes.Week) {
        timeframe = "Week";
      } else if (this.timeframes.Month) {
        timeframe = "Month";
      } else if (this.timeframes.Year) {
        timeframe = "Year";
      }

      return timeframe;
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