<template>
  <div class="clipPlayerDiv">
    <div class="clipHeader">
      <div class="clipUser"></div>
      <div class="clipUserBadges"></div>
      <div class="clipUserActions"></div>
    </div>
    <video controls class="clipPlayer" :poster="clip.poster">
      <source :src="clip.src" :type="clip.type">
    </video>
    <div class="clipSideTab">
      <div class="clipImpressiveCount"></div>
      <div class="clipFunnyCount"></div>
      <div class="clipDiscussionCount"></div>
    </div>
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