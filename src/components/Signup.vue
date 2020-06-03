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
            ref="usernameInput"
          />
        </v-row>
        <p></p>
        <v-row justify="center">
          <input
            v-model="emailSignup"
            v-on:keyup.enter="signup(usernameSignup, emailSignup, passwordSignup, passwordConfirmSignup)"
            placeholder="Email"
            class="logSignTextBox"
            type="email"
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
import appConfig from "../config/app.config";
import userEntryUtil from "../utils/userEntry.util";

export default {
  name: "Signup",
  data: () => ({
    serverUrl: appConfig.SERVER_URL,
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
      let usernameMessage = userEntryUtil.checkUsername(username);
      let emailMessage = userEntryUtil.checkEmail(email);
      let passwordMessage = userEntryUtil.checkPassword(password);

      if (usernameMessage) {
        this.signupMessage = usernameMessage;
      } else if (emailMessage) {
        this.signupMessage = emailMessage;
      } else if (passwordMessage) {
        this.signupMessage = passwordMessage;
      } else if (password != passwordConfirm) {
        this.signupMessage = "Passwords do not match, please try again";
      } else {
        this.serverSignup(username, email, password).then(response => {
          if (response.status === 200) {
            this.clearEntries();

            var verifyData = {
              email: email,
              message: response.data.message
            };

            this.$emit("userVerify", verifyData);
            this.$router.push("verifyemail");
          } else {
            this.signupMessage = response.data.message;
          }
        });
      }
    },
    serverSignup: function(username, email, password) {
      return axios
        .post(
          this.serverUrl + "/signup",
          {
            email: email
          },
          {
            auth: {
              username: username,
              password: password
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
      this.usernameSignup = "";
      this.emailSignup = "";
      this.passwordSignup = "";
      this.passwordConfirmSignup = "";
      this.signupMessage = "";
    }
  },
  mounted: function() {
    this.$refs.usernameInput.focus();
  }
};
</script>

<style scoped src='../assets/styles/loginSignup.css'></style>