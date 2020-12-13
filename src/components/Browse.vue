<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5 clipColumn" cols="12">
        <div>
          <ClipPlayer :clips="clips"/>
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
        src: "../assets/videos/test.mp4"
      }
    ]
  })
};
</script>

<style scoped src='../assets/styles/browse.css'></style>