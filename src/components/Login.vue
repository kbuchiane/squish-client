<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5 logSignColumn" cols="12">
        <h2 class="headline font-weight-bold mb-3 noselect">Log In</h2>
        <p></p>
        <v-row justify="center">
          <input v-model="userIdLogin" placeholder="Username or Email" class="logSignTextBox" />
        </v-row>
        <p></p>
        <v-row justify="center">
          <input
            v-model="passwordLogin"
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

export default {
  name: "Login",
  data: () => ({
    serverUrl: "http://localhost:3000",
    userIdLogin: "",
    passwordLogin: "",
    loginMessage: ""
  }),
  methods: {
    login: function(userIdLogin, passwordLogin) {
      if (userIdLogin.length <= 0) {
        this.loginMessage = "Please enter a username or email";
      } else if (/\s/.test(userIdLogin)) {
        this.loginMessage = "Username can not include spaces";
      } else if (passwordLogin.length < 6) {
        this.loginMessage = "Password must be more than 6 characters";
      } else {
        this.serverLogin(userIdLogin, passwordLogin).then(data => {
          if (data.success) {
            this.clearEntries();
            this.$emit("userLogin", data.user.username);
            this.$router.push("browse");
          } else {
            this.loginMessage = data.message;
          }
        });
      }
    },
    serverLogin: function(username, password) {
      return axios
        .get(this.serverUrl + "/login", {
          params: {
            username: username,
            password: password
          }
        })
        .then(function(response) {
          return response.data;
        });
    },
    forgotPassword: function(userIdForgot) {
      if (userIdForgot.length <= 0) {
        this.loginMessage = "Please enter a username or email";
      } else if (/\s/.test(userIdForgot)) {
        this.loginMessage = "Username or email can not include spaces";
      } else {
        this.serverForgotPassword(userIdForgot).then(data => {
          if (data.success) {
            this.loginMessage = "An email was sent to " + data.emailForgot;
          } else {
            this.loginMessage = "Username or email was incorrect";
          }
        });
      }
    },
    serverForgotPassword: function(userIdForgot) {
      return axios
        .get(this.serverUrl + "/forgotPassword", {
          params: {
            userIdForgot: userIdForgot
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