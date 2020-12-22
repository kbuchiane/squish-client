<template>
  <div class="clipPlayerDiv">
    <div class="clipTitle">{{ clip.title }}</div>
    <div class="clipUsername">{{ clip.username }}</div>
    <div class="clipHeader">
      <div class="clipUser">
        <router-link to="" class="d-flex align-center">
          <v-img
            class="shrink mr-2 userImage"
            contain
            :src="clip.userImage"
            width="100"
          />
        </router-link>
      </div>
      <div class="clipUserBadges">
        <div class="topLeftBadge">
          <v-img
            class="badgeImage"
            contain
            :src="clip.badgeOne"
            width="100"
          />
        </div>
        <div class="topRightBadge">
          <v-img
            class="badgeImage"
            contain
            :src="clip.badgeTwo"
            width="100"
          />
        </div>
        <div class="bottomLeftBadge">
          <v-img
            class="badgeImage"
            contain
            :src="clip.badgeThree"
            width="100"
          />
        </div>
        <div class="bottomRightBadge">
          <v-img
            class="badgeImage"
            contain
            :src="clip.badgeFour"
            width="100"
          />
        </div>
      </div>
      <div class="clipUserActions">
        <v-btn
          color="#40a0e0"
          class="userActionGift"
        >Gift</v-btn>
        <v-btn
          color="#40a0e0"
          class="userActionLinkUp"
        >Link Up</v-btn>
        <v-btn
          color="#40a0e0"
          class="userActionFollow"
        >Follow</v-btn>
      </div>
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