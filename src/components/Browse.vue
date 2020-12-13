<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5 clipColumn" cols="12">
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
        src: require("../assets/videos/test.mp4")
      },
      {
        type: "video/mp4",
        src: require("../assets/videos/test2.mp4")
      }
    ]
  })
};
</script>

<style scoped src='../assets/styles/browse.css'></style>