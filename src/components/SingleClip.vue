<template>
  <v-container>
    <div v-if="!clip" class="notFoundDiv">
        <p class="notFoundText">The clip could not be found.</p>
        <v-btn
            @click="$router.push('/browse')"
            color="#40a0e0"
            class="backButton"
          >Back To Browse</v-btn>
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
      <v-col class="mb-5 clipColumn" cols="8">
        <div>
          <ClipPlayer :clip="clip"/>
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
            >Comment</v-btn>
          </div>
          <div class="commentsHeader">
            <p class="commentsHeaderText">Comments ({{ clip.commentCount }})</p>
          </div>
          <div class="comments">
            <div class="comment">
              <div class="singleCommentHeader">
                <div class="commentUsername">
                  <p class="commentUsernameText">
                    <router-link to="/profile" class="routerStyle">
                      {{ clip.comments[0].username }}
                    </router-link>
                  </p>
                </div>
                <div class="commentDate">
                  <p class="commentDateText">
                    {{ clip.comments[0].date }}
                  </p>
                </div>
              </div>
              <div class="singleCommentBody">
                <p class="commentText">{{ clip.comments[0].text }}</p>
              </div>
              <div class="singleCommentFooter">
                <div class="commentLikeIconDiv">
                  <v-img
                    class="commentLikeIcon"
                    contain
                    src="../assets/images/likeIcon.png"
                  />
                </div>
                <div class="commentLikes">{{ clip.comments[0].likes }}</div>
                <div class="commentReplyIconDiv">
                  <v-img
                    class="commentReplyIcon"
                    contain
                    src="../assets/images/replyIcon.png"
                  />
                </div>
                <div class="commentReply">reply</div>
            </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    </div>
  </v-container>
</template>

<script>
import ClipPlayer from "./ClipPlayer";
import axios from "axios";
import appConfig from "../config/app.config";

export default {
  name: "SingleClip",
  components: {
    ClipPlayer
  },
  props: ["clip"],
  data: () => ({
    serverUrl: appConfig.SERVER_URL,
    newComment: ""
  }),
  methods: {
    postNewcomment: function() {
      console.log("Posting new comment: " + this.newComment);
    }
  }
};
</script>

<style scoped src='../assets/styles/singleClip.css'></style>