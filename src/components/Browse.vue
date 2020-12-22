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
        title: "Later, GrndpaGaming",
        datePosted: "Dec 22, 2020",
        username: "JackiePrince",
        userImage: require("../assets/images/crown.png"),
        badgeOne: require("../assets/images/badge1.png"),
        badgeTwo: require("../assets/images/badge2.png"),
        badgeThree: require("../assets/images/badge3.png"),
        badgeFour: require("../assets/images/badge4.png"),
        impressiveCount: "3.43M",
        funnyCount: "1.24k",
        discussionCount: "542",
        views: "8.38M",
        likes: "5.03M",
        comments: "907k"
      },
      {
        type: "video/mp4",
        src: require("../assets/videos/snipe2.mp4"),
        poster: require("../assets/images/snipe2poster.png"),
        title: "Later, Bot",
        datePosted: "Dec 20, 2020",
        username: "JackiePrince",
        userImage: require("../assets/images/crown.png"),
        badgeOne: require("../assets/images/badge1.png"),
        badgeTwo: require("../assets/images/badge2.png"),
        badgeThree: require("../assets/images/badge3.png"),
        badgeFour: require("../assets/images/badge4.png"),
        impressiveCount: "1.82M",
        funnyCount: "8.91k",
        discussionCount: "9837",
        views: "6.04M",
        likes: "2.17M",
        comments: "434k"
      }
    ]
  })
};
</script>

<style scoped src='../assets/styles/browse.css'></style>