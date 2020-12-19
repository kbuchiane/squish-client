<template>
  <div class="clipPlayerDiv">
    <div class="clipHeader"></div>
    <video controls class="clipPlayer">
      <source :src="clip.src" :type="clip.type">
    </video>
    <div class="clipSideTab"></div>
    <div class="clipFooter"></div>
  </div>
</template>

<script>
export default {
  name: "ClipPlayer",
  props: ["clip"]
};
</script>

<style scoped src='../assets/styles/clipPlayer.css'></style>