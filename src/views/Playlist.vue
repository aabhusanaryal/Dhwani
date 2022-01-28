<template>
  <div class="center-container">
    <button class="play" @click="play">Play</button>
  </div>
</template>

<script>
export default {
  name: "Playlist",
  data() {
    return {};
  },
  methods: {
    play() {
      console.log("Playing ", this.name);
      this.$emit("playPlaylist", this.name);
    },
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
  font-size: 25px;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 100vh;
}
</style>
