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
            v-if="filters.MostPopular"
            @click="mostPopularClick()"
            class="selectedFilterOptionOne"
          >
            Most Popular
          </div>
          <div v-else @click="mostPopularClick()" class="filterOptionOne">
            Most Popular
          </div>
          <div
            v-if="filters.MostImpressive"
            @click="mostImpressiveClick()"
            class="selectedFilterOptionOne"
          >
            Most Impressive
          </div>
          <div v-else @click="mostImpressiveClick()" class="filterOptionOne">
            Most Impressive
          </div>
          <div
            v-if="filters.Funniest"
            @click="funniestClick()"
            class="selectedFilterOptionOne"
          >
            Funniest
          </div>
          <div v-else @click="funniestClick()" class="filterOptionOne">
            Funniest
          </div>
          <div
            v-if="filters.BestDiscussion"
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
            v-if="timeframes.Day"
            @click="pastDayClick()"
            class="selectedFilterOptionTwo"
          >
            Past Day
          </div>
          <div v-else @click="pastDayClick()" class="filterOptionTwo">
            Past Day
          </div>
          <div
            v-if="timeframes.Week"
            @click="pastWeekClick()"
            class="selectedFilterOptionTwo"
          >
            Past Week
          </div>
          <div v-else @click="pastWeekClick()" class="filterOptionTwo">
            Past Week
          </div>
          <div
            v-if="timeframes.Month"
            @click="pastMonthClick()"
            class="selectedFilterOptionTwo"
          >
            Past Month
          </div>
          <div v-else @click="pastMonthClick()" class="filterOptionTwo">
            Past Month
          </div>
          <div
            v-if="timeframes.Year"
            @click="pastYearClick()"
            class="selectedFilterOptionTwo"
          >
            Past Year
          </div>
          <div v-else @click="pastYearClick()" class="filterOptionTwo">
            Past Year
          </div>
          <div
            v-if="timeframes.All"
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
    filters: {
      MostPopular: true,
      MostImpressive: false,
      Funniest: false,
      BestDiscussion: false,
    },
    timeframes: {
      Day: false,
      Week: false,
      Month: false,
      Year: false,
      All: true,
    },
  }),
  methods: {
    clearFilters: function () {
      this.filters.MostPopular = false;
      this.filters.MostImpressive = false;
      this.filters.Funniest = false;
      this.filters.BestDiscussion = false;
    },
    mostPopularClick: function () {
      if (!this.filters.MostPopular) {
        this.clearFilters();
        this.filters.MostPopular = true;
        this.getPageContents();
      }
    },
    mostImpressiveClick: function () {
      if (!this.filters.MostImpressive) {
        this.clearFilters();
        this.filters.MostImpressive = true;
        this.getPageContents();
      }
    },
    funniestClick: function () {
      if (!this.filters.Funniest) {
        this.clearFilters();
        this.filters.Funniest = true;
        this.getPageContents();
      }
    },
    bestDiscussionClick: function () {
      if (!this.filters.BestDiscussion) {
        this.clearFilters();
        this.filters.BestDiscussion = true;
        this.getPageContents();
      }
    },
    clearTimeframes: function () {
      this.timeframes.Day = false;
      this.timeframes.Week = false;
      this.timeframes.Month = false;
      this.timeframes.Year = false;
      this.timeframes.All = false;
    },
    pastDayClick: function () {
      if (!this.timeframes.Day) {
        this.clearTimeframes();
        this.timeframes.Day = true;
        this.getPageContents();
      }
    },
    pastWeekClick: function () {
      if (!this.timeframes.Week) {
        this.clearTimeframes();
        this.timeframes.Week = true;
        this.getPageContents();
      }
    },
    pastMonthClick: function () {
      if (!this.timeframes.Month) {
        this.clearTimeframes();
        this.timeframes.Month = true;
        this.getPageContents();
      }
    },
    pastYearClick: function () {
      if (!this.timeframes.Year) {
        this.clearTimeframes();
        this.timeframes.Year = true;
        this.getPageContents();
      }
    },
    allTimeClick: function () {
      if (!this.timeframes.Al) {
        this.clearTimeframes();
        this.timeframes.All = true;
        this.getPageContents();
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
      let filter = this.getFilter();
      let timeframe = this.getTimeframe();

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
          filter: filter,
          timeframe: timeframe,
        },
      }).then(function (response) {
        vm.clipsForUser = response.data;
        vm.userProfile = response.data[0].UserProfile;
      });
    },
    getFilter: function () {
      let filter = "MostPopular";

      if (this.filters.MostImpressive) {
        filter = "MostImpressive";
      } else if (this.filters.Funniest) {
        filter = "Funniest";
      } else if (this.filters.BestDiscussion) {
        filter = "BestDiscussion";
      }

      return filter;
    },
    getTimeframe: function () {
      let timeframe = "All";

      if (this.timeframes.Day) {
        timeframe = "Day";
      } else if (this.timeframes.Week) {
        timeframe = "Week";
      } else if (this.timeframes.Month) {
        timeframe = "Month";
      } else if (this.timeframes.Year) {
        timeframe = "Year";
      }

      return timeframe;
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