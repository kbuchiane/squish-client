<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5 logSignColumn" cols="12">
        <h2 class="headline font-weight-bold mb-3 noselect">Verify Email</h2>
        <p></p>
        <v-row justify="center">
          <input
            v-model="verify.email"
            v-on:keyup.enter="confirmUser(verify.email, verifyCode)"
            placeholder="Email"
            class="logSignTextBox"
          />
        </v-row>
        <p></p>
        <v-row justify="center">
          <input
            v-model="verifyCode"
            v-on:keyup.enter="confirmUser(verify.email, verifyCode)"
            placeholder="Verification Code"
            class="logSignTextBox"
          />
        </v-row>
        <p></p>
        <v-row justify="center">
          <v-btn
            @click="confirmUser(verify.email, verifyCode)"
            color="green"
            class="logsignButton"
          >Verify</v-btn>
        </v-row>
        <p></p>
        <v-row justify="center">
          <v-btn @click="resendCode(verify.email)" color="orange" class="logsignButton">Resend Code</v-btn>
        </v-row>
        <p></p>
        <v-row justify="center">
          <v-btn @click="backToSignup()" color="blue" class="logsignButton">Back To Sign Up</v-btn>
        </v-row>
        <p></p>
        <v-row justify="center">
          <p class="logSignMessage noselect">{{ verify.message }}</p>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "VerifyEmail",
  data: () => ({
    serverUrl: "http://localhost:3000",
    verifyCode: ""
  }),
  props: ["verify"],
  methods: {
    confirmUser: function(verifyEmail, verifyCode) {
      verifyEmail = verifyEmail.trim();
      verifyCode = verifyCode.trim();
      if (verifyEmail.length <= 0) {
        this.verify.message = "Please enter an email to be verified";
      } else if (/\s/.test(verifyEmail)) {
        this.verify.message = "Email can not include spaces";
      } else if (verifyCode.length != 8) {
        this.verify.message = "Verification code should be 8 characters";
      } else {
        this.serverConfirmUser(verifyEmail, verifyCode).then(data => {
          if (data.success) {
            this.clearEntries();
            this.$emit("userLogin", data.message);
            this.$router.push("browse");
          } else {
            this.verify.message = data.message;
          }
        });
      }
    },
    serverConfirmUser: function(email, verifyCode) {
      return axios
        .get(this.serverUrl + "/signup/confirmUser", {
          params: {
            email: email,
            confirmId: verifyCode
          }
        })
        .then(function(response) {
          return response.data;
        });
    },
    resendCode: function(verifyEmail) {
      if (verifyEmail.length <= 0) {
        this.verify.message = "Please enter an email to get a new code";
      } else if (/\s/.test(verifyEmail)) {
        this.verify.message = "Email can not include spaces";
      } else {
        this.serverResendCode(verifyEmail).then(data => {
          if (data.success) {
            this.verify.message = data.message;
          } else {
            this.verify.message = data.message;
          }
        });
      }
    },
    serverResendCode: function(email) {
      return axios
        .get(this.serverUrl + "/signup/resendCode", {
          params: {
            email: email
          }
        })
        .then(function(response) {
          return response.data;
        });
    },
    clearEntries: function() {
      this.verifyCode = "";
      this.$emit("clearVerify");
    },
    backToSignup: function() {
      this.clearEntries();
      this.$router.push("signup");
    }
  }
};
</script>

<style scoped src='../assets/styles/loginSignup.css'></style>