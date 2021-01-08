<template>
  <v-container>
    <div v-if="!selectedGame" class="notFoundDiv">
      <p class="notFoundText">The game could not be found.</p>
      <v-btn @click="$router.push('/browse')" color="#40a0e0" class="backButton"
        >Back To Browse</v-btn
      >
    </div>
    <div v-else>
      <div class="filter">
        <div class="filterTitle">Filter Clips By</div>
        <div class="filterOptionsSetOne">
          <div class="selectedFilterOption">Most Popular</div>
          <div class="filterOption">Followed Users Only</div>
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
        <v-col class="mb-5 gameColumn" cols="6">
          <div class="gameDiv">
            <div class="gameTitle">
              <p class="gameTitleText">
                <router-link to="/game" class="routerStyle">
                  {{ selectedGame.title }}
                </router-link>
              </p>
            </div>
            <div class="gameReleaseDate">
              Release Date {{ selectedGame.releaseDate }}
            </div>
            <div class="gameHeader">
              <div class="gameImageDiv">
                <router-link to="/game">
                  <img class="gameImage" contain :src="selectedGame.icon" />
                </router-link>
              </div>
              <div class="gameTags">
                <p v-for="tag in selectedGame.tags" :key="tag" class="gameTag">
                  {{ tag }}
                </p>
              </div>
              <div class="gameUserActions">
                <v-btn color="#40a0e0" class="userActionButton">Follow</v-btn>
              </div>
            </div>
            <div class="gameInfoDiv">
              <div class="gameInfoSection">
                {{ selectedGame.followerCount }} followers
              </div>
              <div class="gameInfoSection">
                {{ selectedGame.clipsTodayCount }} new clips today
              </div>
              <div class="gameInfoSection">
                {{ selectedGame.clipsAllTimeCount }} clips all time
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" class="text-center">
        <v-col class="mb-5" cols="6">
          <div class="clipsFromDiv">
            <div class="clipsSingleGame">
              <p class="clipsSingleGameText">
                Clips from {{ selectedGame.title }}
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" class="text-center">
        <v-col class="mb-5" cols="6">
          <div v-for="clip in clips" :key="clip.id">
            <ClipPlayer
              v-if="clip.game.title === selectedGame.title"
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
  name: "BrowseGames",
  components: {
    ClipPlayer,
  },
  props: ["selectedGame"],
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
        game: {},
        liked: true,
        userImage: require("../assets/images/crown.png"),
        badgeOne: require("../assets/images/badge1.png"),
        badgeTwo: require("../assets/images/badge2.png"),
        badgeThree: require("../assets/images/badge3.png"),
        badgeFour: require("../assets/images/badge4.png"),
        impressiveCount: "70.9k",
        funnyCount: "12.4k",
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
                    liked: false,
                    likes: "5.2M",
                    comments: [],
                  },
                  {
                    commentId: "4",
                    username: "shroud",
                    text:
                      "Harsh. Jackie would beat me in a 1v1 99 times out of 100.",
                    date: "Dec 25, 2020",
                    liked: false,
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
            liked: false,
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
        game: {},
        liked: false,
        userImage: require("../assets/images/crown.png"),
        badgeOne: require("../assets/images/badge1.png"),
        badgeTwo: require("../assets/images/badge2.png"),
        badgeThree: require("../assets/images/badge3.png"),
        badgeFour: require("../assets/images/badge4.png"),
        impressiveCount: "10.8k",
        funnyCount: "5005",
        discussionCount: "36.3k",
        viewCount: "903.23k",
        likeCount: "133.7k",
        commentCount: "98.9k",
        comments: [],
      },
    ],
  }),
  mounted: function () {
    // Like many other things, this will be removed when we actually pull data
    for (let i in this.clips) {
      this.clips[i].game = this.selectedGame;
    }
  },
};
</script>

<style scoped src='../assets/styles/singleGame.css'></style>