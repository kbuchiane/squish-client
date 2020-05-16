<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5 logSignColumn" cols="12">
        <h2 class="headline font-weight-bold mb-3 noselect">Sign Up</h2>
        <p></p>
        <v-row justify="center">
          <input
            v-model="usernameSignup"
            v-on:keyup.enter="signup(usernameSignup, emailSignup, passwordSignup, passwordConfirmSignup)"
            placeholder="Username"
            class="logSignTextBox"
          />
        </v-row>
        <p></p>
        <v-row justify="center">
          <input
            v-model="emailSignup"
            v-on:keyup.enter="signup(usernameSignup, emailSignup, passwordSignup, passwordConfirmSignup)"
            placeholder="Email"
            class="logSignTextBox"
          />
        </v-row>
        <p></p>
        <v-row justify="center">
          <input
            v-model="passwordSignup"
            v-on:keyup.enter="signup(usernameSignup, emailSignup, passwordSignup, passwordConfirmSignup)"
            placeholder="Password"
            class="logSignTextBox"
            type="password"
          />
        </v-row>
        <p></p>
        <v-row justify="center">
          <input
            v-model="passwordConfirmSignup"
            v-on:keyup.enter="signup(usernameSignup, emailSignup, passwordSignup, passwordConfirmSignup)"
            placeholder="Confirm Password"
            class="logSignTextBox"
            type="password"
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
            to="/verifyemail"
            color="orange"
            class="logsignButton"
          >I Already Have a Verification Code</v-btn>
        </v-row>
        <p></p>
        <v-row justify="center">
          <p class="logSignMessage noselect">{{ signupMessage }}</p>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import privateConfig from "../config/private.config";

export default {
  name: "Signup",
  data: () => ({
    serverUrl: privateConfig.SERVER_URL,
    usernameSignup: "",
    emailSignup: "",
    passwordSignup: "",
    passwordConfirmSignup: "",
    signupMessage: ""
  }),
  methods: {
    signup: function(username, email, password, passwordConfirm) {
      username = username.trim();
      email = email.trim();
      if (username.length <= 0) {
        this.signupMessage = "Please enter a username";
      } else if (/\s/.test(username)) {
        this.signupMessage = "Username can not include spaces";
      } else if (!/^[a-z0-9]+$/i.test(username)) {
        this.signupMessage = "Username can not include special characters";
      } else if (username.length > 45) {
        this.signupMessage = "Username can not exceed 45 characters";
      } else if (email.length <= 0) {
        this.signupMessage = "Please enter an email";
      } else if (/\s/.test(email)) {
        this.signupMessage = "Email can not include spaces";
      } else if (email.length > 255) {
        this.signupMessage = "Email can not exceed 255 characters";
      } else if (password.length < 6) {
        this.signupMessage = "Password must be more than 6 characters";
      } else if (password != passwordConfirm) {
        this.signupMessage = "Passwords do not match, please try again";
      } else {
        this.serverSignup(username, email, password).then(data => {
          if (data.success) {
            this.clearEntries();

            var verifyData = {
              email: email,
              message: data.message
            };

            this.$emit("userVerify", verifyData);
            this.$router.push("verifyemail");
          } else {
            this.signupMessage = data.message;
          }
        });
      }
    },
    serverSignup: function(username, email, password) {
      return axios
        .post(this.serverUrl + "/signup", {
          auth: {
            username: username,
            email: email,
            password: password
          }
        })
        .then(function(response) {
          return response.data;
        });
    },
    clearEntries: function() {
      this.usernameSignup = "";
      this.emailSignup = "";
      this.passwordSignup = "";
      this.passwordConfirmSignup = "";
      this.signupMessage = "";
    }
  }
};
</script>

<style scoped src='../assets/styles/loginSignup.css'></style>