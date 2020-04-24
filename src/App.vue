<template>
  <v-app>
    <v-content>
      <Index />
    </v-content>
  </v-app>
</template>

<script>
import Index from "./components/Index";
import axios from "axios";

export default {
  name: "App",
  components: {
    Index
  },
  data: () => ({
    //
  })
};
</script>