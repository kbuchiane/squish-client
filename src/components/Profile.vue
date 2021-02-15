<template>
  <v-container>
    <div v-if="!userProfile" class="notFoundDiv">
      <p class="notFoundText">The profile could not be found.</p>
      <v-btn @click="$router.push('/browse')" color="#40a0e0" class="backButton"
        >Back To Browse</v-btn
      >
    </div>
    <div v-else>
      <div class="filter">
        <div class="filterTitle">Filter Clips By</div>
        <div class="filterOptionsSetOne">
          <div class="selectedFilterOption">Most Popular</div>
          <div class="filterOption">Specific Games</div>
          <div class="filterOption">Most Impressive</div>
          <div class="filterOption">Funniest</div>
          <div class="filterOption">Best Discussion</div>
        </div>
        <div class="filterTitle">Timeframe</div>
        <div class="filterOptionsSetTwo">
          <div class="selectedFilterOptionSetTwo">Default</div>
          <div class="filterOptionSetTwo">Past Day</div>
          <div class="filterOptionSetTwo">Past Week</div>
          <div class="filterOptionSetTwo">Past Month</div>
          <div class="filterOptionSetTwo">Past Year</div>
          <div class="filterOptionSetTwo">All Time</div>
        </div>
      </div>
      <v-row justify="center" class="text-center">
        <v-col class="mb-5 profileColumn" cols="6">
          <div class="profileDiv">
            <div class="profileUsername">
              <p class="profileUsernameText">
                {{ userProfile.Username }}
              </p>
            </div>
            <div class="userHeader">
              <div class="profileUser">
                <img
                  class="userImage"
                  contain
                  :src="require(`../assets/images/${userProfile.IconFilepath}`)"
                />
              </div>
              <div class="profileUserBadges">
                <div class="topLeftBadge">
                  <v-img
                    class="leftBadgeImage"
                    contain
                    :src="
                      require(`../assets/images/${userProfile.Badges.BadgeOne}`)
                    "
                  />
                </div>
                <div class="topRightBadge">
                  <v-img
                    class="rightBadgeImage"
                    contain
                    :src="
                      require(`../assets/images/${userProfile.Badges.BadgeTwo}`)
                    "
                  />
                </div>
                <div class="bottomLeftBadge">
                  <v-img
                    class="leftBadgeImage"
                    contain
                    :src="
                      require(`../assets/images/${userProfile.Badges.BadgeThree}`)
                    "
                  />
                </div>
                <div class="bottomRightBadge">
                  <v-img
                    class="rightBadgeImage"
                    contain
                    :src="
                      require(`../assets/images/${userProfile.Badges.BadgeFour}`)
                    "
                  />
                </div>
              </div>
              <div class="profileUserActions">
                <v-btn color="#40a0e0" class="userActionButton">Gift</v-btn>
                <v-btn color="#40a0e0" class="userActionButton">Link Up</v-btn>
                <v-btn
                  v-if="userProfile.Followed"
                  color="#40a0e0"
                  class="userActionButton"
                  >Unfollow</v-btn
                >
                <v-btn v-else color="#40a0e0" class="userActionButton"
                  >Follow</v-btn
                >
              </div>
            </div>
            <div class="userInfoDiv">
              <div class="userInfoSection">
                {{ userProfile.FollowerCount }} followers
              </div>
              <div class="userInfoSection">
                {{ userProfile.ClipsCount }} clips
              </div>
              <div class="userInfoSection">
                Joined {{ userProfile.DateCreated }}
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" class="text-center">
        <v-col class="mb-5" cols="6">
          <div class="clipsFromDiv">
            <div class="clipsProfile">
              <p class="clipsProfileText">
                {{ clipsForUser.length }} Clips from {{ userProfile.Username }}
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" class="text-center">
        <v-col class="mb-5" cols="6">
          <div v-for="clip in clipsForUser" :key="clip.ClipId">
            <ClipPlayer :clip="clip" />
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
  name: "Profile",
  components: {
    ClipPlayer,
  },
  props: ["user", "userProfile"],
  data: () => ({
    serverUrl: appConfig.SERVER_URL,
    clipsForUser: [],
    //  clips: [],
  }),
  methods: {
    getPageContents: function () {
      var vm = this;

      return axios({
        method: "get",
        responseType: "json",
        url: vm.serverUrl + "/profile/profile",
        headers: {
          authorization: "Bearer " + vm.user.accessToken,
        },
        params: {
          username: vm.user.username,
          profileName: vm.userProfile.Username,
        },
      }).then(function (response) {
        vm.clipsForUser = response.data;
      });
    },
  },

  beforeMount: function () {
    // console.log("-- BEFORE mounted ");
    // console.log("User: " + this.user.username);
    // console.log("--- userProfile   profileUser:" + this.userProfile.Username);
    // console.log("--- clips   length:" + this.clips.length);

    this.getPageContents();
  },
  mounted: function () {
    // console.log("-- mounted ");
    // this.getPageContents();
    // console.log("--- userProfile   profileUser:" + this.userProfile.Username);
  },
};
</script>

<style scoped src='../assets/styles/profile.css'></style>