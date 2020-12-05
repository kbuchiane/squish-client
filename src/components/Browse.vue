<template>
  <v-container>
    <div id="clipPlayer">
        <ClipPlayer/>
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
    //
  })
};
</script>

<style scoped src='../assets/styles/browse.css'></style>