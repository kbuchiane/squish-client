<template>
  <v-container>
    <div class="filter">
      <div class="filterTitle">Filter Games By</div>
      <div class="filterOptionsSetOne">
        <div
          v-if="filterBy.mostFollowed"
          @click="mostFollowedClick()"
          class="selectedFilterOption"
        >
          Most Followed
        </div>
        <div v-else @click="mostFollowedClick()" class="filterOption">
          Most Followed
        </div>
        <div
          v-if="filterBy.mostClipsToday"
          @click="mostClipsTodayClick()"
          class="selectedFilterOption"
        >
          Most Clips Today
        </div>
        <div v-else @click="mostClipsTodayClick()" class="filterOption">
          Most Clips Today
        </div>
        <div
          v-if="filterBy.mostClipsAllTime"
          @click="mostClipsAllTimeClick()"
          class="selectedFilterOption"
        >
          Most Clips All Time
        </div>
        <div v-else @click="mostClipsAllTimeClick()" class="filterOption">
          Most Clips All Time
        </div>
      </div>
    </div>
    <v-row justify="center" class="text-center">
      <v-col class="mb-5 gameColumn" cols="6">
        <div v-for="game in games" :key="game.Game.GameId">
          <div class="gameDiv">
            <div class="gameTitle">
              <p class="gameTitleText">
                <router-link
                  :to="{ name: 'SingleGame', params: { gameId: game.Game.GameId } }"
                  class="routerStyle"
                >
                  {{ game.Game.Title }}
                </router-link>
              </p>
            </div>
            <div class="gameReleaseDate">
              Release Date {{ game.Game.DisplayDate }}
            </div>
            <div class="gameHeader">
              <div class="gameImageDiv">
                <router-link
                  :to="{ name: 'SingleGame', params: { gameId: game.Game.GameId } }"
                >
                  <img
                    class="gameImage"
                    contain
                    :src="require(`../assets/images/${game.Game.IconFilepath}`)"
                  />
                </router-link>
              </div>
              <div class="gameTags">
                <p v-for="tag in game.Game.Tags" :key="tag" class="gameTag">
                  {{ tag }}
                </p>
              </div>
              <div class="gameUserActions">
                <v-btn
                  v-if="game.Game.Followed"
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
            <div class="gameInfoDiv">
              <div class="gameInfoSection">
                {{ game.Game.FollowerCount }} followers
              </div>
              <div class="gameInfoSection">
                {{ game.Game.ClipsTodayCount }} new clips today
              </div>
              <div class="gameInfoSection">
                {{ game.Game.ClipsAllTimeCount }} clips all time
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import appConfig from "../config/app.config";

export default {
  name: "BrowseGames",
  data: () => ({
    serverUrl: appConfig.SERVER_URL,
    loggedInUser: "",
    games: [],
    filterBy: {
      mostFollowed: true,
      mostClipsToday: false,
      mostClipsAllTime: false,
    },
  }),
  props: ["user"],
  methods: {
    clearFilter: function () {
      this.filterBy.mostFollowed = false;
      this.filterBy.mostClipsToday = false;
      this.filterBy.mostClipsAllTime = false;
    },
    mostFollowedClick: function () {
      if (!this.filterBy.mostFollowed) {
        this.clearFilter();
        this.filterBy.mostFollowed = true;
      }
    },
    mostClipsTodayClick: function () {
      if (!this.filterBy.mostClipsToday) {
        this.clearFilter();
        this.filterBy.mostClipsToday = true;
      }
    },
    mostClipsAllTimeClick: function () {
      if (!this.filterBy.mostClipsAllTime) {
        this.clearFilter();
        this.filterBy.mostClipsAllTime = true;
      }
    },
    userLoggedInCheck: function () {
      if (this.loggedInUser) {
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
            self.$router.push("Login");
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
        url: vm.serverUrl + "/browseGames/browseGames",
        headers: {
          authorization: "Bearer " + vm.user.accessToken,
        },
        params: {
          username: vm.user.username,
        },
      }).then(function (response) {
        vm.games = response.data;
      });
    },
  },
  beforeMount: function () {
    this.getPageContents();
  },
};
</script>

<style scoped src='../assets/styles/browseGames.css'></style>