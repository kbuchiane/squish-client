<template>
  <v-container>
    <div
      v-for="comment in comments"
      :comments="comment.Comments"
      :key="comment.CommentId"
      class="comment"
    >
      <div class="singleCommentHeader">
        <div class="commentUsername">
          <p class="commentUsernameText">
            <router-link to="/profile" class="routerStyle">
              {{ comment.Username }}
            </router-link>
          </p>
        </div>
        <div class="commentDate">
          <p class="commentDateText">
            {{ comment.DateCreated }}
          </p>
        </div>
      </div>
      <div class="singleCommentBody">
        <p class="commentText">{{ comment.Text }}</p>
      </div>
      <div class="singleCommentFooter">
        <div class="commentLikeIconDiv">
          <v-img
            v-if="comment.Liked"
            class="commentLikeIcon"
            contain
            src="../assets/images/likedIcon.png"
          />
          <v-img
            v-else
            class="commentLikeIcon"
            contain
            src="../assets/images/likeIcon.png"
          />
        </div>
        <div class="commentLikes">{{ comment.Likes }}</div>
        <div class="commentReplyIconDiv">
          <v-img
            class="commentReplyIcon"
            contain
            src="../assets/images/replyIcon.png"
          />
        </div>
        <div class="commentReply">reply</div>
        <div class="commentDeleteReportIconDiv">
          <v-img
            @click="deleteComment()"
            v-if="loggedInUser === comment.Username"
            class="commentDeleteReportIcon"
            contain
            src="../assets/images/deleteIcon.png"
          />
          <v-img
            @click="deleteComment()"
            v-else
            class="commentDeleteReportIcon"
            contain
            src="../assets/images/reportIcon.png"
          />
        </div>
      </div>
      <div v-if="comment.Comments && comment.Comments.length">
        <CommentTree :comments="comment.Comments"></CommentTree>
      </div>
    </div>
  </v-container>
</template>

<script>
import "vuejs-dialog/dist/vuejs-dialog.min.css";

export default {
  name: "CommentTree",
  props: ["user", "comments"],
  data: () => ({
    loggedInUser: "",
  }),
  methods: {
    deleteComment: function () {
      let message = "Are you sure you want to delete this comment?";
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
          console.log("delete comment confirmed");
        })
        .catch(function () {
          console.log("delete comment cancelled");
        });
    },
    reportComment: function () {
      let message = "Are you sure you want to report this comment?";
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
          console.log("report comment confirmed");
        })
        .catch(function () {
          console.log("report comment cancelled");
        });
    },
  },
  beforeMount: function () {
    // console.log("-- BEFORE mounted ");
    // FIXME user not defined??????
    // loggedInUser = this.user.username;

   // console.log("Comment Tree  User: " + this.user);
  },

  mounted: function () {
    // console.log("-- mounted ");
    // console.log("User: " + this.user);
    //loggedInUser = this.user.username;
    //console.log("logged in User: [" + this.loggedInUser + "]");
  },
};
</script>

<style scoped src='../assets/styles/commentTree.css'></style>
<style src='../assets/styles/confirmationPrompt.css'></style>