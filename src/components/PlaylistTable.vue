<template>
  <div class="list-container">
    <table class="playlist-table">
      <thead>
        <tr>
          <th>
            Title
            <div class="sort-icon">
              <div @click="sortTitleAsc" class="uparrow"></div>
              <div @click="sortTitleDesc" class="downarrow"></div>
            </div>
          </th>
          <th>
            Artist
            <div class="sort-icon">
              <div @click="sortArtistAsc" class="uparrow"></div>
              <div @click="sortArtistDesc" class="downarrow"></div>
            </div>
          </th>
          <th>
            Duration
            <div class="sort-icon">
              <div @click="sortDurationAsc" class="uparrow"></div>
              <div @click="sortDurationDesc" class="downarrow"></div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(song, index) in genresongs" :key="index">
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
  },
  computed: {
    genresongs: function () {
      //if genre is not loaded, show all songs of the playlist
      if (!this.$route.query.genre) {
        return this.playlist.songs;
      }
      //if genre
      else if (this.$route.query.genre.length != 0) {
        const arr = [];
        for (let i = 0; i < this.playlist.songs.length; i++) {
          for (let j = 0; j < this.$route.query.genre.length; j++) {
            //check genre of playlist.songs[i] with genre query's list
            if (
              this.playlist.songs[i].genres.includes(
                this.$route.query.genre[j]
              ) &&
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
  font-size: 1.82rem;
  background: var(--white);
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
}

table {
  text-align: center;
  color: #646569;
  border-spacing: 1px 20px;
}
tbody {
  display: block;
  overflow-y: scroll;
}
thead {
  display: block;
  height: 50px;
}
td,
th {
  text-align: center !important;
  vertical-align: middle;
  width: 300px;
  text-align: left;
}
th {
  color: #84898f;
  font-weight: lighter;
}

.sort-icon {
  display: inline-block;
  position: relative;
}
.uparrow {
  position: absolute;
  left: 0;
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

.downarrow:hover {
  border-top-color: #5b5e62;
  transform: scale(1.25);
  transition: ease-in-out;
}
</style>
