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
            @click="resetPassword(userIdLogin)"
            color="orange"
            class="logsignButton"
          >Forgot/Reset Password</v-btn>
        </v-row>
        <p></p>
        <v-row justify="center">
          <v-btn
            to="/resetpassword"
            color="orange"
            class="logsignButton"
          >I Already Have a Password Reset Code</v-btn>
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
import appConfig from "../config/app.config";
import cookieUtil from "../utils/cookie.util";
import userEntryUtil from "../utils/userEntry.util";

export default {
  name: "Login",
  data: () => ({
    serverUrl: appConfig.SERVER_URL,
    userIdLogin: "",
    passwordLogin: "",
    loginMessage: ""
  }),
  methods: {
    login: function(userId, password) {
      userId = userId.trim();
      let userIdMessage = userEntryUtil.checkUserId(userId);
      let passwordMessage = userEntryUtil.checkPassword(password);

      if (userIdMessage) {
        this.loginMessage = userIdMessage;
      } else if (passwordMessage) {
        this.loginMessage = passwordMessage;
      } else {
        this.serverLogin(userId, password).then(response => {
          if (response.status === 200) {
            if (response.data.accessToken) {
              this.clearEntries();
              this.$emit(
                "setUserData",
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
    resetPassword: function(userId) {
      userId = userId.trim();
      let userIdMessage = userEntryUtil.checkUserId(userId);

      if (userIdMessage) {
        this.loginMessage = userIdMessage;
      } else {
        this.serverResetPassword(userId).then(response => {
          if (response.status === 200) {
            this.clearEntries();

            let resetPasswordData = {
              email: response.data.email,
              message: response.data.message
            };

            this.$emit("setResetPasswordData", resetPasswordData);
            this.$router.push("resetpassword");
          } else {
            this.loginMessage = response.data.message;
          }
        });
      }
    },
    serverResetPassword: function(userId) {
      return axios
        .post(
          this.serverUrl + "/resetPassword",
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