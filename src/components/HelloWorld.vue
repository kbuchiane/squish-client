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
          <v-btn color='green' class='logsignButton'>Log In</v-btn>
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
      talkToServer: {
        buttonText: 'Speak',
        response: 'No response yet',
        error: null
      },
    }),
    methods: {
      serverTalk: function() {
        this.getConnectionCheck()
          .then(data => {
            this.talkToServer.response = data;
          });
      },
      getConnectionCheck: function() {
        return axios
          .get('http://localhost:3000/connectionCheck')
          .then(function(response) {
            return response.data;
          })
          .catch(function(error) {
            if (error.length > 0) {
              console.log('error: ' + JSON.stringify(error));
            }
          });
      }
    }
  }
</script>

<style scoped src='../assets/styles/landingPage.css'></style>