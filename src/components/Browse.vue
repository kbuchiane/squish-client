<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5 clipColumn" cols="12">
        <div>
          <ClipPlayer :options="videoOptions"/>
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
    videoOptions: {
      autoplay: true,
      controls: true,
      sources: [
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