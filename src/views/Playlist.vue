<template>
  <div class="center-container">
    <button class="play" @click="play">Play</button>
  </div>

  <div class= "playlist-container">
    <PlaylistTable :playlist = "currentPlaylist" 
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
import PlaylistTable from '../components/PlaylistTable.vue';
export default {
  components: {PlaylistTable},
  name: "Playlist",
  props: ["playlists"],

  methods: {
    play() {
      console.log("Playing ", this.name);
      this.$emit("playPlaylist", this.name);
    },
    sortDurationAsc(){
      this.$emit("sortDurationAsc", this.name);
    },
    sortDurationDesc(){
      this.$emit("sortDurationDesc", this.name);
    },
    sortTitleAsc(){
      this.$emit("sortTitleAsc", this.name);
    },
    sortTitleDesc(){
      this.$emit("sortTitleDesc", this.name);
    },
    sortArtistAsc(){
      this.$emit("sortArtistAsc", this.name);
    },
    sortArtistDesc(){
      this.$emit("sortArtistDesc", this.name);
    }
  },

  computed: {
    name() {
      return this.$route.params.playlist;
    },
    currentPlaylist() {
      return this.playlists.filter((playlist) => playlist.name == this.name)[0];
    },
  },
};
</script>

<style scoped>
.playlist-container {
  
 width: 100%;
 height: 25rem;
}
</style>
