<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5 logSignColumn" cols="12">
        <h2 class="headline font-weight-bold mb-3 noselect">Sign Up</h2>
        <p></p>
        <v-row justify="center">
          <input v-model="usernameSignup" placeholder="Username" class="logSignTextBox" />
        </v-row>
        <p></p>
        <v-row justify="center">
          <input v-model="emailSignup" placeholder="Email" class="logSignTextBox" />
        </v-row>
        <p></p>
        <v-row justify="center">
          <input v-model="passwordSignup" placeholder="Password" class="logSignTextBox" />
        </v-row>
        <p></p>
        <v-row justify="center">
          <input
            v-model="passwordConfirmSignup"
            placeholder="Confirm Password"
            class="logSignTextBox"
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
            to="/verifyEmail"
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

export default {
  name: "Signup",
  data: () => ({
    serverUrl: "http://localhost:3000",
    usernameSignup: "",
    emailSignup: "",
    passwordSignup: "",
    passwordConfirmSignup: "",
    signupMessage: ""
  }),
  methods: {
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
              this.clearEntries();

              var verifyData = {
                email: emailSignup,
                message: data.message
              };

              this.$emit("userVerify", verifyData);
              this.$router.push("VerifyEmail");
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