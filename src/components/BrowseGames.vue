<template>
  <v-container>
    <div class="filter">
      <div class="filterTitle">Filter Games By</div>
      <div class="filterOptionsSetOne">
        <div class="selectedFilterOption">Most Followed</div>
        <div class="filterOption">Most Clips Today</div>
        <div class="filterOption">Specific Tags</div>
      </div>
    </div>
    <v-row justify="center" class="text-center">
      <v-col class="mb-5 gameColumn" cols="6">
        <div v-for="game in games" :key="game.GameId">
          <div class="gameDiv">
            <div class="gameTitle">
              <p class="gameTitleText">
                <router-link
                  :to="{ name: 'SingleGame', params: { selectedGame: game } }"
                  class="routerStyle"
                >
                  {{ game.Title }}
                </router-link>
              </p>
            </div>
            <div class="gameReleaseDate">
              Release Date {{ game.ReleaseDate }}
            </div>
            <div class="gameHeader">
              <div class="gameImageDiv">
                <router-link
                  :to="{ name: 'SingleGame', params: { selectedGame: game } }"
                >
                  <img
                    class="gameImage"
                    contain
                    :src="require(`../assets/images/${game.IconFilepath}`)"
                  />
                </router-link>
              </div>
              <div class="gameTags">
                <p v-for="tag in game.Tags" :key="tag" class="gameTag">
                  {{ tag }}
                </p>
              </div>
              <div class="gameUserActions">
                <v-btn
                  v-if="game.Followed"
                  color="#40a0e0"
                  class="userActionButton"
                  >Unfollow</v-btn
                >
                <v-btn v-else color="#40a0e0" class="userActionButton"
                  >Follow</v-btn
                >
              </div>
            </div>
            <div class="gameInfoDiv">
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
    games: [],
  }),
  props: ["user"],
  methods: {
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
// console.log("BrowseGames    User: " + this.user.username);

    this.getPageContents();
  },
};
</script>

<style scoped src='../assets/styles/browseGames.css'></style>