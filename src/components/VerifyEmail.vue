<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5 logSignColumn" cols="12">
        <h2 class="headline font-weight-bold mb-3 noselect">Verify Email</h2>
        <p></p>
        <v-row justify="center">
          <input v-model="verifyEmail" placeholder="Email" class="logSignTextBox" />
        </v-row>
        <p></p>
        <v-row justify="center">
          <input v-model="verifyCode" placeholder="Verification Code" class="logSignTextBox" />
        </v-row>
        <p></p>
        <v-row justify="center">
          <v-btn
            @click="confirmUser(verifyEmail, verifyCode)"
            color="green"
            class="logsignButton"
          >Verify</v-btn>
        </v-row>
        <p></p>
        <v-row justify="center">
          <v-btn @click="resendCode(verifyEmail)" color="orange" class="logsignButton">Resend Code</v-btn>
        </v-row>
        <p></p>
        <v-row justify="center">
          <v-btn to="/signup" color="blue" class="logsignButton">Back To Sign Up</v-btn>
        </v-row>
        <p></p>
        <v-row justify="center">
          <p class="logSignMessage noselect">{{ verifyMessage }}</p>
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
    verifyEmail: "",
    verifyCode: "",
    verifyMessage: ""
  }),
  props: ["verify"],
  methods: {
    confirmUser: function(verifyEmail, verifyCode) {
      if (verifyEmail.length <= 0) {
        this.verifyMessage = "Please enter an email to be verified";
      } else if (/\s/.test(verifyEmail)) {
        this.verifyMessage = "Email can not include spaces";
      } else if (verifyCode.length != 8) {
        this.verifyMessage = "Verification code should be 8 characters";
      } else {
        this.serverConfirmUser(verifyEmail, verifyCode).then(data => {
          if (data.success) {
            this.clearEntries();
            this.$emit("userLogin", data.message);
            this.$router.push("Browse");
          } else {
            this.verifyMessage = data.message;
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
        this.verifyMessage = "Please enter an email to get a new code";
      } else if (/\s/.test(verifyEmail)) {
        this.verifyMessage = "Email can not include spaces";
      } else {
        this.serverResendCode(verifyEmail).then(data => {
          if (data.success) {
            this.verifyMessage = data.message;
          } else {
            this.verifyMessage = data.message;
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
      this.verifyEmail = "";
      this.verifyCode = "";
      this.verifyMessage = "";
    }
  }
};
</script>

<style scoped src='../assets/styles/loginSignup.css'></style>