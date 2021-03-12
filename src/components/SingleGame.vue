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
    clearFilters: function () {
      this.filters.MostPopular = false;
      this.filters.FollowedUsersOnly = false;
      this.filters.MostImpressive = false;
      this.filters.Funniest = false;
      this.filters.BestDiscussion = false;
    },
    clearTimeframes: function () {
      this.timeframes.Day = false;
      this.timeframes.Week = false;
      this.timeframes.Month = false;
      this.timeframes.Year = false;
      this.timeframes.All = false;
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
      let filter = this.getFilter();
      let timeframe = this.getTimeframe();

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
          filter: filter,
          timeframe: timeframe,
        },
      }).then(function (response) {
        let result = response.data;
        vm.clipsForGame = result;
        vm.game = result[0].Game;
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

<style scoped src='../assets/styles/singleGame.css'></style>