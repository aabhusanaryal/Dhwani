<template>
  <div class="center-container">
    <button class="play" @click="play">Play</button>
    <button @click="sortthelist" class="sort" >Sort</button>
  </div>

  <div class= "playlist-container">
    <PlaylistTable :playlist = "currentPlaylist">
    </PlaylistTable>
  </div>
</template>

<script>
import PlaylistTable from '../components/PlaylistTable.vue';
export default {
  components: {PlaylistTable},
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
    sortthelist(){
      this.$emit("sortPlaylist", this.name);
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
/* .center-container {
  font-size: 25px;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 100vh;
  width: 100%
} */

.playlist-container {
  
 width: 100%;
 height: 25rem;
}
</style>
