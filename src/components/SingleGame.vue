<template>
  <v-container>
    <div v-if="!selectedGame" class="notFoundDiv">
      <p class="notFoundText">The game could not be found.</p>
      <v-btn @click="$router.push('/browse')" color="#40a0e0" class="backButton"
        >Back To Browse</v-btn
      >
    </div>
    <div v-else>
      <div class="filter">
        <div class="filterTitle">Filter Clips By</div>
        <div class="filterOptionsSetOne">
          <div class="selectedFilterOption">Most Popular</div>
          <div class="filterOption">Followed Users Only</div>
          <div class="filterOption">Most Impressive</div>
          <div class="filterOption">Funniest</div>
          <div class="filterOption">Best Discussion</div>
        </div>
        <div class="filterTitle">Timeframe</div>
        <div class="filterOptionsSetTwo">
          <div class="selectedFilterOptionSetTwo">Default</div>
          <div class="filterOptionSetTwo">Past Day</div>
          <div class="filterOptionSetTwo">Past Week</div>
          <div class="filterOptionSetTwo">Past Month</div>
          <div class="filterOptionSetTwo">Past Year</div>
          <div class="filterOptionSetTwo">All Time</div>
        </div>
      </div>
      <v-row justify="center" class="text-center">
        <v-col class="mb-5 gameColumn" cols="6">
          <div class="gameDiv">
            <div class="gameTitle">
              <p class="gameTitleText">
                <router-link to="/game" class="routerStyle">
                  {{ selectedGame.Title }}
                </router-link>
              </p>
            </div>
            <div class="gameReleaseDate">
              Release Date {{ selectedGame.ReleaseDate }}
            </div>
            <div class="gameHeader">
              <div class="gameImageDiv">
                <router-link to="/game">
                  <img
                    class="require(`../assets/images/${selectedGame.IconFilepath}`)"
                  />
                </router-link>
              </div>
              <div class="gameTags">
                <p v-for="tag in selectedGame.Tags" :key="tag" class="gameTag">
                  {{ tag }}
                </p>
              </div>
              <div class="gameUserActions">
                <v-btn
                  v-if="selectedGame.Followed"
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
                {{ selectedGame.FollowerCount }} followers
              </div>
              <div class="gameInfoSection">
                {{ selectedGame.ClipsTodayCount }} new clips today
              </div>
              <div class="gameInfoSection">
                {{ selectedGame.ClipsAllTimeCount }} clips all time
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" class="text-center">
        <v-col class="mb-5" cols="6">
          <div class="clipsFromDiv">
            <div class="clipsSingleGame">
              <p class="clipsSingleGameText">
                {{ clipsForGame.length }} Clips from {{ selectedGame.Title }}
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" class="text-center">
        <v-col class="mb-5" cols="6">
          <div v-for="clip in clipsForGame" :key="clip.clipId">
            <ClipPlayer :clip="clip" />
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
  props: ["user", "selectedGame"],
  data: () => ({
    serverUrl: appConfig.SERVER_URL,
    clipsForGame: [],
    //  clips: [],
  }),

  methods: {
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
          gameId: vm.selectedGame.GameId,
        },
      }).then(function (response) {
        let result = response.data;

        // TODO may want to do a similar thing for Profile
        for (let i in result) {
          result[i].Game = vm.selectedGame;
        }
        vm.clipsForGame = result;
      });
    },
  },

  /*
  mounted: function () {
    // Like many other things, this will be removed when we actually pull data
    for (let i in this.clips) {
      this.clips[i].game = this.selectedGame;
    }
  },
  */

  beforeCreate: function () {
    //  console.log("--  BEFORE created ");
    // Data, Props and 'this' not yet available
  },
  created: function () {
    // console.log("-- created ");
  },
  beforeMount: function () {
    // console.log("-- BEFORE mounted ");
    // console.log("User: " + this.user.username);
    // console.log("---    Title:" + this.selectedGame.Title);
    // console.log("--- clips   length:" + this.clips.length);

    this.getPageContents();
  },
  mounted: function () {
    //  console.log("-- mounted ");
    // this.getPageContents();
    // console.log("---    Title:" + this.selectedGame.Title);
  },
};
</script>

<style scoped src='../assets/styles/singleGame.css'></style>