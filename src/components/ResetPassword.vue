<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5 logSignColumn" cols="12">
        <h2 class="headline font-weight-bold mb-3 noselect">Reset Password</h2>
        <p></p>
        <v-row justify="center">
          <input
            v-model="resetPassword.email"
            v-on:keyup.enter="confirmResetPassword(resetPassword.email, resetPasswordCode)"
            placeholder="Email"
            class="logSignTextBox"
            type="email"
            ref="emailInput"
          />
        </v-row>
        <p></p>
        <v-row justify="center">
          <input
            v-model="resetPasswordCode"
            v-on:keyup.enter="confirmResetPassword(resetPassword.email, resetPasswordCode)"
            placeholder="Reset Password Code"
            class="logSignTextBox"
          />
        </v-row>
        <p></p>
        <v-row justify="center">
          <v-btn
            @click="confirmResetPassword(resetPassword.email, resetPasswordCode)"
            color="green"
            class="logsignButton"
          >Reset</v-btn>
        </v-row>
        <p></p>
        <v-row justify="center">
          <v-btn
            @click="resendCode(resetPassword.email)"
            color="orange"
            class="logsignButton"
          >Resend Code</v-btn>
        </v-row>
        <p></p>
        <v-row justify="center">
          <v-btn @click="backToLogin()" color="blue" class="logsignButton">Back To Log In</v-btn>
        </v-row>
        <p></p>
        <v-row justify="center">
          <p class="logSignMessage noselect">{{ resetPassword.message }}</p>
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
  name: "ResetPassword",
  data: () => ({
    serverUrl: appConfig.SERVER_URL,
    resetPasswordCode: ""
  }),
  props: ["resetPassword"],
  methods: {
    confirmResetPassword: function(email, resetPasswordCode) {
      email = email.trim();
      resetPasswordCode = resetPasswordCode.trim();
      let emailMessage = userEntryUtil.checkEmail(email);
      let codeMessage = userEntryUtil.checkCode(resetPasswordCode);

      if (emailMessage) {
        this.resetPassword.message = emailMessage;
      } else if (codeMessage) {
        this.resetPassword.message = codeMessage;
      } else {
        this.serverConfirmResetPassword(email, resetPasswordCode).then(
          response => {
            if (response.status === 200) {
              if (response.data.accessToken) {
                this.clearEntries();
              } else {
                this.resetPassword.message =
                  "Unable to reset password, please try again";
              }
            } else {
              this.resetPassword.message = response.data.message;
            }
          }
        );
      }
    },
    serverConfirmResetPassword: function(email, resetPasswordCode) {
      return axios
        .post(
          this.serverUrl + "/signup/confirmUser",
          {
            confirmId: resetPasswordCode
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
      email = email.trim();
      let emailMessage = userEntryUtil.checkEmail(email);

      if (emailMessage) {
        this.resetPassword.message = emailMessage;
      } else {
        this.serverResendCode(email).then(response => {
          this.resetPassword.message = response.data.message;
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
      this.$emit("clearResetPasswordData");
    },
    backToLogin: function() {
      this.clearEntries();
      this.$router.push("login");
    }
  },
  mounted: function() {
    this.$refs.emailInput.focus();
  }
};
</script>

<style scoped src='../assets/styles/loginSignup.css'></style>