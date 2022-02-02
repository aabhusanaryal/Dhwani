<template>
  <div class="center-container">
    <button class="play" @click="play">Play</button>
    <li v-for="(song, index) in songs" :key="index">{{ song.name }}</li>
  </div>
</template>

<script>
export default {
  name: "Playlist",
  props: ["playlists"],
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
    songs() {
      return this.playlists.filter((playlist) => playlist.name == this.name)[0]
        .songs;
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
