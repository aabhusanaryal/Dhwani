<template>
  <div class="center-container">
    <div>
      <h2>{{ currentPlaylist.name }}</h2>
      <div class="btn" @click="play" role="button">
        <span class="text">Play</span>
      </div>
      <div class="playlist-container">
        <PlaylistTable
          :playlist="currentPlaylist"
          @sortDurationAsc="sortDurationAsc"
          @sortDurationDesc="sortDurationDesc"
          @sortTitleAsc="sortTitleAsc"
          @sortTitleDesc="sortTitleDesc"
          @sortArtistAsc="sortArtistAsc"
          @sortArtistDesc="sortArtistDesc"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PlaylistTable from "../components/PlaylistTable.vue";
export default {
  components: { PlaylistTable },
  name: "Playlist",
  props: ["playlists"],

  methods: {
    play() {
      console.log("Playing ", this.name);
      this.$emit("playPlaylist", this.name);
    },
    sortDurationAsc() {
      this.$emit("sortDurationAsc", this.name);
    },
    sortDurationDesc() {
      this.$emit("sortDurationDesc", this.name);
    },
    sortTitleAsc() {
      this.$emit("sortTitleAsc", this.name);
    },
    sortTitleDesc() {
      this.$emit("sortTitleDesc", this.name);
    },
    sortArtistAsc() {
      this.$emit("sortArtistAsc", this.name);
    },
    sortArtistDesc() {
      this.$emit("sortArtistDesc", this.name);
    },
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
.center-container {
  width: 75%;
  margin: 0 auto;
  margin-top: 20px;
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
h2 {
  margin-bottom: 20px;
}
</style>
