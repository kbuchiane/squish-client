<template>
  <div>
    <video
      controls
      :type="clip.type"
      :src="clip.src">
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