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
              v-if="clip.username === userProfile.username"
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
        username: "JackiePrince",
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
          username: "JackiePrince",
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
        username: "SomeoneElse",
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
  }),
};
</script>

<style scoped src='../assets/styles/profile.css'></style>