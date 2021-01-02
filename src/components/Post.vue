<template>
  <v-container>
    <v-row justify="center" class="text-center">
      <v-col class="mb-5 postColumn" cols="6">
        <div class="postDiv">
          <div class="browseClipDiv">Browse Filesystem for Clip</div>
          <div class="browsePosterDiv">Browse Filesystem for Poster</div>
          <div class="clipTitleDiv">Clip Title</div>
          <div class="gameTitleDiv">Clip Game</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import appConfig from "../config/app.config";

export default {
  name: "Post",
  props: ["user"],
  data: () => ({
    serverUrl: appConfig.SERVER_URL,
    newClip: "",
    newClipPoster: "",
    newClipTitle: "",
    newClipGame: "",
  }),
};
</script>

<style scoped src='../assets/styles/post.css'></style>