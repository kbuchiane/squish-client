<template>
  <v-container>
    <div
      v-for="comment in comments"
      :comments="comment.comments"
      :key="comment.commentId"
      class="comment"
    >
      <div class="singleCommentHeader">
        <div class="commentUsername">
          <p class="commentUsernameText">
            <router-link to="/profile" class="routerStyle">
              {{ comment.username }}
            </router-link>
          </p>
        </div>
        <div class="commentDate">
          <p class="commentDateText">
            {{ comment.date }}
          </p>
        </div>
      </div>
      <div class="singleCommentBody">
        <p class="commentText">{{ comment.text }}</p>
      </div>
      <div class="singleCommentFooter">
        <div class="commentLikeIconDiv">
          <v-img
            v-if="comment.liked"
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
        <div class="commentLikes">{{ comment.likes }}</div>
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
            v-if="loggedInUser === comment.username"
            class="commentDeleteReportIcon"
            contain
            src="../assets/images/deleteIcon.png"
          />
          <v-img
            v-else
            class="commentDeleteReportIcon"
            contain
            src="../assets/images/reportIcon.png"
          />
        </div>
      </div>
      <div v-if="comment.comments && comment.comments.length">
        <CommentTree :comments="comment.comments"></CommentTree>
      </div>
    </div>
  </v-container>
</template>

<script>
import "vuejs-dialog/dist/vuejs-dialog.min.css";

export default {
  name: "CommentTree",
  props: ["comments"],
  data: () => ({
    loggedInUser: "JackiePrince",
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
  },
};
</script>

<style scoped src='../assets/styles/commentTree.css'></style>
<style src='../assets/styles/confirmationPrompt.css'></style>