<template>
  <div class="container-flex">
    <LeftSidebar :playlists="playlists" />
    <router-view :playlists="playlists" @playPlaylist="playPlaylist" @addPlaylist="createPlaylist" />
    <RightSidebar :genre="genre" />
  </div>
  <!-- Only rendering the player if there's any song in it -->
  <Player :playlists="playlists" v-if="playlists[0] && !createMode" ref="playerComponent" />
</template>

<script>
import LeftSidebar from "@/components/LeftSidebar.vue";
import RightSidebar from "@/components/RightSidebar.vue";
import Player from "@/components/Player.vue";

export default {
  components: { LeftSidebar, RightSidebar, Player },
  data() {
    return {
      playlists: [],
      genre: ["Chill", "LoFi", "EDM", "Romance", "Country", "Pop"],
      createMode: false
    };
  },
  methods: {
    createPlaylist(name, songs) {
      let playlist = { name, songs };
      this.playlists.push(playlist);
    },
    playPlaylist(playlistName) {
      this.$refs.playerComponent.playPlaylist(playlistName);
    },
  },
  mounted() {
    // Creating fake playlists
    let song1 = {
      name: "Savage",
      path: "02. Paul Flint - Savage",
      artist: "Paul Flint",
      cover: "https://i1.sndcdn.com/artworks-000178640584-kie7ij-t500x500.jpg",
    };
    let song2 = {
      name: "Puzzle",
      path: "03. Retrovision - Puzzle",
      artist: "Retrovision",
      cover: "https://i1.sndcdn.com/artworks-000196908840-gcl3jn-t500x500.jpg",
    };
    let song3 = {
      name: "Feel Good",
      path: "04. Syn Cole - Feel Good",
      artist: "Syn Cole",
      cover: "https://i1.sndcdn.com/artworks-000149107009-m881ek-t500x500.jpg",
    };
    let song4 = {
      name: "Roots",
      path: "06. Tobu - Roots",
      artist: "Tobu",
      cover:
        "https://lastfm.freetls.fastly.net/i/u/300x300/d55932d44b33e431e68a3c0c4daceb98.png",
    };
    this.createPlaylist("All Songs", [song1, song2, song3, song4]);
    this.createPlaylist("Playlist-2", ["song1", "song2"]);
    this.createPlaylist("Playlist-3", ["song1", "song2"]);
  },
  watch:{
    $route(to){
      if(to.path==="/create")
        this.createMode=true
      else  
        this.createMode=false
    }
  }
};
</script>

<style>
/* Importing fonts */
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap");

/* Setting variables */
:root {
  --left-sidebar-width: 350px;
  --cyan: #35e6da;
  --blue: #0496ff;
  --primary-gradient: linear-gradient(
    93.64deg,
    #35e6da 0.98%,
    rgba(5, 145, 245, 0.42) 119.65%
  );
  --hover-gradient: linear-gradient(
    93.64deg,
    #35e6da 0.98%,
    rgba(10, 5, 245, 0.42) 119.65%
  );
  --merged-gradient: linear-gradient(
    93.64deg,
    #35e6da 0.98%,
    rgba(5, 145, 245, 0.42),
    #35e6da 0.98%,
    rgba(16, 55, 245, 0.5) 119.65%
  );
  --active-gradient: linear-gradient(
    93.64deg,
    rgba(63, 50, 77, 0.83) 0.98%,
    #004b81 119.65%
  );
}

/* Removing margin and padding from all elements */
* {
  margin: 0;
  padding: 0;
}
html {
  overflow: hidden; /* Removing scrollbar from the main html element */
}

/* Making the scrollbar look pretty (like myself - Aabhusan) */
::-webkit-scrollbar {
  width: 20px;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: #e6e6f1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #d4d4da;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f4f5fe;
}
.container-flex {
  display: flex;
  flex-direction: row;
}
.link {
  cursor: pointer;
}
.right-sidebar {
  margin-left: auto; /* Sticks it to the right side */
}
.center-container {
  min-width: 40%;
}
</style>
