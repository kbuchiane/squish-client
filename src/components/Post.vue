<template>
  <v-container>
    <v-row justify="center" class="text-center">
      <v-col class="mb-5 postColumn" cols="6">
        <div class="postDiv">
          <div class="postHeader">Post A New Clip</div>
          <div class="browseClipDiv">
            <v-btn @click="uploadClip()" color="#40a0e0" class="postButton"
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
            <v-btn @click="uploadThumbnail()" color="#40a0e0" class="postButton"
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
  },
};
</script>

<style scoped src='../assets/styles/post.css'></style>