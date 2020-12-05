<template>
  <v-container>
      <div>
          <video ref="clipPlayer" class=""></video>
      </div>
  </v-container>
</template>

<script>
import videojs from 'video.js';

export default {
  name: "ClipPlayer",
  props: () => ({
    options: {
      type: Object
    }
  }),
  data: () => ({
    player: null
  }),
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, 
      function onPlayerReady() {
        console.log('onPlayerReady', this);
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