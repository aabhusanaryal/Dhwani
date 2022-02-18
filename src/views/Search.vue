<template>
  <div class="container">
    <div class="message-wrapper">
      <h2 v-if="query" class="gradient-text">Search results for {{ query }}</h2>
      <h4 v-if="query" id="num-of-results">
        {{ searchResults.songs.length + searchResults.artists.length }} result{{
          searchResults.songs.length + searchResults.artists.length > 1
            ? "s"
            : ""
        }}
      </h4>
    </div>
    <!-- <h4 v-if="!searchResults.songs.length && !searchResults.artists.length">
      0 results found!
    </h4> -->

    <h3 class="gradient-text" v-if="searchResults.songs.length != 0">Songs</h3>
    <div class="cards-container">
      <div
        class="card"
        v-for="(song, index) in searchResults.songs"
        :key="index"
        @click="playSong(song)"
        :style="`background: linear-gradient(
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ), url(${song.cover}); background-repeat: no-repeat; background-size: 100%;`"
      >
        <div class="info-wrapper">
          {{ song.name }}
        </div>
      </div>
    </div>
    <h3 class="gradient-text" v-if="searchResults.artists.length != 0">
      Artists
    </h3>
    <div class="cards-container">
      <div
        class="card"
        v-for="(song, index) in searchResults.artists"
        :key="index"
        @click="playSong(song)"
        :style="`background: linear-gradient(
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ), url(${song.artistCover}); background-repeat: no-repeat; background-size: 100%;`"
      >
        <div class="info-wrapper">
          {{ song.artist }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: ["playlists"],
  methods: {
    playSong(song) {
      this.$emit("playSong", song);
    },
  },
  computed: {
    query() {
      return this.$route.params.searchQuery;
    },
    searchResults() {
      let result = {
        name: "Search Results",
        songs: [],
        artists: [],
      };
      let n = this.playlists[0].songs.length; //number of songs in "All Songs"
      let arr = [...this.playlists[0].songs]; //array of song objects of "All Songs"
      //performing linear search in "All Songs" playlist
      for (let i = 0; i < n; i++) {
        if (arr[i]?.name.toLowerCase().includes(this.query?.toLowerCase())) {
          let song = arr[i];
          let filterGenres = this.$route.query.genre;
          if (!filterGenres) {
            result.songs.push(song);
          } else if (filterGenres.length != 0) {
            filterGenres.forEach((genre) => {
              if (song.genres.includes(genre) && !result.songs.includes(song))
                result.songs.push(song);
            });
          } else {
            //This condition runs when filterGenres is an empty array
            result.songs.push(song);
          }
        }
        if (arr[i]?.artist.toLowerCase().includes(this.query?.toLowerCase())) {
          let flag = 1;
          //looping through result.artists array to prevent duplicate artist entry
          for (let j = 0; j < result.artists.length; j++) {
            if (result.artists[j].artist === arr[i].artist) {
              flag = 0;
              break;
            }
          }
          if (flag) result.artists.push(arr[i]);
        }
      }
      return result;
    },
  },
};
</script>

<style scoped>
.container {
  padding: 10px 25px;
}
.cards-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 2rem;
}
.card {
  min-width: 200px;
  max-width: 270px;
  aspect-ratio: 1;
  flex-grow: 1;
  border-radius: 30px;
  position: relative;
  display: flex;
  justify-content: center;
  cursor: pointer;
}

h3 {
  margin-bottom: 1rem;
}
.info-wrapper {
  color: white;
  font-weight: bold;
  font-size: 1.6rem;
  position: absolute;
  bottom: 10px;
}
.message-wrapper {
  margin-bottom: 1.2rem;
}
#num-of-results {
  font-weight: 300;
  margin-top: 5px;
  padding-left: 5px;
}
</style>
