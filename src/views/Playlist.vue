<template>
  <div class="center-container">
    <h1>{{ name }}</h1>
  </div>
</template>

<script>
export default {
  name: "Playlist",
  data() {
    return {};
  },
  computed: {
    name() {
      return this.$route.params.playlist;
    },
  },
};
</script>

<style scoped>
.center-container {
  margin: 100px;
  font-size: 25px;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 100vh;
}
</style>
