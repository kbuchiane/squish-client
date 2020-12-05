<template>
  <v-container>
    <div>
        <video :options="videoOptions"/>
    </div>
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
    videoOptions: {
      autoplay: true,
      controls: true,
      source: [
        {
          src: "../../media/clips/test.mp4",
          type: "video/mp4"
        }
      ]
    }
  })
};
</script>

<style scoped src='../assets/styles/browse.css'></style>