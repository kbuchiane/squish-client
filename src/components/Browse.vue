<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5 logSignColumn" cols="12">
        <h2 class="headline font-weight-bold mb-3 noselect">Test Button</h2>
        <p></p>
        <v-row justify="center">
          <v-btn
            @click="follow(followerUsername, followedUsername)"
            color="green"
            class="logsignButton"
          >Test</v-btn>
        </v-row>
        <p></p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import appConfig from "../config/app.config";
import userEntryUtil from "../utils/userEntry.util";
export default {
  name: "Browse",
  data: () => ({
    serverUrl: appConfig.SERVER_URL,
    followerUsername: "jon",
    followedUsername: "jackie"
  }),
  props: ["user"],
  methods: {
    follow: function(followerUsername, followedUsername) {
      followerUsername = followerUsername.trim();
      followedUsername = followedUsername.trim();

      return axios({
        method: 'post',
        url: this.serverUrl + "/followUser",
        headers: { 
          authorization: "Bearer " + this.user.accessToken
        },
        data: {
          followerUsername: followerUsername,
          followedUsername: followedUsername
        },
      })
      .then(function(response) {
        return response;
      });
    }
  },
  mounted: function() {
    // this.$refs.usernameInput.focus();
  }
};
</script>

<style scoped src='../assets/styles/browse.css'></style>