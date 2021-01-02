<template>
  <v-container>
    <div class="filter">
      <div class="filterTitle">Filter Clips By</div>
      <div class="filterOptionsSetOne">
        <div class="selectedFilterOption">Most Popular</div>
        <div class="filterOption">Followed Users Only</div>
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
      <v-col class="mb-5 profileColumn" cols="6">
        <div class="profileDiv">
          <div class="profileUsername">
            <p class="profileUsernameText">
              {{ userProfile.username }}
            </p>
          </div>
          <div class="userHeader">
            <div class="userImageDiv">
              <img class="userImage" contain :src="userProfile.image" />
            </div>
            <div class="profileUserActions">
              <v-btn color="#40a0e0" class="userActionButton">Gift</v-btn>
              <v-btn color="#40a0e0" class="userActionButton">Link Up</v-btn>
              <v-btn color="#40a0e0" class="userActionButton">Follow</v-btn>
            </div>
          </div>
          <div class="userInfoDiv">
            <div class="userInfoSection">
              {{ userProfile.followerCount }} followers
            </div>
            <div class="userInfoSection">
              {{ userProfile.clipsCount }} clips
            </div>
            <div class="userInfoSection">
              Joined {{ userProfile.joinedDate }}
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <!--
    <v-row justify="center" class="text-center">
      <v-col class="mb-5" cols="6">
        <div v-for="clip in clips" :key="clip.id">
          <ClipPlayer v-if="clip.username === userProfile.username" :clip="clip" />
        </div>
      </v-col>
    </v-row>
    -->
  </v-container>
</template>

<script>
import ClipPlayer from "./ClipPlayer";
import axios from "axios";
import appConfig from "../config/app.config";

export default {
  name: "Profile",
  components: {
    ClipPlayer,
  },
  props: ["userProfile", "clips"],
};
</script>

<style scoped src='../assets/styles/profile.css'></style>