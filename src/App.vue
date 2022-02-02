<template>
  <div class="container-flex">
    <LeftSidebar :playlists="playlists" />
    <router-view
      :playlists="playlists"
      @playPlaylist="playPlaylist"
      @addPlaylist="createPlaylist"
    />
    <RightSidebar :genres="genres" />
  </div>
  <!-- Only rendering the player if there's any song in it -->
  <Player
    :playlists="playlists"
    v-if="playlists[0] && !createMode"
    ref="playerComponent"
  />
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
      genres: [], // This array is being populated in the mounted() hook
      createMode: false,
    };
  },
  // The playlists array contain playlists object. The playlist object has two properties:
  // name and songs. The name property holds the name/ title of the playlist, while the
  // songs property holds an array of song objects.

  // The song object has the following properties:
  // name: name of the song
  // path: filename of the song. The song MUST be stored in @assets/songs/<filename>.mp3
  // artist: Name of artist/ band
  // cover: CDN link to the cover artwork
  // genres: an array of genres the song belongs to

  // To play a song, we first instantiate an Audio() object as:
  // audio = new Audio(require(`@assets/songs/${song.name}.mp3`))
  // Then, we can play the audio by calling the .play() method on the Audio object.

  // PS: The first element of the playlists[] array is the playlist called "All Songs"
  methods: {
    createPlaylist(name, songs) {
      // This method takes in two parameters: name (string) of the playlist and
      // songs (array) to be included in that playlist
      let playlist = { name, songs };
      this.playlists.push(playlist);
    },
    playPlaylist(playlistName) {
      // This method in-turn calls the playPlaylist method of Player.vue
      this.$refs.playerComponent.playPlaylist(playlistName);
    },
  },

  mounted() {
    // Creating fake playlists
    // FIXME: Add proper genre to songs
    let song1 = {
      name: "Savage",
      path: "02. Paul Flint - Savage",
      artist: "Paul Flint",
      cover: "https://i1.sndcdn.com/artworks-000178640584-kie7ij-t500x500.jpg",
      genres: ["Chill", "LoFi"],
      audio: null,
    };
    let song2 = {
      name: "Puzzle",
      path: "03. Retrovision - Puzzle",
      artist: "Retrovision",
      cover: "https://i1.sndcdn.com/artworks-000196908840-gcl3jn-t500x500.jpg",
      genres: ["EDM"],
      audio: null,
    };
    let song3 = {
      name: "Feel Good",
      path: "04. Syn Cole - Feel Good",
      artist: "Syn Cole",
      cover: "https://i1.sndcdn.com/artworks-000149107009-m881ek-t500x500.jpg",
      genres: ["Pop"],
      audio: null,
    };
    let song4 = {
      name: "Roots",
      path: "06. Tobu - Roots",
      artist: "Tobu",
      cover:
        "https://lastfm.freetls.fastly.net/i/u/300x300/d55932d44b33e431e68a3c0c4daceb98.png",
      genres: ["OP", "Hello"],
      audio: null,
    };
    this.createPlaylist("All Songs", [song1, song2, song3, song4]);
    this.createPlaylist("Playlist-2", [song3, song2]);
    this.createPlaylist("Playlist-3", [song4]);

    // Populating this.genres
    let allSongs = this.playlists[0].songs;
    allSongs.forEach((song) => {
      let genres = song.genres; // Here, genre is an array of genres the song belong to
      genres.forEach((genre) => {
        // Pushing the genre into this.genres if the current genre is not already in this.genres
        if (!this.genres.includes(genre)) this.genres.push(genre);
      });
    });
  },
  watch: {
    $route(to) {
      if (to.path === "/create") this.createMode = true;
      else this.createMode = false;
    },
  },
};
</script>

<style>
/* Importing fonts */
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap");

/* Setting variables */
:root {
  --left-sidebar-width: 300px;
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
