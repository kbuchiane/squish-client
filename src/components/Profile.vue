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
            <div class="profileUsername">
              <p class="profileUsernameText">
                {{ userProfile.username }}
              </p>
            </div>
            <div class="userHeader">
              <div class="profileUser">
                <img class="userImage" contain :src="userProfile.image" />
              </div>
              <div class="profileUserBadges">
                <div class="topLeftBadge">
                  <v-img
                    class="leftBadgeImage"
                    contain
                    :src="userProfile.badges.badgeOne"
                  />
                </div>
                <div class="topRightBadge">
                  <v-img
                    class="rightBadgeImage"
                    contain
                    :src="userProfile.badges.badgeTwo"
                  />
                </div>
                <div class="bottomLeftBadge">
                  <v-img
                    class="leftBadgeImage"
                    contain
                    :src="userProfile.badges.badgeThree"
                  />
                </div>
                <div class="bottomRightBadge">
                  <v-img
                    class="rightBadgeImage"
                    contain
                    :src="userProfile.badges.badgeFour"
                  />
                </div>
              </div>
              <div class="profileUserActions">
                <v-btn color="#40a0e0" class="userActionButton">Gift</v-btn>
                <v-btn color="#40a0e0" class="userActionButton">Link Up</v-btn>
                <v-btn
                  v-if="userProfile.followed"
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
                {{ userProfile.followerCount }} followers
              </div>
              <div class="userInfoSection">
                {{ userProfile.clipsCount }} clips
              </div>
              <div class="userInfoSection">
                Joined {{ userProfile.joinedDate }}
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
                Clips from {{ userProfile.username }}
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" class="text-center">
        <v-col class="mb-5" cols="6">
          <div v-for="clip in clips" :key="clip.id">
            <ClipPlayer
              v-if="clip.userProfile.username === userProfile.username"
              :clip="clip"
            />
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
  props: ["userProfile"],
  data: () => ({
    serverUrl: appConfig.SERVER_URL,
    clips: [
      {
        id: "1",
        type: "video/mp4",
        src: require("../assets/videos/snipe1.mp4"),
        poster: require("../assets/images/snipe1poster.png"),
        title: "Later, GrndpaGaming",
        datePosted: "Dec 22, 2020",
        userProfile: {
          username: "JackiePrince",
          joinedDate: "Dec 24, 2020",
          image: require("../assets/images/crown.png"),
          followed: true,
          followerCount: "346M",
          clipsCount: "54",
          badges: {
            badgeOne: require("../assets/images/badge1.png"),
            badgeTwo: require("../assets/images/badge2.png"),
            badgeThree: require("../assets/images/badge3.png"),
            badgeFour: require("../assets/images/badge4.png"),
          },
        },
        game: {
          id: "1",
          title: "PLAYERUNKNOWN's BATTLEGROUNDS",
          icon: require("../assets/images/pubg.png"),
          releaseDate: "Dec 2017",
          followed: true,
          followerCount: "84k",
          clipsTodayCount: "32k",
          clipsAllTimeCount: "456k",
          tags: ["Battle Royale", "Shooter"],
        },
        liked: true,
        userImage: require("../assets/images/crown.png"),
        badgeOne: require("../assets/images/badge1.png"),
        badgeTwo: require("../assets/images/badge2.png"),
        badgeThree: require("../assets/images/badge3.png"),
        badgeFour: require("../assets/images/badge4.png"),
        impressiveLiked: true,
        impressiveCount: "70.9k",
        funnyLiked: false,
        funnyCount: "12.4k",
        discussionLiked: true,
        discussionCount: "30.6k",
        viewCount: "8.64M",
        likeCount: "1.21M",
        commentCount: "7",
        comments: [
          {
            commentId: "1",
            username: "JackiePrince",
            text: "Wow, this is the best clip I've ever seen!",
            date: "Dec 25, 2020",
            liked: true,
            likes: "203k",
            comments: [
              {
                commentId: "2",
                username: "Jon",
                text: "You're a scrub.",
                date: "Dec 25, 2020",
                liked: false,
                likes: "0",
                comments: [
                  {
                    commentId: "3",
                    username: "JackiePrince",
                    text: "No u.",
                    date: "Dec 25, 2020",
                    liked: true,
                    likes: "5.2M",
                    comments: [],
                  },
                  {
                    commentId: "4",
                    username: "shroud",
                    text:
                      "Harsh. Jackie would beat me in a 1v1 99 times out of 100.",
                    date: "Dec 25, 2020",
                    liked: true,
                    likes: "103.5k",
                    comments: [],
                  },
                ],
              },
              {
                commentId: "5",
                username: "Jack",
                text: "Lame. Play Astrofire.",
                date: "Dec 25, 2020",
                liked: false,
                likes: "1",
                comments: [],
              },
            ],
          },
          {
            commentId: "6",
            username: "chocoTaco",
            text: "OMG",
            date: "Dec 26, 2020",
            liked: true,
            likes: "17k",
            comments: [],
          },
          {
            commentId: "7",
            username: "GrndpaGaming",
            text: "Reported.",
            date: "Dec 27, 2020",
            liked: false,
            likes: "0",
            comments: [],
          },
        ],
      },
      {
        id: "2",
        type: "video/mp4",
        src: require("../assets/videos/snipe2.mp4"),
        poster: require("../assets/images/snipe2poster.png"),
        title: "Destroying A Bot",
        datePosted: "Dec 20, 2020",
        userProfile: {
          username: "SomeoneElse",
          joinedDate: "Dec 24, 2020",
          image: require("../assets/images/crown.png"),
          followed: false,
          followerCount: "346M",
          clipsCount: "54",
          badges: {
            badgeOne: require("../assets/images/badge1.png"),
            badgeTwo: require("../assets/images/badge2.png"),
            badgeThree: require("../assets/images/badge3.png"),
            badgeFour: require("../assets/images/badge4.png"),
          },
        },
        game: {
          id: "1",
          title: "PLAYERUNKNOWN's BATTLEGROUNDS",
          icon: require("../assets/images/pubg.png"),
          releaseDate: "Dec 2017",
          followed: false,
          followerCount: "84k",
          clipsTodayCount: "32k",
          clipsAllTimeCount: "456k",
          tags: ["Battle Royale", "Shooter"],
        },
        liked: false,
        userImage: require("../assets/images/crown.png"),
        badgeOne: require("../assets/images/badge1.png"),
        badgeTwo: require("../assets/images/badge2.png"),
        badgeThree: require("../assets/images/badge3.png"),
        badgeFour: require("../assets/images/badge4.png"),
        impressiveLiked: false,
        impressiveCount: "10.8k",
        funnyLiked: true,
        funnyCount: "5005",
        discussionLiked: false,
        discussionCount: "36.3k",
        viewCount: "903.23k",
        likeCount: "133.7k",
        commentCount: "98.9k",
        comments: [],
      },
    ],
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
  },
};
</script>

<style scoped src='../assets/styles/profile.css'></style>