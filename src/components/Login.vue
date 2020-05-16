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
import privateConfig from "./config/private.config";

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
      } else if (password.length < 6) {
        this.loginMessage = "Password must be more than 6 characters";
      } else {
        this.serverLogin(userId, password).then(data => {
          if (data.success) {
            this.clearEntries();
            this.$emit("userLogin", data.message);
            this.$router.push("browse");
          } else {
            this.loginMessage = data.message;
          }
        });
      }
    },
    serverLogin: function(userId, password) {
      return axios
        .post(this.serverUrl + "/login", {
          auth: {
            userId: userId,
            password: password
          }
        })
        .then(function(response) {
          return response.data;
        });
    },
    forgotPassword: function(userId) {
      if (userId.length <= 0) {
        this.loginMessage = "Please enter an email or username";
      } else if (/\s/.test(userId)) {
        this.loginMessage = "Email or username can not include spaces";
      } else {
        this.serverForgotPassword(userId).then(data => {
          if (data.success) {
            this.loginMessage = "An email was sent to " + data.emailForgot;
          } else {
            this.loginMessage = "Email or username was incorrect";
          }
        });
      }
    },
    serverForgotPassword: function(userId) {
      return axios
        .post(this.serverUrl + "/forgotPassword", {
          auth: {
            userId: userId
          }
        })
        .then(function(response) {
          return response.data;
        });
    },
    clearEntries: function() {
      this.userIdLogin = "";
      this.passwordLogin = "";
      this.loginMessage = "";
    }
  }
};
</script>

<style scoped src='../assets/styles/loginSignup.css'></style>