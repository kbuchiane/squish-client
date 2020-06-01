<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5 logSignColumn" cols="12">
        <h2 class="headline font-weight-bold mb-3 noselect">Log In</h2>
        <p></p>
        <v-row justify="center">
          <input
            v-model="userIdLogin"
            v-on:keyup.enter="login(userIdLogin, passwordLogin)"
            placeholder="Username or Email"
            class="logSignTextBox"
            ref="userIdInput"
          />
        </v-row>
        <p></p>
        <v-row justify="center">
          <input
            v-model="passwordLogin"
            v-on:keyup.enter="login(userIdLogin, passwordLogin)"
            placeholder="Password"
            class="logSignTextBox"
            type="password"
          />
        </v-row>
        <p></p>
        <v-row justify="center">
          <v-btn
            @click="login(userIdLogin, passwordLogin)"
            color="green"
            class="logsignButton"
          >Log In</v-btn>
        </v-row>
        <p></p>
        <v-row justify="center">
          <v-btn
            @click="forgotPassword(userIdLogin)"
            color="orange"
            class="logsignButton"
          >Forgot Password</v-btn>
        </v-row>
        <p></p>
        <v-row justify="center">
          <p class="logSignMessage noselect">{{ loginMessage }}</p>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import privateConfig from "../config/private.config";
import publicConfig from "../config/public.config";
import cookieUtil from "../utils/cookie.util";

export default {
  name: "Login",
  data: () => ({
    serverUrl: privateConfig.SERVER_URL,
    userIdLogin: "",
    passwordLogin: "",
    loginMessage: ""
  }),
  methods: {
    login: function(userId, password) {
      userId = userId.trim();
      if (userId.length <= 0) {
        this.loginMessage = "Please enter an email or username";
      } else if (/\s/.test(userId)) {
        this.loginMessage = "Email or username can not include spaces";
      } else if (userId.length > 255) {
        this.loginMessage = "Email or username can not exceed 255 characters";
      } else if (userId.includes(":")) {
        this.loginMessage = "Email or username can not include ':'";
      } else if (password.length < 6) {
        this.loginMessage = "Password must be more than 6 characters";
      } else if (password.includes(":")) {
        this.loginMessage = "Password can not include ':'";
      } else {
        this.serverLogin(userId, password).then(response => {
          if (response.status === 200) {
            if (
              response.data.accessToken &&
              cookieUtil.cookieExists(publicConfig.REFRESH_TOKEN)
            ) {
              this.clearEntries();
              this.$emit(
                "userLogin",
                response.data.accessToken,
                response.data.username
              );

              this.$router.push("browse");
            } else {
              this.loginMessage = "Unable to log in, please try again";
            }
          } else {
            this.loginMessage = response.data.message;
          }
        });
      }
    },
    serverLogin: function(userId, password) {
      return axios
        .post(
          this.serverUrl + "/login",
          {},
          {
            auth: {
              username: userId,
              password: password
            },
            withCredentials: true
          }
        )
        .then(function(response) {
          return response;
        })
        .catch(error => {
          return error.response;
        });
    },
    forgotPassword: function(userId) {
      if (userId.length <= 0) {
        this.loginMessage = "Please enter an email or username";
      } else if (/\s/.test(userId)) {
        this.loginMessage = "Email or username can not include spaces";
      } else if (userId.includes(":")) {
        this.loginMessage = "Email or username can not include ':'";
      } else {
        this.serverForgotPassword(userId).then(response => {
          if (response.status === 200) {
            this.loginMessage = "An email was sent to " + response.data.message;
          } else {
            this.loginMessage = "Email or username was incorrect";
          }
        });
      }
    },
    serverForgotPassword: function(userId) {
      return axios
        .post(
          this.serverUrl + "/forgotPassword",
          {},
          {
            auth: {
              username: userId
            }
          }
        )
        .then(function(response) {
          return response;
        })
        .catch(error => {
          return error.response;
        });
    },
    clearEntries: function() {
      this.userIdLogin = "";
      this.passwordLogin = "";
      this.loginMessage = "";
    }
  },
  mounted: function() {
    this.$refs.userIdInput.focus();
  }
};
</script>

<style scoped src='../assets/styles/loginSignup.css'></style>