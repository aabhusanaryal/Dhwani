<template>
  <TrendingCard v-if="randomSong" :song="randomSong" @playSong="playSong" />
  <div class="center-container">
  <PlaylistTable
    :playlist="playlists[0]"
      @sortDurationAsc="sortDurationAsc" 
      @sortDurationDesc="sortDurationDesc" 
      @sortTitleAsc ="sortTitleAsc"
      @sortTitleDesc="sortTitleDesc"
      @sortArtistAsc="sortArtistAsc"
      @sortArtistDesc="sortArtistDesc"
  >
  </PlaylistTable>
  </div>
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
    sortDurationAsc(){
      this.$emit("sortDurationAsc", this.playlists[0].name);
    },
    sortDurationDesc(){
      this.$emit("sortDurationDesc", this.playlists[0].name);
    },
    sortTitleAsc(){
      this.$emit("sortTitleAsc", this.playlists[0].name);
    },
    sortTitleDesc(){
      this.$emit("sortTitleDesc", this.playlists[0].name);
    },
    sortArtistAsc(){
      this.$emit("sortArtistAsc", this.playlists[0].name);
    },
    sortArtistDesc(){
      this.$emit("sortArtistDesc", this.playlists[0].name);
    }
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
.center-container {
  width: 75%;
  margin: 0 auto;
  margin-top: 20px;
}
@media (max-width: 1350px) {
  .center-container {
    width: 80%;
  }
}
@media (max-width: 768px) {
  .center-container {
    width: 90%;
  }
}
</style>
