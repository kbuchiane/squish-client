<template>
  <v-container>
    <div v-if="!clip" class="notFoundDiv">
        <p class="notFoundText">The clip could not be found.</p>
        <v-btn
            @click="$router.push('/browse')"
            color="#40a0e0"
            class="backButton"
          >Back To Browse</v-btn>
    </div>
    <div v-else>
        <div class="filter">
            <div class="filterTitle">Filter Comments By</div>
            <div class="filterOptionsSetOne">
                <div class="selectedFilterOption">Most Likes</div>
                <div class="filterOption">Newest</div>
            </div>
        </div>
    <v-row justify="center" class="text-center">
      <v-col class="mb-5 clipColumn" cols="8">
        <div>
          <ClipPlayer :clip="clip"/>
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
  name: "SingleClip",
  components: {
    ClipPlayer
  },
  props: ["clip"]
};
</script>

<style scoped src='../assets/styles/singleClip.css'></style>