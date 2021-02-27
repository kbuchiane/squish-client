<template>
  <div class="clipPlayerDiv">
    <div class="clipTitle">
      <p v-if="this.$route.name === 'SingleClip'" class="clipTitleText">
        {{ clip.Title }}
      </p>
      <p v-else class="clipTitleText">
        <router-link
          :to="{ name: 'SingleClip', params: { clipId: clip.ClipId } }"
          class="routerStyle"
        >
          {{ clip.Title }}
        </router-link>
      </p>
    </div>
    <div class="clipDate">{{ clip.DisplayDate }}</div>
    <div class="clipGame">
      <p @click="scrollToTop()" class="clipGameText">
        <router-link
          :to="{ name: 'SingleGame', params: { gameId: clip.Game.GameId } }"
          class="routerStyle"
        >
          {{ clip.Game.Title }}
        </router-link>
      </p>
    </div>
    <div class="clipUsername">
      <p @click="scrollToTop()" class="clipUsernameText">
        <router-link
          :to="{ name: 'Profile', params: { username: clip.UserProfile.Username } }"
          class="routerStyle"
        >
          {{ clip.UserProfile.Username }}
        </router-link>
      </p>
    </div>
    <div class="clipHeader">
      <div class="clipUser">
        <router-link
          :to="{ name: 'Profile', params: { username: clip.UserProfile.Username } }"
          class="d-flex align-center"
        >
          <v-img
            class="shrink mr-2 userImage"
            contain
            :src="require(`../assets/images/${clip.UserImage}`)"
          />
        </router-link>
      </div>
      <div class="clipUserBadges">
        <div class="topLeftBadge">
          <v-img
            class="leftBadgeImage"
            contain
            :src="require(`../assets/images/${clip.BadgeOne}`)"
          />
        </div>
        <div class="topRightBadge">
          <v-img
            class="rightBadgeImage"
            contain
            :src="require(`../assets/images/${clip.BadgeTwo}`)"
          />
        </div>
        <div class="bottomLeftBadge">
          <v-img
            class="leftBadgeImage"
            contain
            :src="require(`../assets/images/${clip.BadgeThree}`)"
          />
        </div>
        <div class="bottomRightBadge">
          <v-img
            class="rightBadgeImage"
            contain
            :src="require(`../assets/images/${clip.BadgeFour}`)"
          />
        </div>
      </div>
      <div class="clipUserActions">
        <v-btn
          @click="userLoggedInCheck()"
          color="#40a0e0"
          class="userActionButton"
          >Gift</v-btn
        >
        <v-btn
          @click="userLoggedInCheck()"
          color="#40a0e0"
          class="userActionButton"
          >Link Up</v-btn
        >
        <v-btn
          v-if="clip.UserProfile.Followed"
          @click="userLoggedInCheck()"
          color="#40a0e0"
          class="userActionButton"
          >Unfollow</v-btn
        >
        <v-btn
          v-else
          @click="userLoggedInCheck()"
          color="#40a0e0"
          class="userActionButton"
          >Follow</v-btn
        >
        <v-img
          @click="toggleEllipsis()"
          class="ellipsisButton"
          contain
          src="../assets/images/ellipsisIcon.png"
        />
        <v-img
          @click="deleteClip()"
          v-if="ellipsisToggle && loggedInUser === clip.UserProfile.Username"
          class="deleteReportButton"
          contain
          src="../assets/images/deleteIcon.png"
        />
        <v-img
          @click="reportClip()"
          v-else-if="
            ellipsisToggle && loggedInUser !== clip.UserProfile.Username
          "
          class="deleteReportButton"
          contain
          src="../assets/images/reportIcon.png"
        />
      </div>
    </div>
    <video
      controls
      class="clipPlayer"
      :poster="require(`../assets/images/${clip.Thumbnail}`)"
    >
      <source
        :src="require(`../assets/videos/${clip.VideoFilepath}`)"
        :type="clip.Type"
      />
    </video>
    <div class="clipSideTab">
      <div class="clipImpressive">
        <div @click="userLoggedInCheck()" class="impressiveIconDiv">
          <v-img
            v-if="clip.ImpressiveLiked"
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
        <div class="impressiveCount">{{ clip.ImpressiveCount }}</div>
      </div>
      <div class="clipFunny">
        <div @click="userLoggedInCheck()" class="funnyIconDiv">
          <v-img
            v-if="clip.FunnyLiked"
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
        <div class="funnyCount">{{ clip.FunnyCount }}</div>
      </div>
      <div class="clipDiscussion">
        <div @click="userLoggedInCheck()" class="discussionIconDiv">
          <v-img
            v-if="clip.DiscussionLiked"
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
        <div class="discussionCount">{{ clip.DiscussionCount }}</div>
      </div>
    </div>
    <div class="clipFooter">
      <div class="clipViews">
        <div class="viewCount">{{ clip.ViewCount }} views</div>
      </div>
      <div class="clipLikes">
        <div @click="userLoggedInCheck()" class="likeIconDiv">
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
        <div class="likeCount">{{ clip.LikeCount }} likes</div>
      </div>
      <div class="clipComments">
        <div class="commentIconDiv">
          <v-img
            class="commentIcon"
            contain
            src="../assets/images/commentIcon.png"
          />
        </div>
        <div class="commentCount">{{ clip.CommentCount }} comments</div>
      </div>
    </div>
  </div>
</template>

<script>
import "vuejs-dialog/dist/vuejs-dialog.min.css";

export default {
  name: "ClipPlayer",
  props: ["clip", "user"],
  data: () => ({
    loggedInUser: "",
    ellipsisToggle: false,
  }),
  methods: {
    scrollToTop: function () {
      window.scrollTo(0, 0);
    },
    toggleEllipsis: function () {
      this.ellipsisToggle = !this.ellipsisToggle;
    },
    deleteClip: function () {
      let message = "Are you sure you want to delete this clip?";
      let options = {
        html: false,
        loader: false,
        reverse: false,
        okText: "Yes",
        cancelText: "No",
        animation: "zoom",
        type: "basic",
        verification: "continue",
        clicksCount: 1,
        backdropClose: true,
        customClass: "",
      };

      this.$dialog
        .confirm(message, options)
        .then(function () {
          console.log("delete clip confirmed");
        })
        .catch(function () {
          console.log("delete clip cancelled");
        });
    },
    reportClip: function () {
      let message = "Are you sure you want to report this clip?";
      let options = {
        html: false,
        loader: false,
        reverse: false,
        okText: "Yes",
        cancelText: "No",
        animation: "zoom",
        type: "basic",
        verification: "continue",
        clicksCount: 1,
        backdropClose: true,
        customClass: "",
      };

      this.$dialog
        .confirm(message, options)
        .then(function () {
          console.log("report clip confirmed");
        })
        .catch(function () {
          console.log("report clip cancelled");
        });
    },
    userLoggedInCheck: function () {
      if (this.loggedInUser) {
        return true;
      } else {
        let self = this;
        let message = "You must be logged in to perform this action.";
        let options = {
          html: false,
          loader: false,
          reverse: false,
          okText: "Log In",
          cancelText: "OK",
          animation: "zoom",
          type: "basic",
          verification: "continue",
          clicksCount: 1,
          backdropClose: true,
          customClass: "",
        };

        this.$dialog
          .confirm(message, options)
          .then(function () {
            self.$router.push("Login");
          })
          .catch(function () {
            // Placeholder
          });

        return false;
      }
    },
  },
};
</script>

<style scoped src='../assets/styles/clipPlayer.css'></style>
<style src='../assets/styles/confirmationPrompt.css'></style>