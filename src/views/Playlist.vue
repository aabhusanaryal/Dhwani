<template>
  <div class="center-container">
    <button class="play" @click="play">Play</button>
  </div>

  <div class= "playlist-container">
    <PlaylistView :songlist = "songs">
    </PlaylistView>
  </div>
</template>

<script>
import PlaylistView from '../components/PlaylistView.vue';
export default {
  components: {PlaylistView},
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

.playlist-container {
 position: absolute;
 left: 20%;
 top: 40%;
 width: 60rem;
 height: 25rem;
 outline: 1px solid red;
}
</style>
