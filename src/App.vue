<template>
  <!-- How the grid works:
+----------------------------------------------+
|    1   |             2             |    3    |
|________|___________________________|_________|
|        |                           |         |
|        |                           |         |
|    4   |             5             |    6    |
|        |                           |         |
|________|___________________________|_________|
|    7   |             8             |    9    | 
|________|___________________________|_________| 
The whole page is contained in the container "maincontainer",
The grid is made in the maincontainer and the different components are contained in it.
The areas 1-9 are the areas of the grid made from rows and cols.
The areas are assigned different components,
1,4,7 is for left sidebar, contained by "leftcontainer"
2 is for the searchbar, contained by "topcontainer"
5 is for the router-view, contained by "centercontainer"
8 is for the player, contained by "bottomcontainer"
3,6,9 is for the right sidebar, contained by "rightcontainer"

@ 1350 width the template changes as:
+----------------------------------------------+
|    1   |             2                       |
|        |_____________________________________|
|        |                                     |
|    4   |             5                       |
|        |                                     |
|        |                                     |
|    7   |_____________________________________|
|        |              8                      |
|________|_____________________________________|

when the template is changed, the only contaniers shown in the grid areas become 1, 4 and 7 as:
--------------------
\        1          \
\___________________\
\                   \
\                   \
\         4         \
\                   \
\                   \
\___________________
\          7        \
--------------------
BREAKPOINT AT 768PX
The area is changed using mediaquery -->
  <div class="maincontainer">
    <div class="leftcontainer">
      <LeftSidebar :playlists="playlists" />
    </div>
    <div class="rightcontainer">
      <RightSidebar :genres="genres" />
    </div>
    <div class="centercontainer">
      <router-view
        :playlists="playlists"
        @playPlaylist="playPlaylist"
        @playSong="playSong"
        @addPlaylist="createPlaylist"
        @sortDurationAsc="sortDurationAsc"
        @sortDurationDesc="sortDurationDesc"
        @sortTitleAsc="sortTitleAsc"
        @sortTitleDesc="sortTitleDesc"
        @sortArtistAsc="sortArtistAsc"
        @sortArtistDesc="sortArtistDesc"
        v-if="playlists[0]"
      />
    </div>
    <div class="topcontainer">
      <!-- search bar -->
      <SearchBar />
    </div>
    <div class="bottomcontainer">
      <!-- Only rendering the player if there's any song in it -->
      <Player
        :playlists="playlists"
        v-if="playlists[0]"
        ref="playerComponent"
        @updateFavourites="updateFavourites"
      />
    </div>
  </div>
</template>
<script>
import LeftSidebar from "@/components/LeftSidebar.vue";
import RightSidebar from "@/components/RightSidebar.vue";
import Player from "@/components/Player.vue";
import SearchBar from "@/components/SearchBar.vue";
export default {
  components: { LeftSidebar, RightSidebar, Player, SearchBar },
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
  // releaseyear: year of release of the song, int value
  // isFav: is the song added to the Favourites playlist?
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

    sortDurationDesc(playlistName) {
      let playlist = this.playlists.filter(
        (playlist) => playlist.name == playlistName
      )[0];
      this.bubbleSort(playlist.songs, playlist.songs.length);
    },

    sortDurationAsc(playlistName) {
      let playlist = this.playlists.filter(
        (playlist) => playlist.name == playlistName
      )[0];
      this.mergeSort(playlist.songs, 0, playlist.songs.length - 1);
    },

    sortTitleAsc(playlistName) {
      let playlist = this.playlists.filter(
        (playlist) => playlist.name == playlistName
      )[0];
      this.insertionSort(playlist.songs, playlist.songs.length);
    },

    sortTitleDesc(playlistName) {
      let playlist = this.playlists.filter(
        (playlist) => playlist.name == playlistName
      )[0];
      this.insertionSortRev(playlist.songs, playlist.songs.length);
    },

    sortArtistAsc(playlistName) {
      let playlist = this.playlists.filter(
        (playlist) => playlist.name == playlistName
      )[0];
      this.selectionSort(playlist.songs, playlist.songs.length);
    },

    sortArtistDesc(playlistName) {
      let playlist = this.playlists.filter(
        (playlist) => playlist.name == playlistName
      )[0];
      this.selectionSortRev(playlist.songs, playlist.songs.length);
    },

    //performs shell sort on the array arr of the size n
    selectionSortRev(arr, n) {
      for (let k = 0; k <= n - 1; k++) {
        let pos = this.largest(arr, k, n - 1);
        this.swap(arr, k, pos);
      }
    },

    //returns the smallest value in the array from the given range (k, n)
    smallest(arr, k, n) {
      let small = arr[k];
      let pos = k;
      for (let j = k + 1; j <= n; j++) {
        if (small.artist.localeCompare(arr[j].artist) == 1) {
          small = arr[j];
          pos = j;
        }
      }
      return pos;
    },

    //returns the largest value in the array from the given range (k, n)
    largest(arr, k, n) {
      let small = arr[k];
      let pos = k;
      for (let j = k + 1; j <= n; j++) {
        if (small.artist.localeCompare(arr[j].artist) == -1) {
          small = arr[j];
          pos = j;
        }
      }
      return pos;
    },

    //performs selection sort on the array arr of the size n
    selectionSort(arr, n) {
      for (let k = 0; k <= n - 1; k++) {
        let pos = this.smallest(arr, k, n - 1);
        this.swap(arr, k, pos);
      }
    },

    //performs insertion sort on the array of size n
    insertionSort(arr, n) {
      let temp;
      let j;
      for (let i = 1; i < n; i++) {
        temp = arr[i];
        j = i - 1;
        while (j >= 0 && temp.name.localeCompare(arr[j].name) == -1) {
          arr[j + 1] = arr[j];
          j = j - 1;
        }
        arr[j + 1] = temp;
      }
    },

    //performs insertion sort in the reverse order on the array of size n
    insertionSortRev(arr, n) {
      let temp;
      let j;
      for (let i = 1; i < n; i++) {
        temp = arr[i];
        j = i - 1;
        while (j >= 0 && temp.name.localeCompare(arr[j].name) == 1) {
          arr[j + 1] = arr[j];
          j = j - 1;
        }
        arr[j + 1] = temp;
      }
    },

    //function to merge the partitioned arrays
    merge(arr, beg, mid, end) {
      let i = beg;
      let j = mid + 1;
      let k = 0;
      const temp = [];
      while (i <= mid && j <= end) {
        if (arr[i].duration < arr[j].duration) {
          temp[k++] = arr[i++];
        } else {
          temp[k++] = arr[j++];
        }
      }
      while (i <= mid) {
        temp[k++] = arr[i++];
      }
      while (j <= end) {
        temp[k++] = arr[j++];
      }
      for (let i = beg; i <= end; i++) {
        arr[i] = temp[i - beg];
      }
    },

    //function to perform merge sort
    mergeSort(arr, beg, end) {
      if (beg < end) {
        //divide the array into singular elements
        var mid = beg + Math.floor((end - beg) / 2);
        this.mergeSort(arr, beg, mid);
        this.mergeSort(arr, mid + 1, end);
        //merge the elements elements are divided in to singular arrays with one elemets each
        this.merge(arr, beg, mid, end);
      }
    },

    //function to swap arr elements of the positions i1 and i2
    swap(arr, i1, i2) {
      let temp = arr[i1];
      arr[i1] = arr[i2];
      arr[i2] = temp;
    },

    //performs bubble sort on array of size n
    bubbleSort(arr, n) {
      for (let i = 0; i <= n - 1; i++) {
        for (let j = i + 1; j <= n - 1; j++) {
          if (arr[i].duration < arr[j].duration) {
            this.swap(arr, i, j);
          }
        }
      }
    },

    playSong(songName) {
      console.log(111);
      console.log(songName);
      this.$refs.playerComponent.playSong(songName);
    },
    updateFavourites(song) {
      if (song.isFav) {
        // Removing the song from array
        this.playlists[1].songs = this.playlists[1].songs.filter(
          (s) => s != song
        );
        song.isFav = false;
      } else {
        this.playlists[1].songs.push(song);
        song.isFav = true;
      }
    },
  },

  mounted() {
    setTimeout(() => {
      console.log(document.querySelectorAll("input[type='text']"));
    }, 1000);
    // Creating fake playlists
    // FIXME: Add proper genre to songs
    let song1 = {
      name: "Savage",
      path: "02. Paul Flint - Savage",
      artist: "Paul Flint",
      cover: "https://i1.sndcdn.com/artworks-000178640584-kie7ij-t500x500.jpg",
      genres: ["Chill", "LoFi"],
      audio: null,
      isFav: null,
      duration: 132,
    };
    let song2 = {
      name: "Puzzle",
      path: "03. Retrovision - Puzzle",
      artist: "Retrovision",
      cover: "https://i1.sndcdn.com/artworks-000196908840-gcl3jn-t500x500.jpg",
      genres: ["EDM"],
      audio: null,
      isFav: null,
      duration: 245,
    };
    let song3 = {
      name: "Feel Good",
      path: "04. Syn Cole - Feel Good",
      artist: "Syn Cole",
      cover: "https://i1.sndcdn.com/artworks-000149107009-m881ek-t500x500.jpg",
      genres: ["Pop"],
      audio: null,
      isFav: null,
      duration: 189,
    };
    let song4 = {
      name: "Roots",
      path: "06. Tobu - Roots",
      artist: "Tobu",
      cover:
        "https://lastfm.freetls.fastly.net/i/u/300x300/d55932d44b33e431e68a3c0c4daceb98.png",
      genres: ["OP", "Hello"],
      audio: null,
      isFav: null,
      duration: 200,
    };
    let song5 = {
      name: "Dreaming of Me",
      path: "07. Jack Shore - Dreaming of Me",
      artist: "Jack Shore",
      cover:
        "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/033/325x325/dreaming-of-me-1635854432-lB4hOLMPWe.jpg",
      genres: ["Indie"],
      audio: null,
      isFav: null,
      duration: 199,
    };
    let song6 = {
      name: "Phoenix",
      path: "08. Halvorsen - Phoenix",
      artist: "Halvorsen",
      cover:
        "https://linkstorage.linkfire.com/medialinks/images/7438735b-7816-415a-b3bb-985b6a3f930b/artwork-440x440.jpg",
      genres: ["Indie"],
      audio: null,
      isFav: null,
      duration: 238,
    };
    let song7 = {
      name: "Cloud9",
      path: "09. Tobu - Cloud9",
      artist: "Tobu",
      cover:
        "https://linkstorage.linkfire.com/medialinks/images/4670ee7b-68e1-4d08-a52d-4db36daca1e1/artwork-440x440.jpg",
      genres: ["EDM"],
      audio: null,
      isFav: null,
      duration: 275,
    };
    let song8 = {
      name: "Canon in D",
      path: "10. Pachelbel - Canon in D",
      artist: "Pachelbel",
      cover:
        "https://halleonard-coverimages.s3.amazonaws.com/wl/14024794-wl.jpg",
      genres: ["Piano"],
      audio: null,
      isFav: null,
      duration: 228,
    };
    let song9 = {
      name: "Chains",
      path: "11. Alina Renae - Chains",
      artist: "Alina Renae",
      cover:
        "https://linkstorage.linkfire.com/medialinks/images/2401d934-83be-4849-9fcd-9d31990e7ca9/artwork-440x440.jpg",
      genres: ["Chill"],
      audio: null,
      isFav: null,
      duration: 194,
    };
    let song10 = {
      name: "Symphony",
      path: "12. Arc North - Symphony",
      artist: "Arc North",
      cover:
        "https://linkstorage.linkfire.com/medialinks/images/6da8f4d1-115c-44f7-8b14-94bd2e46d0b1/artwork-440x440.jpg",
      genres: ["Chill"],
      audio: null,
      isFav: null,
      duration: 190,
    };
    let song11 = {
      name: "What You Like",
      path: "13. Curbi - What You Like",
      artist: "Curbi",
      cover:
        "https://linkstorage.linkfire.com/medialinks/images/f4a06b83-8acb-484f-becc-a752d6ecc611/artwork-440x440.jpg",
      genres: ["Bass"],
      audio: null,
      isFav: null,
      duration: 158,
    };
    let song12 = {
      name: "New Style",
      path: "14. Droptek - New Style",
      artist: "Droptek",
      cover:
        "https://linkstorage.linkfire.com/medialinks/images/93d156a9-31cc-403d-9433-932c4b6622b1/artwork-440x440.jpg",
      genres: ["Bass"],
      audio: null,
      isFav: null,
      duration: 227,
    };

    this.createPlaylist("All Songs", [
      song1,
      song2,
      song3,
      song4,
      song5,
      song6,
      song7,
      song8,
      song9,
      song10,
      song11,
      song12,
    ]);
    this.createPlaylist("Favourites", []);
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
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500&display=swap");
/* Setting variables */
:root {
  --table-cell-height: 60px;
  --left-sidebar-width: 350px;
  --cyan: #35e6da;
  --blue: #0496ff;
  --grey: #2d3f50;
  --light-grey: rgb(209, 207, 207);
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
  --heading-gradient: linear-gradient(
    93.64deg,
    rgba(63, 50, 77, 0.83) 0.98%,
    #004b81 119.65%
  );
  --grey-gradient: linear-gradient(315deg, #788599 0%, #f5f7fa 74%);
}
/* Removing margin and padding from all elements */
* {
  margin: 0;
  padding: 0;
}
html {
  overflow: hidden; /* Removing scrollbar from the main html element */
}
h1 {
  font-size: 4rem;
}
h2 {
  font-size: 3rem;
}
h3 {
  font-size: 2.5rem;
}
.gradient-text {
  background-image: var(--heading-gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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

.maincontainer {
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-rows: 10% 65% 25%;
  grid-template-columns: var(--left-sidebar-width) 1fr 350px;
  grid-template-areas:
    "leftcontainer topcontainer rightcontainer"
    "leftcontainer centercontainer rightcontainer"
    "leftcontainer bottomcontainer rightcontainer";
}

.leftcontainer {
  grid-area: leftcontainer;
  z-index: 1;
  /* height: 100vh; */
}
.rightcontainer {
  grid-area: rightcontainer;
}
.topcontainer {
  grid-area: topcontainer;
}
.centercontainer {
  overflow: auto;
  grid-area: centercontainer;
}
.bottomcontainer {
  grid-area: bottomcontainer;
  display: flex;
  justify-content: center;
}
@media screen and (max-width: 1350px) {
  .maincontainer {
    grid-template-columns: var(--left-sidebar-width) 1fr;
    grid-template-rows: 10% 70% 20%;
    grid-template-areas:
      "leftcontainer topcontainer"
      "leftcontainer centercontainer"
      "leftcontainer bottomcontainer";
  }
  .rightcontainer {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  html {
    font-size: 11px;
  }
  .maincontainer {
    grid-template-columns: 100%;
    grid-template-rows: 80px 10% 65% 25%;
    grid-template-areas:
      "leftcontainer"
      "topcontainer"
      "centercontainer"
      "bottomcontainer";
  }
  .rightcontainer {
    display: none;
  }
}
.link {
  cursor: pointer;
}
</style>
