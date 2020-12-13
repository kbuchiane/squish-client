<template>
  <div>
    <video 
      ref="clipPlayer"
      class=""
      controls
      :type="this.clips.type"
      :src="this.clips.src">
    </video>
  </div>
</template>

<script>
export default {
  name: "ClipPlayer",
  props: ["clips"]
};
</script>

<style scoped src='../assets/styles/clipPlayer.css'></style>