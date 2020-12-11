<template>
  <div>
    <video ref="clipPlayer" class="video-js vjs-default-skin vjs-big-play-centered"></video>
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
        // When player is ready
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
<style scoped src='../../node_modules/video.js/dist/video-js.css'></style>