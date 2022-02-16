<template>
  <div class="center-container">
    <button class="play" @click="play">Play</button>
  </div>

  <div class= "playlist-container">
    <PlaylistTable :playlist = "currentPlaylist" 
    @sortAscending="sortascending" 
    @sortDescending="sortdescending" 
    @sortName ="sortname "
    @sortNameRev="sortnamerev"
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
    sortascending(){
      this.$emit("sortAscending", this.name);
    },
    sortdescending(){
      this.$emit("sortDescending", this.name);
    },
    sortname(){
      this.$emit("sortName", this.name);
    },
    sortnamerev(){
      this.$emit("sortNameRev", this.name);
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
