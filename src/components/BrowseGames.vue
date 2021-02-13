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
        <div v-for="game in games" :key="game.id">
          <div class="gameDiv">
            <div class="gameTitle">
              <p class="gameTitleText">
                <router-link
                  :to="{ name: 'SingleGame', params: { selectedGame: game } }"
                  class="routerStyle"
                >
                  {{ game.title }}
                </router-link>
              </p>
            </div>
            <div class="gameReleaseDate">
              Release Date {{ game.releaseDate }}
            </div>
            <div class="gameHeader">
              <div class="gameImageDiv">
                <router-link
                  :to="{ name: 'SingleGame', params: { selectedGame: game } }"
                >
                  <img class="gameImage" contain :src="game.icon" />
                </router-link>
              </div>
              <div class="gameTags">
                <p v-for="tag in game.tags" :key="tag" class="gameTag">
                  {{ tag }}
                </p>
              </div>
              <div class="gameUserActions">
                <v-btn
                  v-if="game.followed"
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
                {{ game.followerCount }} followers
              </div>
              <div class="gameInfoSection">
                {{ game.clipsTodayCount }} new clips today
              </div>
              <div class="gameInfoSection">
                {{ game.clipsAllTimeCount }} clips all time
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
    games: [
      {
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
      {
        id: "2",
        title: "Astrofire",
        icon: require("../assets/images/astrofire.png"),
        releaseDate: "1994",
        followed: false,
        followerCount: "23",
        clipsTodayCount: "1",
        clipsAllTimeCount: "14",
        tags: ["Classic", "Ancient"],
      },
    ],
    filterBy: {
      mostFollowed: true,
      mostClipsToday: false,
      mostClipsAllTime: false,
    },
  }),
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
  },
};
</script>

<style scoped src='../assets/styles/browseGames.css'></style>