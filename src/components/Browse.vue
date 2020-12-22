<template>
  <v-container>
    <div class="filter">
    </div>
    <v-row justify="center" class="text-center">
      <v-col class="mb-5 clipColumn" cols="8">
        <div v-for="clip in clips" :key="clip.src">
          <ClipPlayer :clip="clip"/>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ClipPlayer from "./ClipPlayer";
import axios from "axios";

export default {
  name: "Browse",
  components: {
    ClipPlayer
  },
  data: () => ({
    clips: [
      {
        type: "video/mp4",
        src: require("../assets/videos/snipe1.mp4"),
        poster: require("../assets/images/snipe1poster.png"),
        title: "Later, GrandpaGaming",
        username: "JackiePrince",
        userImage: require("../assets/images/crown.png")
      },
      {
        type: "video/mp4",
        src: require("../assets/videos/snipe2.mp4"),
        poster: require("../assets/images/snipe2poster.png"),
        title: "Later, Bot",
        username: "JackiePrince",
        userImage: require("../assets/images/crown.png")
      }
    ]
  })
};
</script>

<style scoped src='../assets/styles/browse.css'></style>