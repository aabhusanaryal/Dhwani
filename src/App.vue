<template>
  <div class="container-flex">
    <LeftSidebar :playlists="playlists" />
    <router-view />
    <RightSidebar :genre="genre" />
  </div>
  <Player />
</template>

<script>
import LeftSidebar from "@/components/LeftSidebar.vue";
import RightSidebar from "@/components/RightSidebar.vue";
import Player from "@/components/Player.vue";
import DLL from "/src/assets/LinkedList.js"

export default {
  components: { LeftSidebar, RightSidebar, Player },
  data() {
    return {
      playlists: [],
      genre: ["Chill", "LoFi", "EDM", "Romance", "Country", "Pop"],
      random: new DLL()
    };
  },
  methods: {
    createPlaylist(name, songs) {
      let playlist = { name, songs };
      this.playlists.push(playlist);
    },
    // addSong(){
    //   let audio=new Audio(require('@/assets/one.mp3'))
    //   this.random.insertEnd(audio);
    // },
    // playSong(){
    //   this.playlists=this.random.getArray()
    // },
    // addafterId(){
    //   let audio=new Audio(require('@/assets/one.mp3'))
    //   this.random.addArray([audio,audio,audio]);  
    // }
  },
  mounted() {
    // Creating fake playlists
    this.createPlaylist("Playlist-1", ["song1", "song2"]);
    this.createPlaylist("Playlist-2", ["song1", "song2"]);
    this.createPlaylist("Playlist-3", ["song1", "song2"]);
    this.createPlaylist("Playlist-4", ["song1", "song2"]);
    this.createPlaylist("Playlist-5", ["song1", "song2"]);
    this.createPlaylist("Playlist-6", ["song1", "song2"]);
  },
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
