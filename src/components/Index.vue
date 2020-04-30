<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200" />
      </v-col>

      <v-col class="mb-4" cols="12">
        <h1 class="display-2 font-weight-bold mb-3 noselect">Squish</h1>
      </v-col>

      <v-col class="mb-5 loginColumn" cols="6">
        <h2 class="headline font-weight-bold mb-3 noselect">Log In</h2>
        <p></p>

        <v-row justify="center">
          <input v-model="userIdLogin" placeholder="Username or Email" class="indexTextBox" />
        </v-row>
        <p></p>
        <v-row justify="center">
          <input v-model="passwordLogin" placeholder="Password" class="indexTextBox" />
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
          <p class="indexMessage noselect">{{ loginMessage }}</p>
        </v-row>
      </v-col>

      <v-col class="mb-5 signupColumn" cols="6">
        <div v-if="!verifyStep">
          <h2 class="headline font-weight-bold mb-3 noselect">Sign Up</h2>
          <p></p>
          <v-row justify="center">
            <input v-model="usernameSignup" placeholder="Username" class="indexTextBox" />
          </v-row>
          <p></p>
          <v-row justify="center">
            <input v-model="emailSignup" placeholder="Email" class="indexTextBox" />
          </v-row>
          <p></p>
          <v-row justify="center">
            <input v-model="passwordSignup" placeholder="Password" class="indexTextBox" />
          </v-row>
          <p></p>
          <v-row justify="center">
            <input
              v-model="passwordConfirmSignup"
              placeholder="Confirm Password"
              class="indexTextBox"
            />
          </v-row>
          <p></p>
          <v-row justify="center">
            <v-btn
              @click="signup(usernameSignup, emailSignup, passwordSignup, passwordConfirmSignup)"
              color="green"
              class="logsignButton"
            >Sign Up</v-btn>
          </v-row>
          <p></p>
          <v-row justify="center">
            <v-btn
              @click="verifyStep = true; verificationCode = ''"
              color="orange"
              class="logsignButton"
            >I Already Have a Verification Code</v-btn>
          </v-row>
          <p></p>
          <v-row justify="center">
            <p class="indexMessage noselect">{{ signupMessage }}</p>
          </v-row>
        </div>
        <div v-if="verifyStep">
          <h2 class="headline font-weight-bold mb-3 noselect">Verify Email</h2>
          <p></p>
          <v-row justify="center">
            <input v-model="emailSignup" placeholder="Email" class="indexTextBox" />
          </v-row>
          <p></p>
          <v-row justify="center">
            <input v-model="verificationCode" placeholder="Verification Code" class="indexTextBox" />
          </v-row>
          <p></p>
          <v-row justify="center">
            <v-btn
              @click="confirmUser(emailSignup, verificationCode)"
              color="green"
              class="logsignButton"
            >Verify</v-btn>
          </v-row>
          <p></p>
          <v-row justify="center">
            <v-btn
              @click="resendCode(emailSignup, verificationCode)"
              color="orange"
              class="logsignButton"
            >Resend Code</v-btn>
          </v-row>
          <p></p>
          <v-row justify="center">
            <v-btn @click="verifyStep = false" color="blue" class="logsignButton">Back To Sign Up</v-btn>
          </v-row>
          <p></p>
          <v-row justify="center">
            <p class="indexMessage noselect">{{ verifyMessage }}</p>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Index",
  data: () => ({
    serverUrl: "http://localhost:3000",
    userIdLogin: "",
    passwordLogin: "",
    usernameSignup: "",
    emailSignup: "",
    passwordSignup: "",
    passwordConfirmSignup: "",
    loginMessage: "",
    signupMessage: "",
    verifyStep: false,
    verifyMessage: "",
    verificationCode: ""
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
            this.$emit("updateUsername", data.user.username);
            this.clearEntries();
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
    forgotPassword: function(userId) {
      if (userId.length <= 0) {
        this.loginMessage = "Please enter a username or email";
      } else if (/\s/.test(userId)) {
        this.loginMessage = "Username or email can not include spaces";
      } else {
        this.serverForgotPassword(userId).then(data => {
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
    signup: function(
      usernameSignup,
      emailSignup,
      passwordSignup,
      passwordConfirmSignup
    ) {
      if (usernameSignup.length <= 0) {
        this.signupMessage = "Please enter a username";
      } else if (/\s/.test(usernameSignup)) {
        this.signupMessage = "Username can not include spaces";
      } else if (emailSignup.length <= 0) {
        this.signupMessage = "Please enter an email";
      } else if (/\s/.test(emailSignup)) {
        this.signupMessage = "Email can not include spaces";
      } else if (passwordSignup.length < 6) {
        this.signupMessage = "Password must be more than 6 characters";
      } else if (passwordSignup != passwordConfirmSignup) {
        this.signupMessage = "Passwords do not match, please try again";
      } else {
        this.serverSignup(usernameSignup, emailSignup, passwordSignup).then(
          data => {
            if (data.success) {
              this.verifyMessage = data.message;
              this.verifyStep = true;
              this.verificationCode = "";
              this.clearEntries();
            } else {
              this.signupMessage = data.message;
            }
          }
        );
      }
    },
    serverSignup: function(username, email, password) {
      return axios
        .get(this.serverUrl + "/signup", {
          params: {
            username: username,
            email: email,
            password: password
          }
        })
        .then(function(response) {
          return response.data;
        });
    },
    confirmUser: function(emailSignup, verificationCode) {
      if (emailSignup.length <= 0) {
        this.verifyMessage = "Please enter an email to be verified";
      } else if (/\s/.test(emailSignup)) {
        this.verifyMessage = "Email can not include spaces";
      } else if (verificationCode.length != 8) {
        this.verifyMessage = "Verification code should be 8 characters";
      } else {
        this.serverConfirmUser(emailSignup, verificationCode).then(data => {
          if (data.success) {
            this.clearAllEntries();
            this.$emit("updateUsername", data.user.username);
          } else {
            this.signupMessage = data.message;
          }
        });
      }
    },
    serverConfirmUser: function(email, verificationCode) {
      return axios
        .get(this.serverUrl + "/signup/confirmUser", {
          params: {
            email: email,
            confirmId: verificationCode
          }
        })
        .then(function(response) {
          return response.data;
        });
    },
    clearEntries: function() {
      this.userIdLogin = "";
      this.passwordLogin = "";
      this.usernameSignup = "";
      this.passwordSignup = "";
      this.passwordConfirmSignup = "";
      this.loginMessage = "";
      this.signupMessage = "";
    },
    clearAllEntries: function() {
      this.clearEntries();
      this.emailSignup = "";
      this.verifyMessage = "";
      this.verificationCode = "";
    }
  }
};
</script>

<style scoped src='../assets/styles/index.css'></style>