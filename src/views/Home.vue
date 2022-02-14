<template>
  <TrendingCard v-if="randomSong" :song="randomSong" @playSong="playSong" />
  <PlaylistTable :playlist="playlists[0]"> </PlaylistTable>
</template>

<script>
// @ is an alias to /src

import TrendingCard from "@/components/TrendingCard.vue";
import PlaylistTable from "@/components/PlaylistTable.vue";

export default {
  name: "Home",
  components: { TrendingCard, PlaylistTable },
  props: ["playlists"],
  data() {
    return {
      randomSong: null,
    };
  },
  methods: {
    playSong(song) {
      this.$emit("playSong", song);
    },
  },
  mounted() {
    // Setting randomSong
    let rand = Math.floor(Math.random() * this.playlists[0].songs.length);
    console.log(rand);
    this.randomSong = this.playlists[0].songs[rand];
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
