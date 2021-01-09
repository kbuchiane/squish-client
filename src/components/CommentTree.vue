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
        <div class="commentDeleteIconDiv">
          <v-img
            class="commentDeleteIcon"
            contain
            src="../assets/images/deleteIcon.png"
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
export default {
  name: "CommentTree",
  props: ["comments"],
  data: () => ({
    loggedInUser: "JackiePrince",
  }),
};
</script>

<style scoped src='../assets/styles/commentTree.css'></style>