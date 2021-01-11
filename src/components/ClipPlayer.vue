<template>
  <div class="clipPlayerDiv">
    <div class="clipTitle">
      <p v-if="this.$route.name === 'SingleClip'" class="clipTitleText">
        {{ clip.title }}
      </p>
      <p v-else class="clipTitleText">
        <router-link
          :to="{ name: 'SingleClip', params: { clip: clip } }"
          class="routerStyle"
        >
          {{ clip.title }}
        </router-link>
      </p>
    </div>
    <div class="clipDate">{{ clip.datePosted }}</div>
    <div class="clipGame">
      <p @click="scrollToTop()" class="clipGameText">
        <router-link
          :to="{ name: 'SingleGame', params: { selectedGame: clip.game } }"
          class="routerStyle"
        >
          {{ clip.game.title }}
        </router-link>
      </p>
    </div>
    <div class="clipUsername">
      <p @click="scrollToTop()" class="clipUsernameText">
        <router-link
          :to="{ name: 'Profile', params: { userProfile: clip.userProfile } }"
          class="routerStyle"
        >
          {{ clip.userProfile.username }}
        </router-link>
      </p>
    </div>
    <div class="clipHeader">
      <div class="clipUser">
        <router-link
          :to="{ name: 'Profile', params: { userProfile: clip.userProfile } }"
          class="d-flex align-center"
        >
          <v-img class="shrink mr-2 userImage" contain :src="clip.userImage" />
        </router-link>
      </div>
      <div class="clipUserBadges">
        <div class="topLeftBadge">
          <v-img class="leftBadgeImage" contain :src="clip.badgeOne" />
        </div>
        <div class="topRightBadge">
          <v-img class="rightBadgeImage" contain :src="clip.badgeTwo" />
        </div>
        <div class="bottomLeftBadge">
          <v-img class="leftBadgeImage" contain :src="clip.badgeThree" />
        </div>
        <div class="bottomRightBadge">
          <v-img class="rightBadgeImage" contain :src="clip.badgeFour" />
        </div>
      </div>
      <div class="clipUserActions">
        <v-btn color="#40a0e0" class="userActionButton">Gift</v-btn>
        <v-btn color="#40a0e0" class="userActionButton">Link Up</v-btn>
        <v-btn
          v-if="clip.userProfile.followed"
          color="#40a0e0"
          class="userActionButton"
          >Unfollow</v-btn
        >
        <v-btn v-else color="#40a0e0" class="userActionButton">Follow</v-btn>
        <v-img
          v-if="loggedInUser === clip.userProfile.username"
          class="deleteButton"
          contain
          src="../assets/images/deleteIcon.png"
        />
        <v-img
          v-else
          class="reportButton"
          contain
          src="../assets/images/reportIcon.png"
        />
      </div>
    </div>
    <video controls class="clipPlayer" :poster="clip.poster">
      <source :src="clip.src" :type="clip.type" />
    </video>
    <div class="clipSideTab">
      <div class="clipImpressive">
        <div class="impressiveIconDiv">
          <v-img
            v-if="clip.impressiveLiked"
            class="impressiveIcon"
            contain
            src="../assets/images/impressiveLikedIcon.png"
          />
          <v-img
            v-else
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
            v-if="clip.funnyLiked"
            class="funnyIcon"
            contain
            src="../assets/images/funnyLikedIcon.png"
          />
          <v-img
            v-else
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
            v-if="clip.discussionLiked"
            class="discussionIcon"
            contain
            src="../assets/images/discussionLikedIcon.png"
          />
          <v-img
            v-else
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
            v-if="clip.liked"
            class="likeIcon"
            contain
            src="../assets/images/likedIcon.png"
          />
          <v-img
            v-else
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
  props: ["clip"],
  data: () => ({
    loggedInUser: "JackiePrince",
  }),
  methods: {
    scrollToTop: function () {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped src='../assets/styles/clipPlayer.css'></style>