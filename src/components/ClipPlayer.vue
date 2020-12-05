<template>
  <div>
    <video ref="clipPlayer" class=""></video>
  </div>
</template>

<script>
import videojs from "video.js";

export default {
  name: "ClipPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data: () => ({
    player: null
  }),
  mounted() {
    this.player = videojs(this.$refs.clipPlayer, this.options, 
      function onPlayerReady() {
        console.log("onPlayerReady", this);
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
};
</script>

<style scoped src='../assets/styles/clipPlayer.css'></style>