<template>
  <v-container>
    <div v-if="!clip" class="notFoundDiv">
      <p class="notFoundText">The clip could not be found.</p>
      <v-btn @click="$router.push('/browse')" color="#40a0e0" class="backButton"
        >Back To Browse</v-btn
      >
    </div>
    <div v-else>
      <div class="filter">
        <div class="filterTitle">Filter Comments By</div>
        <div class="filterOptionsSetOne">
          <div class="selectedFilterOption">Most Likes</div>
          <div class="filterOption">Newest</div>
        </div>
      </div>
      <v-row justify="center" class="text-center">
        <v-col class="mb-5 clipColumn" cols="6">
          <div>
            <ClipPlayer :clip="clip" />
          </div>
          <div class="commentsSection">
            <div class="newComment">
              <textarea-autosize
                v-model="newComment"
                placeholder="Add a new comment"
                class="newCommentTextBox"
                ref="newCommentInput"
              />
              <v-btn
                @click="postNewcomment()"
                color="#40a0e0"
                class="commentButton"
                >Comment</v-btn
              >
            </div>
            <div class="commentsHeader">
              <p class="commentsHeaderText">
                Comments ({{ clip.commentCount }})
              </p>
            </div>
            <div class="comments">
              <CommentTree :comments="clip.comments"></CommentTree>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import ClipPlayer from "./ClipPlayer";
import CommentTree from "./CommentTree";
import axios from "axios";
import appConfig from "../config/app.config";

export default {
  name: "SingleClip",
  components: {
    ClipPlayer,
    CommentTree,
  },
  props: ["clip", "user"],
  data: () => ({
    serverUrl: appConfig.SERVER_URL,
    newComment: "",

    // Only used for test
    commenter: "Freddy",
    clipId: "1",
    parentCommentId: "1"

  }),
  methods: {
    postNewcomment: function () {
      if (this.newComment) {
        let comment = this.newComment.trim();
        this.newComment = "";

        return axios({
          method: "post",
          url: this.serverUrl + "/addComment",
          headers: {
            authorization: "Bearer " + this.user.accessToken,
          },
          data: {
            commenter: this.commenter,
            comment: comment,
            clipId: this.clipId,
            parentCommentId: this.parentCommentId,
          }
        }).then(function (response) {
          return response;
        });
      }
    },
  },
};
</script>

<style scoped src='../assets/styles/singleClip.css'></style>