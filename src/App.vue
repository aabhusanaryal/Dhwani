<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <div class="container-flex">
    <LeftSidebar :playlists="playlists" />
    <router-view />
    <div style="min-width: var(--left-sidebar-width)" dummy-div></div>
  </div>
</template>

<script>
import LeftSidebar from "@/components/LeftSidebar.vue";

export default {
  components: { LeftSidebar },
  data() {
    return {
      playlists: [],
    };
  },
  methods: {
    createPlaylist(name, songs) {
      let playlist = { name, songs };
      this.playlists.push(playlist);
    },
  },
  mounted() {
    // Creating fake playlists
    this.createPlaylist("Playlist-1", ["song1", "song2"]);
    this.createPlaylist("Playlist-2", ["song1", "song2"]);
    this.createPlaylist("Playlist-3", ["song1", "song2"]);
    this.createPlaylist("Playlist-4", ["song1", "song2"]);
    this.createPlaylist("Playlist-5", ["song1", "song2"]);
    this.createPlaylist("Playlist-5", ["song1", "song2"]);
  },
};
</script>

<style>
/* Importing fonts */
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

/* Setting variables */
:root {
  --left-sidebar-width: 350px;
  --cyan: #35e6da;
  --blue: #0496ff;
}

/* Removing margin and padding from all elements */
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.container-flex {
  display: flex;
  flex-direction: row;
}
</style>
