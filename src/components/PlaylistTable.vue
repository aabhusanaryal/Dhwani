<template>
  <div class="list-container">
    <table class="playlist-table">
      <thead>
        <tr>
          <th class="first-col"></th>
          <th>
            Title
            <div class="sort-icon">
              <div @click="sortTitleAsc" class="arrow uparrow"></div>
              <div @click="sortTitleDesc" class="arrow downarrow"></div>
            </div>
          </th>
          <th>
            Artist
            <div class="sort-icon">
              <div @click="sortArtistAsc" class="arrow uparrow"></div>
              <div @click="sortArtistDesc" class="arrow downarrow"></div>
            </div>
          </th>
          <th>
            Duration
            <div class="sort-icon">
              <div @click="sortDurationAsc" class="arrow uparrow"></div>
              <div @click="sortDurationDesc" class="arrow downarrow"></div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(song, index) in filteredSongs" :key="index">
          <td class="first-col">
            <span class="playBtn" @click="playSong(song)"
              ><i class="fa-solid fa-circle-play"></i
            ></span>
          </td>
          <td>{{ song.name }}</td>
          <td>{{ song.artist }}</td>
          <td>{{ secondsToMinutes(song.duration) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["playlist"],
  methods: {
    secondsToMinutes(seconds) {
      // Takes in seconds as parameter and returns a string of the format "mm:ss"
      let minutes;
      minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60;
      minutes = minutes.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      seconds = Math.floor(seconds).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      return `${minutes}:${seconds}`;
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
    playSong(song) {
      this.$emit("playSong", song);
    },
  },
  computed: {
    filterGenres: function () {
      return this.$route.query.genre;
    },
    filteredSongs: function () {
      //if genre is not loaded, show all songs of the playlist
      if (!this.filterGenres) {
        return this.playlist.songs;
      }
      //if genre
      else if (this.filterGenres.length != 0) {
        const arr = [];
        for (let i = 0; i < this.playlist.songs.length; i++) {
          for (let j = 0; j < this.filterGenres.length; j++) {
            //check genre of playlist.songs[i] with genre query's list
            if (
              this.playlist.songs[i].genres.includes(this.filterGenres[j]) &&
              !arr.includes(this.playlist.songs[i])
            ) {
              arr.push(this.playlist.songs[i]);
            }
          }
        }
        return arr;
      } else {
        return this.playlist.songs;
      }
    },
  },
};
</script>

<style scoped>
.playlist-title {
  padding: 15px;
  color: var(--blue);
  font-size: 2.25rem;
}

.list-container {
  font-size: 23px;
  background: var(--white);
  width: 100%;
  overflow: hidden !important;
  display: flex;
  justify-content: center;
}

table {
  color: #646569;
  border-spacing: 0px 20px;
  border-collapse: separate;
}

td,
th {
  vertical-align: middle;
  width: 300px;
  text-align: left;
}
.first-col {
  width: 100px !important;
}
th {
  color: #84898f;
  font-weight: lighter;
}
.sort-icon {
  display: inline-block;
  position: relative;
  font-size: 0.9em;
}
.uparrow {
  position: absolute;
  left: 0;
}
th,
td {
  /* padding: 0 10%; */
}
.uparrow {
  display: inline-block;
  height: 0;
  width: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 7px solid #84898f;
  margin-bottom: 15px;
}
.downarrow {
  display: inline-block;
  height: 0;
  width: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 7px solid #84898f;
  margin-bottom: 3px;
}
.uparrow:hover {
  border-bottom-color: #5b5e62;
  transform: scale(1.25);
  transition: ease-in-out;
}
tr {
  border: 1px solid red;
  border-radius: 30px;
  height: var(--table-cell-height);
  position: relative;
}
/* Making the tr's borders curvy on hover */
tr td:first-child {
  border-top-left-radius: 10px;
}
tr td:last-child {
  border-top-right-radius: 10px;
}
tr td:first-child {
  border-bottom-left-radius: 10px;
}
tr td:last-child {
  border-bottom-right-radius: 10px;
}
tbody > tr:hover {
  color: black;
  background: white;
}
tbody tr:hover .playBtn {
  visibility: visible;
}

tbody tr .playBtn {
  visibility: hidden;
  display: flex;
  justify-content: center;
  /* Contains the play icon that is visible on hover */
  /* To change the play icon size, change the value of --scale */
  --scale: 0.75; /* The play icon will be scale * height of cell */
  /* padding-left: 10px; */
  font-family: "Font Awesome 6 Free";
  background: var(--merged-gradient);
  background-size: 200%;
  background-position: left;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900;
  margin: auto auto;
  content: "\f144";
  cursor: pointer;
  /* pointer-events: all; */
  /* Resizing and positioning the play icon */
  font-size: calc(var(--scale) * var(--table-cell-height));
}

tbody tr:hover .playBtn:hover {
  transition: 0.3s ease;
  background-position: right;
}

.downarrow:hover {
  border-top-color: #5b5e62;
  transform: scale(1.25);
  transition: ease-in-out;
}
.arrow {
  cursor: pointer;
}

@media (max-width: 768px) {
  .playlist-table {
    font-size: 1.6rem !important;
  }
  .sort-icon {
    font-size: 1.15em !important;
  }
}
</style>
