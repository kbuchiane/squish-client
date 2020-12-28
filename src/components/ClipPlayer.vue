<template>
  <div class="clipPlayerDiv">
    <div class="clipTitle">{{ clip.title }}</div>
    <div class="clipDateAndGame">{{ clip.datePosted }}</div>
    <div class="clipDateAndGame">{{ clip.game }}</div>
    <div class="clipUsername">{{ clip.username }}</div>
    <div class="clipHeader">
      <div class="clipUser">
        <router-link to="" class="d-flex align-center">
          <v-img
            class="shrink mr-2 userImage"
            contain
            :src="clip.userImage"
          />
        </router-link>
      </div>
      <div class="clipUserBadges">
        <div class="topLeftBadge">
          <v-img
            class="leftBadgeImage"
            contain
            :src="clip.badgeOne"
          />
        </div>
        <div class="topRightBadge">
          <v-img
            class="rightBadgeImage"
            contain
            :src="clip.badgeTwo"
          />
        </div>
        <div class="bottomLeftBadge">
          <v-img
            class="leftBadgeImage"
            contain
            :src="clip.badgeThree"
          />
        </div>
        <div class="bottomRightBadge">
          <v-img
            class="rightBadgeImage"
            contain
            :src="clip.badgeFour"
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
      <div class="clipImpressive">
        <div class="impressiveIconDiv">
          <v-img
            class="impressiveIcon"
            contain
            src="../assets/images/impressiveIcon.png"
          />
        </div>
        <div class="impressiveCount">{{ clip.impressiveCount }}</div>
      </div>
      <div class="clipFunny">
        <div class="funnyIconDiv">
          <v-img
            class="funnyIcon"
            contain
            src="../assets/images/funnyIcon.png"
          />
        </div>
        <div class="funnyCount">{{ clip.funnyCount }}</div>
      </div>
      <div class="clipDiscussion">
        <div class="discussionIconDiv">
          <v-img
            class="discussionIcon"
            contain
            src="../assets/images/discussionIcon.png"
          />
        </div>
        <div class="discussionCount">{{ clip.discussionCount }}</div>
      </div>
    </div>
    <div class="clipFooter">
      <div class="clipViews">
        <div class="viewCount">{{ clip.viewCount }} views</div>
      </div>
      <div class="clipLikes">
        <div class="likeIconDiv">
          <v-img
            class="likeIcon"
            contain
            src="../assets/images/likeIcon.png"
          />
        </div>
        <div class="likeCount">{{ clip.likeCount }} likes</div>
      </div>
      <div class="clipComments">
        <div class="commentIconDiv">
          <v-img
            class="commentIcon"
            contain
            src="../assets/images/commentIcon.png"
          />
        </div>
        <div class="commentCount">{{ clip.commentCount }} comments</div>
      </div>
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