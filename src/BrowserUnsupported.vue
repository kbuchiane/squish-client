<template>
  <v-container>
    <div>
      {{ getReason().data }}
    </div>
    <!--
    <div>
      {{ reason }}
    </div>
    -->
  </v-container>
</template>

<script>
export default {
  name: "App",
  props: ["reason"],
  methods: {
    getReason: function () {
      return { data: this.reason };
    },
  },
};
</script>

<style scoped src='./assets/styles/browserUnsupported.css'></style>