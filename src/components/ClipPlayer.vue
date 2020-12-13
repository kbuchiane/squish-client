<template>
  <div>
    <video controls :src="clip.src" :type="clip.type"></video>
  </div>
</template>

<script>
export default {
  name: "ClipPlayer",
  props: ["clip"],
  mounted: function() {
    console.log(this.clip.src);
    console.log(this.clip.type);
  }
};
</script>

<style scoped src='../assets/styles/clipPlayer.css'></style>