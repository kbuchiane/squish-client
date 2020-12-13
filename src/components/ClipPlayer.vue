<template>
  <div class="clipPlayerDiv">
    <video controls class="clipPlayer">
      <source :src="clip.src" :type="clip.type">
    </video>
  </div>
</template>

<script>
export default {
  name: "ClipPlayer",
  props: ["clip"]
};
</script>

<style scoped src='../assets/styles/clipPlayer.css'></style>