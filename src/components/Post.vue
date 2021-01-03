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
            <p class="uploadClipFilename">somename.mp4 {{ newClipName }}</p>
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
          </div>
          <div class="clipTitleDiv">Clip Title</div>
          <div class="gameTitleDiv">Clip Game</div>
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
    newClip: "",
    newClipName: "",
    newClipPoster: "",
    newClipTitle: "",
    newClipGame: "",
  }),
  methods: {
    uploadClip: function () {
      console.log("uploading a clip");
      this.$refs.clipInput.click();
    },
    clipSelected: function(event) {
      console.log('a clip was selected');
      let files = event.target.files;
      this.newClipName = files[0].name;
      let fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.clipUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.newClip = files[0];
    }
  },
};
</script>

<style scoped src='../assets/styles/post.css'></style>