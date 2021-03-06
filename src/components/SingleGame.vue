<template>
  <v-container>
    <div v-if="!gameId" class="notFoundDiv">
      <p class="notFoundText">The game could not be found.</p>
      <v-btn @click="$router.push('/browse')" color="#40a0e0" class="backButton"
        >Back To Browse</v-btn
      >
    </div>
    <div v-else>
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
        <v-col class="mb-5 gameColumn" cols="6">
          <div class="gameDiv">
            <div v-if="game" class="gameTitle">
              <p class="gameTitleText">
                <router-link to="/game" class="routerStyle">
                  {{ game.Title }}
                </router-link>
              </p>
            </div>
            <div v-if="game" class="gameReleaseDate">
              Release Date {{ game.DisplayDate }}
            </div>
            <div v-if="game" class="gameHeader">
              <div class="gameImageDiv">
                <router-link to="/game">
                  <img
                    class="gameImage"
                    :src="require(`../assets/images/${game.IconFilepath}`)"
                  />
                </router-link>
              </div>
              <div v-if="game" class="gameTags">
                <p v-for="tag in game.Tags" :key="tag" class="gameTag">
                  {{ tag }}
                </p>
              </div>
              <div v-if="game" class="gameUserActions">
                <v-btn
                  v-if="game.Followed"
                  @click="userLoggedInCheck()"
                  color="#40a0e0"
                  class="userActionButton"
                  >Unfollow</v-btn
                >
                <v-btn
                  v-else
                  @click="userLoggedInCheck()"
                  color="#40a0e0"
                  class="userActionButton"
                  >Follow</v-btn
                >
              </div>
            </div>
            <div v-if="game" class="gameInfoDiv">
              <div class="gameInfoSection">
                {{ game.FollowerCount }} followers
              </div>
              <div class="gameInfoSection">
                {{ game.ClipsTodayCount }} new clips today
              </div>
              <div class="gameInfoSection">
                {{ game.ClipsAllTimeCount }} clips all time
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" class="text-center">
        <v-col class="mb-5" cols="6">
          <div class="clipsFromDiv">
            <div v-if="game" class="clipsSingleGame">
              <p class="clipsSingleGameText">Clips from {{ game.Title }}</p>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" class="text-center">
        <v-col class="mb-5" cols="6">
          <div v-for="clip in clipsForGame" :key="clip.clipId">
            <ClipPlayer :clip="clip" :userData="userData" />
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import ClipPlayer from "./ClipPlayer";
import axios from "axios";
import appConfig from "../config/app.config";

export default {
  name: "BrowseGames",
  components: {
    ClipPlayer,
  },
  props: ["user", "gameId"],
  data: () => ({
    serverUrl: appConfig.SERVER_URL,
    userData: undefined,
    clipsForGame: [],
    game: "",
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
    userLoggedInCheck: function () {
      if (this.user.loggedIn) {
        return true;
      } else {
        let self = this;
        let message = "You must be logged in to perform this action.";
        let options = {
          html: false,
          loader: false,
          reverse: false,
          okText: "Log In",
          cancelText: "OK",
          animation: "zoom",
          type: "basic",
          verification: "continue",
          clicksCount: 1,
          backdropClose: true,
          customClass: "",
        };

        this.$dialog
          .confirm(message, options)
          .then(function () {
            self.$router.push({ path: "/login" });
          })
          .catch(function () {
            // Placeholder
          });

        return false;
      }
    },
    getPageContents: function () {
      var vm = this;

      return axios({
        method: "get",
        responseType: "json",
        url: this.serverUrl + "/singleGame/singleGame",
        headers: {
          authorization: "Bearer " + vm.user.accessToken,
        },
        params: {
          username: vm.user.username,
          gameId: vm.gameId,
        },
      }).then(function (response) {
        let result = response.data;
        vm.clipsForGame = result;
        vm.game = result[0].Game;
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

<style scoped src='../assets/styles/singleGame.css'></style>