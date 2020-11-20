<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5 logSignColumn" cols="12">
        <h2 class="headline font-weight-bold mb-3 noselect">Reset Password</h2>
        <p></p>
        <v-row justify="center">
          <input
            v-model="resetPassword.email"
            v-on:keyup.enter="confirmResetPassword(resetPassword.email, resetPasswordCode, newPassword, newPasswordConfirm)"
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
            v-on:keyup.enter="confirmResetPassword(resetPassword.email, resetPasswordCode, newPassword, newPasswordConfirm)"
            placeholder="Reset Password Code"
            class="logSignTextBox"
          />
        </v-row>
        <p></p>
        <v-row justify="center">
          <input
            v-model="newPassword"
            v-on:keyup.enter="confirmResetPassword(resetPassword.email, resetPasswordCode, newPassword, newPasswordConfirm)"
            placeholder="New Password"
            class="logSignTextBox"
            type="password"
          />
        </v-row>
        <p></p>
        <v-row justify="center">
          <input
            v-model="newPasswordConfirm"
            v-on:keyup.enter="confirmResetPassword(resetPassword.email, resetPasswordCode, newPassword, newPasswordConfirm)"
            placeholder="Confirm New Password"
            class="logSignTextBox"
            type="password"
          />
        </v-row>
        <p></p>
        <v-row justify="center">
          <v-btn
            @click="confirmResetPassword(resetPassword.email, resetPasswordCode, newPassword, newPasswordConfirm)"
            color="#40a0e0"
            class="logsignButton"
          >Reset Password</v-btn>
        </v-row>
        <p></p>
        <v-row justify="center">
          <v-btn
            @click="resendCode(resetPassword.email)"
            color="#40a0e0"
            class="logsignButton"
          >Resend Code</v-btn>
        </v-row>
        <p></p>
        <v-row justify="center">
          <v-btn @click="backToLogin()" color="#40a0e0" class="logsignButton">Back To Log In</v-btn>
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
    resetPasswordCode: "",
    newPassword: "",
    newPasswordConfirm: ""
  }),
  props: ["resetPassword"],
  methods: {
    confirmResetPassword: function(
      email,
      resetPasswordCode,
      newPassword,
      newPasswordConfirm
    ) {
      email = email.trim();
      resetPasswordCode = resetPasswordCode.trim();
      let emailMessage = userEntryUtil.checkEmail(email);
      let codeMessage = userEntryUtil.checkCode(resetPasswordCode);
      let passwordMessage = userEntryUtil.checkPassword(newPassword);

      if (emailMessage) {
        this.resetPassword.message = emailMessage;
      } else if (codeMessage) {
        this.resetPassword.message = codeMessage;
      } else if (passwordMessage) {
        this.resetPassword.message = passwordMessage;
      } else if (newPassword !== newPasswordConfirm) {
        this.resetPassword.message = "Passwords do not match, please try again";
      } else {
        this.serverConfirmResetPassword(
          email,
          resetPasswordCode,
          newPassword
        ).then(response => {
          if (response.status === 200) {
            this.clearEntries();
          }

          this.resetPassword.message = response.data.message;
        });
      }
    },
    serverConfirmResetPassword: function(
      email,
      resetPasswordCode,
      newPassword
    ) {
      return axios
        .post(
          this.serverUrl + "/resetPassword/confirmResetPassword",
          {
            confirmId: resetPasswordCode
          },
          {
            auth: {
              username: email,
              password: newPassword
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
          this.serverUrl + "/resetPassword/resendResetCode",
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
      this.resetPasswordCode = "";
      this.newPassword = "";
      this.newPasswordConfirm = "";
      this.resetPassword.message = "";
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