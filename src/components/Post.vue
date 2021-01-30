<template>
  <v-container>
    <v-row justify="center" class="text-center">
      <v-col class="mb-5 postColumn" cols="6">
        <div class="postDiv">
          <div class="postHeader">Post A New Clip</div>
          <div class="browseClipDiv">
            <v-btn @click="uploadClip()" color="#40a0e0" class="postButtonLeft"
              >Upload Clip</v-btn
            >
            <input
              type="file"
              class="uploadInput"
              ref="clipInput"
              accept="*.mp4"
              @change="clipSelected"
            />
            <p v-if="clipFilename" class="uploadClipFilename">Clip Selected</p>
          </div>
          <div class="browsePosterDiv">
            <v-btn
              @click="uploadThumbnail()"
              color="#40a0e0"
              class="postButtonLeft"
              >Upload Thumbnail</v-btn
            >
            <input
              type="file"
              class="uploadInput"
              ref="thumbnailInput"
              accept="image/*"
              @change="thumbnailSelected"
            />
            <p v-if="thumbnailFilename" class="uploadClipFilename">
              Thumbnail Selected
            </p>
          </div>
          <div class="clipTitleDiv">Clip Title</div>
          <textarea-autosize
            v-model="title"
            placeholder="Add a title"
            class="postTextBox"
            ref="titleInput"
          />
          <div class="gameTitleDiv">Clip Game</div>
          <textarea-autosize
            v-model="game"
            placeholder="Add a game"
            class="postTextBox"
            ref="gameInput"
          />
          <div class="postActions">
            <v-btn
              @click="clearEntries()"
              color="#40a0e0"
              class="postButtonLeft"
              >Clear</v-btn
            >
            <v-btn @click="post()" color="#40a0e0" class="postButtonRight"
              >Post</v-btn
            >
          </div>
          <p class="postMessage noselect">
            {{ message }}
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import appConfig from "../config/app.config";

export default {
  name: "Post",
  props: ["user"],
  data: () => ({
    serverUrl: appConfig.SERVER_URL,
    clip: "",
    clipFilename: "",
    clipUrl: "",
    thumbnail: "",
    thumbnailFilename: "",
    thumbnailUrl: "",
    title: "",
    game: "",
    message: "",
  }),
  methods: {
    uploadClip: function () {
      this.$refs.clipInput.click();
    },
    clipSelected: function (event) {
      let files = event.target.files;
      this.clipFilename = files[0].name;
      let fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.clipUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.clip = files[0];
    },
    uploadThumbnail: function () {
      this.$refs.thumbnailInput.click();
    },
    thumbnailSelected: function (event) {
      let files = event.target.files;
      this.thumbnailFilename = files[0].name;
      let fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.thumbnailUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.thumbnail = files[0];
    },
    post: function () {
      if (!this.clip) {
        this.message = "Please select a clip to upload";
      } else if (!this.thumbnail) {
        this.message = "Please select a thumbnail to upload";
      } else if (!this.title) {
        this.message = "Please enter a title for the clip";
      } else if (this.title.length > 80) {
        this.message = "The clip title must be 80 characters or less";
      } else if (!this.game) {
        this.message = "Please enter a game for the clip";
      } else if (this.game.length > 50) {
        this.message = "The game must be 80 characters or less";
      } else {
        // upload clip to server
        console.log("clip uploaded");

        // redirect to new clip post

        this.clearEntries();
      }
    },
    clearEntries: function () {
      this.clip = "";
      this.clipFilename = "";
      this.clipUrl = "";
      this.thumbnail = "";
      this.thumbnailFilename = "";
      this.thumbnailUrl = "";
      this.title = "";
      this.game = "";
      this.message = "";
    },
  },
};
</script>

<style scoped src='../assets/styles/post.css'></style>