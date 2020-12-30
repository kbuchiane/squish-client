<template>
  <li class="commentTree">
      <span class="comment">{{ comment.text }}</span>
      <ul v-if="comment.comments && comment.comments.length">
        <CommentTree
            v-for="comment in comment.comments"
            :key="comment.commentId">
        </CommentTree>
      </ul>
  </li>
</template>

<script>
export default {
  name: "CommentTree",
  props: ["comment"]
};
</script>

<style scoped src='../assets/styles/commentTree.css'></style>