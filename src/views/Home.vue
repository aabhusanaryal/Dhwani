<template>
  <TrendingCard v-if="randomSong" :song="randomSong" @playSong="playSong" />
  <div class="center-container">
    <h2>All Songs</h2>
    <div class="btn" role="button" @click="playAllSongs">
      <span class="text">Play</span>
    </div>
  </div>
  <div class="center-container wider">
    <PlaylistTable
      :playlist="playlists[0]"
      @sortDurationAsc="sortDurationAsc"
      @sortDurationDesc="sortDurationDesc"
      @sortTitleAsc="sortTitleAsc"
      @sortTitleDesc="sortTitleDesc"
      @sortArtistAsc="sortArtistAsc"
      @sortArtistDesc="sortArtistDesc"
      @playSong="playSong"
    />
  </div>
</template>

<script>
// @ is an alias to /src

import TrendingCard from "@/components/TrendingCard.vue";
import PlaylistTable from "@/components/PlaylistTable.vue";

export default {
  name: "Home",
  components: { TrendingCard, PlaylistTable },
  props: ["playlists"],
  data() {
    return {
      randomSong: null,
    };
  },
  methods: {
    playSong(song) {
      this.$emit("playSong", song);
    },
    sortDurationAsc() {
      this.$emit("sortDurationAsc", this.playlists[0].name);
    },
    sortDurationDesc() {
      this.$emit("sortDurationDesc", this.playlists[0].name);
    },
    sortTitleAsc() {
      this.$emit("sortTitleAsc", this.playlists[0].name);
    },
    sortTitleDesc() {
      this.$emit("sortTitleDesc", this.playlists[0].name);
    },
    sortArtistAsc() {
      this.$emit("sortArtistAsc", this.playlists[0].name);
    },
    sortArtistDesc() {
      this.$emit("sortArtistDesc", this.playlists[0].name);
    },
    playAllSongs() {
      this.$emit("playPlaylist", this.playlists[0].name);
    },
  },
  mounted() {
    // Setting randomSong
    console.log("Home");
    let rand = Math.floor(Math.random() * this.playlists[0].songs.length);
    this.randomSong = this.playlists[0].songs[rand];
  },
};
</script>

<style scoped>
h2 {
  background-image: var(--heading-gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.btn {
  font-family: "Roboto", sans-serif;
  font-size: 25px;
  width: 100px;
  height: 50px;
  background-image: var(--merged-gradient);
  background-size: 200%;
  background-position: left;
  border-radius: 10px;
  /* Centers the text inside the card vertically. The value should be same as height */
  line-height: 50px;
  transition: 0.5s;
  cursor: pointer;
}

.btn:hover,
.btn:focus {
  background-position: right;
  /* background: var(--hover-gradient); */
}
.text {
  display: block;
  margin-left: 50%;
  transform: translateX(-50%);
  /* font-weight: bold; */
  color: white;
}
.center-container {
  font-size: 25px;
  max-height: 100vh;
}
.center-container {
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
}
.wider {
  width: 94% !important;
}
@media (max-width: 1350px) {
  .center-container {
    width: 80%;
  }
}
@media (max-width: 768px) {
  .center-container {
    width: 90%;
  }
}
</style>
