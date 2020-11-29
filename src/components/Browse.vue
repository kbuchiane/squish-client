<template>
  <v-container>
    <div id="clip">
        <Clip/>
    </div>
  </v-container>
</template>

<script>
import Clip from "./Clip";
import axios from "axios";

export default {
  name: "Browse",
  components: {
    Clip
  },
  data: () => ({
    //
  })
};
</script>

<style scoped src='../assets/styles/browse.css'></style>