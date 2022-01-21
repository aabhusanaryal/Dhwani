<template>
  <h1>{{ name }}</h1>
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

<style></style>
