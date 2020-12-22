<template>
  <div class="clipPlayerDiv">
    <div class="clipHeader">
      <div class="clipUser"></div>
      <div class="clipUserBadges">
        <div class="topLeftBadge"></div>
        <div class="topRightBadge"></div>
        <div class="bottomLeftBadge"></div>
        <div class="bottomRightBadge"></div>
      </div>
      <div class="clipUserActions"></div>
    </div>
    <video controls class="clipPlayer" :poster="clip.poster">
      <source :src="clip.src" :type="clip.type">
    </video>
    <div class="clipSideTab">
      <div class="clipImpressive"></div>
      <div class="clipFunny"></div>
      <div class="clipDiscussion"></div>
    </div>
    <div class="clipFooter">
      <div class="clipViews"></div>
      <div class="clipLikes"></div>
      <div class="clipComments"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClipPlayer",
  props: ["clip"]
};
</script>

<style scoped src='../assets/styles/clipPlayer.css'></style>