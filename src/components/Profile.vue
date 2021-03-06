<template>
  <v-container>
    <div v-if="!username" class="notFoundDiv">
      <p class="notFoundText">The profile could not be found.</p>
      <v-btn @click="$router.push('/browse')" color="#40a0e0" class="backButton"
        >Back To Browse</v-btn
      >
    </div>
    <div v-else>
      <div class="filter">
        <div class="filterTitle">Filter Clips By</div>
        <div class="filterOptionsSetOne">
          <div
            v-if="filterBy.mostPopular"
            @click="mostPopularClick()"
            class="selectedFilterOptionOne"
          >
            Most Popular
          </div>
          <div v-else @click="mostPopularClick()" class="filterOptionOne">
            Most Popular
          </div>
          <div
            v-if="filterBy.mostImpressive"
            @click="mostImpressiveClick()"
            class="selectedFilterOptionOne"
          >
            Most Impressive
          </div>
          <div v-else @click="mostImpressiveClick()" class="filterOptionOne">
            Most Impressive
          </div>
          <div
            v-if="filterBy.funniest"
            @click="funniestClick()"
            class="selectedFilterOptionOne"
          >
            Funniest
          </div>
          <div v-else @click="funniestClick()" class="filterOptionOne">
            Funniest
          </div>
          <div
            v-if="filterBy.bestDiscussion"
            @click="bestDiscussionClick()"
            class="selectedFilterOptionOne"
          >
            Best Discussion
          </div>
          <div v-else @click="bestDiscussionClick()" class="filterOptionOne">
            Best Discussion
          </div>
        </div>
        <div class="filterTitle">Timeframe</div>
        <div class="filterOptionsSetTwo">
          <div
            v-if="filterBy.default"
            @click="defaultClick()"
            class="selectedFilterOptionTwo"
          >
            Default
          </div>
          <div v-else @click="defaultClick()" class="filterOptionTwo">
            Default
          </div>
          <div
            v-if="filterBy.pastDay"
            @click="pastDayClick()"
            class="selectedFilterOptionTwo"
          >
            Past Day
          </div>
          <div v-else @click="pastDayClick()" class="filterOptionTwo">
            Past Day
          </div>
          <div
            v-if="filterBy.pastWeek"
            @click="pastWeekClick()"
            class="selectedFilterOptionTwo"
          >
            Past Week
          </div>
          <div v-else @click="pastWeekClick()" class="filterOptionTwo">
            Past Week
          </div>
          <div
            v-if="filterBy.pastMonth"
            @click="pastMonthClick()"
            class="selectedFilterOptionTwo"
          >
            Past Month
          </div>
          <div v-else @click="pastMonthClick()" class="filterOptionTwo">
            Past Month
          </div>
          <div
            v-if="filterBy.pastYear"
            @click="pastYearClick()"
            class="selectedFilterOptionTwo"
          >
            Past Year
          </div>
          <div v-else @click="pastYearClick()" class="filterOptionTwo">
            Past Year
          </div>
          <div
            v-if="filterBy.allTime"
            @click="allTimeClick()"
            class="selectedFilterOptionTwo"
          >
            All Time
          </div>
          <div v-else @click="allTimeClick()" class="filterOptionTwo">
            All Time
          </div>
        </div>
      </div>
      <v-row justify="center" class="text-center">
        <v-col class="mb-5 profileColumn" cols="6">
          <div class="profileDiv">
            <div v-if="userProfile" class="profileUsername">
              <p class="profileUsernameText">
                {{ userProfile.Username }}
              </p>
            </div>
            <div class="userHeader">
              <div v-if="userProfile" class="profileUser">
                <img
                  class="userImage"
                  contain
                  :src="require(`../assets/images/${userProfile.IconFilepath}`)"
                />
              </div>
              <div v-if="userProfile" class="profileUserBadges">
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
                <v-btn
                  @click="userLoggedInCheck()"
                  color="#40a0e0"
                  class="userActionButton"
                  >Gift</v-btn
                >
                <v-btn
                  @click="userLoggedInCheck()"
                  color="#40a0e0"
                  class="userActionButton"
                  >Link Up</v-btn
                >
                <v-btn
                  v-if="userProfile.Followed"
                  @click="userLoggedInCheck()"
                  color="#40a0e0"
                  class="userActionButton"
                  >Unfollow</v-btn
                >
                <v-btn
                  v-else
                  @click="userLoggedInCheck()"
                  color="#40a0e0"
                  class="userActionButton"
                  >Follow</v-btn
                >
              </div>
            </div>
            <div v-if="userProfile" class="userInfoDiv">
              <div class="userInfoSection">
                {{ userProfile.FollowerCount }} followers
              </div>
              <div class="userInfoSection">
                {{ userProfile.ClipsCount }} clips
              </div>
              <div class="userInfoSection">
                Joined {{ userProfile.DisplayDate }}
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" class="text-center">
        <v-col class="mb-5" cols="6">
          <div class="clipsFromDiv">
            <div v-if="userProfile" class="clipsProfile">
              <p class="clipsProfileText">
                Clips from {{ userProfile.Username }}
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" class="text-center">
        <v-col class="mb-5" cols="6">
          <div v-for="clip in clipsForUser" :key="clip.ClipId">
            <ClipPlayer :clip="clip" :userData="userData" />
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
  props: ["user", "username"],
  data: () => ({
    serverUrl: appConfig.SERVER_URL,
    userData: undefined,
    clipsForUser: [],
    userProfile: "",
    filterBy: {
      mostPopular: true,
      mostImpressive: false,
      funniest: false,
      bestDiscussion: false,
      default: true,
      pastDay: false,
      pastWeek: false,
      pastMonth: false,
      pastYear: false,
      allTime: false,
    },
  }),
  methods: {
    clearFilterByType: function () {
      this.filterBy.mostPopular = false;
      this.filterBy.mostImpressive = false;
      this.filterBy.funniest = false;
      this.filterBy.bestDiscussion = false;
    },
    mostPopularClick: function () {
      if (!this.filterBy.mostPopular) {
        this.clearFilterByType();
        this.filterBy.mostPopular = true;
      }
    },
    mostImpressiveClick: function () {
      if (!this.filterBy.mostImpressive) {
        this.clearFilterByType();
        this.filterBy.mostImpressive = true;
      }
    },
    funniestClick: function () {
      if (!this.filterBy.funniest) {
        this.clearFilterByType();
        this.filterBy.funniest = true;
      }
    },
    bestDiscussionClick: function () {
      if (!this.filterBy.bestDiscussion) {
        this.clearFilterByType();
        this.filterBy.bestDiscussion = true;
      }
    },
    clearFilterByTimeframe: function () {
      this.filterBy.default = false;
      this.filterBy.pastDay = false;
      this.filterBy.pastWeek = false;
      this.filterBy.pastMonth = false;
      this.filterBy.pastYear = false;
      this.filterBy.allTime = false;
    },
    defaultClick: function () {
      if (!this.filterBy.default) {
        this.clearFilterByTimeframe();
        this.filterBy.default = true;
      }
    },
    pastDayClick: function () {
      if (!this.filterBy.pastDay) {
        this.clearFilterByTimeframe();
        this.filterBy.pastDay = true;
      }
    },
    pastWeekClick: function () {
      if (!this.filterBy.pastWeek) {
        this.clearFilterByTimeframe();
        this.filterBy.pastWeek = true;
      }
    },
    pastMonthClick: function () {
      if (!this.filterBy.pastMonth) {
        this.clearFilterByTimeframe();
        this.filterBy.pastMonth = true;
      }
    },
    pastYearClick: function () {
      if (!this.filterBy.pastYear) {
        this.clearFilterByTimeframe();
        this.filterBy.pastYear = true;
      }
    },
    allTimeClick: function () {
      if (!this.filterBy.allTime) {
        this.clearFilterByTimeframe();
        this.filterBy.allTime = true;
      }
    },
    userLoggedInCheck: function () {
      if (this.user.loggedIn) {
        return true;
      } else {
        let self = this;
        let message = "You must be logged in to perform this action.";
        let options = {
          html: false,
          loader: false,
          reverse: false,
          okText: "Log In",
          cancelText: "OK",
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
            self.$router.push({ path: "/login" });
          })
          .catch(function () {
            // Placeholder
          });

        return false;
      }
    },
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
          profileName: vm.username,
        },
      }).then(function (response) {
        vm.clipsForUser = response.data;
        vm.userProfile = response.data[0].UserProfile;
      });
    },
  },
  beforeMount: function () {
    this.getPageContents();
  },
  mounted: function () {
    this.userData = this.user;
  },
};
</script>

<style scoped src='../assets/styles/profile.css'></style>