<template>
  <TrendingCard v-if="randomSong" :song="randomSong" @playSong="playSong" />
  <PlaylistTable
    :playlist="playlists[0]"
    @sortAscending="sortAscending"
    @sortDescending="sortDescending"
    @sortName="sortName"
    @sortNameRev="sortNameRev"
    @sortArtist="sortArtist"
    @sortArtistRev="sortArtistRev"
  >
  </PlaylistTable>
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
    sortAscending() {
      this.$emit("sortAscending", this.playlists[0].name);
    },
    sortDescending() {
      this.$emit("sortDescending", this.playlists[0].name);
    },
    sortName() {
      this.$emit("sortName", this.playlists[0].name);
    },
    sortNameRev() {
      this.$emit("sortNameRev", this.playlists[0].name);
    },
    sortArtist() {
      this.$emit("sortArtist", this.playlists[0].name);
    },
    sortArtistRev() {
      this.$emit("sortArtistRev", this.playlists[0].name);
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
