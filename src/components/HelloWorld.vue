<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4" cols="12">
        <h1 class="display-2 font-weight-bold mb-3 noselect">
          TOPCLIPS
        </h1>
      </v-col>

      <v-col class="mb-5 loginColumn" cols="6">
        <h2 class="headline font-weight-bold mb-3 noselect">
          Log In
        </h2>
        <p></p>

        <v-row justify="center">
          <input v-model="userIdLogin" placeholder="Username or Email" class='landingTextBox'>
        </v-row>
        <p></p>
        <v-row justify="center">
          <input v-model="passwordLogin" placeholder="Password" class='landingTextBox'>
        </v-row>
        <p></p>
        <v-row justify="center">
          <v-btn @click='login(userIdLogin, passwordLogin)' color='green' class='logsignButton'>Log In</v-btn>
        </v-row>
        <p></p>
        <v-row justify="center">
          <v-btn color='orange' class='logsignButton'>Forgot Password</v-btn>
        </v-row>
      </v-col>

      <v-col class="mb-5 signupColumn" cols="6">
        <h2 class="headline font-weight-bold mb-3 noselect">
          Sign Up
        </h2>
        <v-row justify="center">
          <input v-model="usernameSignup" placeholder="Username" class='landingTextBox'>
        </v-row>
        <p></p>
        <v-row justify="center">
          <input v-model="emailSignup" placeholder="Email" class='landingTextBox'>
        </v-row>
        <p></p>
        <v-row justify="center">
          <input v-model="passwordSignup" placeholder="Password" class='landingTextBox'>
        </v-row>
        <p></p>
        <v-row justify="center">
          <input v-model="passwordConfirmSignup" placeholder="Confirm Password" class='landingTextBox'>
        </v-row>
        <p></p>
        <v-row justify="center">
          <v-btn color='green' class='logsignButton'>Sign Up</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'HelloWorld',
    data: () => ({
      userIdLogin: '',
      passwordLogin: '',
      usernameSignup: '',
      emailSignup: '',
      passwordSignup: '',
      passwordConfirmSignup: '',
      loginError: '',
      userData: {
        username: '',
        email: ''
      }
    }),
    methods: {
      login: function(userIdLogin, passwordLogin) {
        if (userIdLogin.length <= 0) {
          this.loginError = 'Please enter a username or email';
        } else if (passwordLogin.length < 6) {
          this.loginError = 'Password was incorrect';
        } else {
          this.serverLogin(userIdLogin, passwordLogin)
          .then(data => {
            this.userData = data;
          })
        }
      },
      serverLogin: function(username, password) {
        return axios
          .get('http://localhost:3000/login', {
            params: {
              username: username,
              password: password
            }
          })
          .then(function(response) {
            return response.data;
          });
      }
    }
  }
</script>

<style scoped src='../assets/styles/landingPage.css'></style>