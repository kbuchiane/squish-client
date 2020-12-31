<template>
  <v-container>
    <div class="filter">
      <div class="filterTitle">Filter Games By</div>
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
      <v-col class="mb-5 gameColumn" cols="8">
        <div v-for="game in games" :key="game.id"></div>
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
        icon: require("../assets/images/pubg.png")
      },
      {
        id: "2",
        title: "PLAYERUNKNOWN's BATTLEGROUNDS",
        icon: require("../assets/images/pubg.png")
      },
    ],
  }),
};
</script>

<style scoped src='../assets/styles/browseGames.css'></style>