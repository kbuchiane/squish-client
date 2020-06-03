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
            type="email"
            ref="emailInput"
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
import appConfig from "../config/app.config";
import cookieUtil from "../utils/cookie.util";
import userEntryUtil from "../utils/userEntry.util";

export default {
  name: "VerifyEmail",
  data: () => ({
    serverUrl: appConfig.SERVER_URL,
    verifyCode: ""
  }),
  props: ["verify"],
  methods: {
    confirmUser: function(email, verifyCode) {
      email = email.trim();
      verifyCode = verifyCode.trim();
      let emailMessage = userEntryUtil.checkEmail(email);
      let codeMessage = userEntryUtil.checkCode(verifyCode);

      if (emailMessage) {
        this.verify.message = emailMessage;
      } else if (codeMessage) {
        this.verify.message = codeMessage;
      } else {
        this.serverConfirmUser(email, verifyCode).then(response => {
          if (response.status === 200) {
            if (response.data.accessToken) {
              this.clearEntries();
              this.$emit(
                "userLogin",
                response.data.accessToken,
                response.data.username
              );

              this.$router.push("browse");
            } else {
              this.verify.message = "Unable to verify code, please try again";
            }
          } else {
            this.verify.message = response.data.message;
          }
        });
      }
    },
    serverConfirmUser: function(email, verifyCode) {
      return axios
        .post(
          this.serverUrl + "/signup/confirmUser",
          {
            confirmId: verifyCode
          },
          {
            auth: {
              username: email
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
    resendCode: function(email) {
      if (email.length <= 0) {
        this.verify.message = "Please enter an email to get a new code";
      } else if (/\s/.test(email)) {
        this.verify.message = "Email can not include spaces";
      } else if (email.length > 255) {
        this.verify.message = "Email can not exceed 255 characters";
      } else if (email.includes(":")) {
        this.verify.message = "Email can not include ':'";
      } else if (!email.includes("@")) {
        this.verify.message = "Email must include '@'";
      } else {
        this.serverResendCode(email).then(response => {
          this.verify.message = response.data.message;
        });
      }
    },
    serverResendCode: function(email) {
      return axios
        .post(
          this.serverUrl + "/signup/resendCode",
          {},
          {
            auth: {
              username: email
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
      this.verifyCode = "";
      this.$emit("clearVerify");
    },
    backToSignup: function() {
      this.clearEntries();
      this.$router.push("signup");
    }
  },
  mounted: function() {
    this.$refs.emailInput.focus();
  }
};
</script>

<style scoped src='../assets/styles/loginSignup.css'></style>