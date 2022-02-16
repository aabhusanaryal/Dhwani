<template>
  <!-- <PlaylistTable :playlist='searchResults' /> -->
  <div class="container">
    <h4
      v-if="
        searchResults.songs.length == 0 && searchResults.artists.length == 0
      "
    >
      Not found! Please enter another keyword!
    </h4>
    <h3 v-if="searchResults.songs.length != 0">Songs</h3>
    <div class="cards-container">
      <div
        class="card"
        v-for="(song, index) in searchResults.songs"
        :key="index"
        :style="`background: linear-gradient(
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ), url(${song.cover}); background-repeat: no-repeat; background-size: 100%;`"
      >
        <div @click="playSong(song)" class="info-wrapper">
          {{ song.name }}
        </div>
      </div>
    </div>
    <h3 v-if="searchResults.artists.length != 0">Artists</h3>
    <div class="cards-container">
      <div
        class="card"
        v-for="(song, index) in searchResults.artists"
        :key="index"
        @click="playSong"
        :style="`background: linear-gradient(
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ), url(${song.cover}); background-repeat: no-repeat; background-size: 100%;`"
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
      //performing linear search in playlist
      let result = {
        name: "Search Results",
        songs: [],
        artists: [],
      };
      let n = this.playlists[0].songs.length; //number of songs in "all songs"
      let arr = [...this.playlists[0].songs]; //songs array of "all songs" playlist
      for (let i = 0; i < n; i++) {
        if (arr[i].name.toLowerCase().includes(this.query.toLowerCase()))
          result.songs.push(arr[i]);
        else if (arr[i].artist.toLowerCase().includes(this.query.toLowerCase()))
          result.artists.push(arr[i]);
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
  width: 220px;
  height: 220px;
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
</style>
