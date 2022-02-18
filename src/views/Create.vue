<template>
  <div class="center-container">
    <div>
      <h2>Create</h2>
      <div class="list-container">
        <form @submit.prevent="addPlaylist">
          <input
            type="text"
            placeholder="Enter Playlist Name"
            v-model="playlistName"
            class="name-input"
          />
          <button class="add" type="submit">+</button>
          <br />
          <!-- Error Message -->
          <span class="err">
            {{ errMsg }}
          </span>
          <table class="playlist-table">
            <thead>
              <tr>
                <th class="first-col"></th>
                <th>Title</th>
                <th>Artist</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(song, index) in playlists[0].songs"
                :key="index"
                @click="addSong(song)"
              >
                <td class="first-col">
                  <div class="flex-center">
                    <input
                      type="checkbox"
                      :value="song"
                      v-model="addedSongs"
                      name="songCheckbox"
                      :id="index"
                    />
                    <!-- Label required for styling checkbox -->
                    <label :for="index"></label>
                  </div>
                </td>
                <td>{{ song.name }}</td>
                <td>{{ song.artist }}</td>
                <td>{{ secondsToMinutes(song.duration) }}</td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["playlists"],
  data() {
    return {
      addedSongs: [],
      playlistName: "",
      errMsg: "",
    };
  },
  mounted() {
    this.errMsg = "";
  },
  methods: {
    addPlaylist() {
      if (this.addedSongs.length == 0) {
        this.errMsg = "Please add at least one song!";
        return;
      }
      if (!this.playlistName) {
        this.errMsg = "Playlist name can't be empty.";
        return;
      }
      let sameName = false;
      this.playlists.forEach((playlist) => {
        if (playlist.name.toLowerCase() == this.playlistName.toLowerCase()) {
          sameName = true;
        }
      });
      if (sameName) {
        this.errMsg = "A playlist with the same name already exists.";
        return;
      }
      this.$emit("addPlaylist", this.playlistName, this.addedSongs);
      this.$router.push("/");
    },
    addSong(song) {
      // This function is used to add songs by clicking to the table row, and not just the checkbox
      this.addedSongs.push(song);
    },
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
h2 {
  margin-bottom: 20px;
  background-image: var(--heading-gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/*  */

form {
  width: fit-content;
  font-size: 23px;
}
.name-input {
  font-family: Roboto;
  font-style: normal;
  background-color: rgba(0, 0, 0, 0);
  /* border:none; */
  height: fit-content;
  font-size: 40px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom-width: 5px;
  border-image: var(--primary-gradient) 90;
  border-image-width: 0 0 3px 0;
}
.name-input:focus-visible {
  border-top: none;
  border-right: none;
  border-left: none;
  border-image: var(--active-gradient) 100;
  border-image-width: 0 0 3px 0;
  transition: 0.5s;
  outline: none;
}
input::placeholder {
  color: rgba(178, 180, 189, 255);
}
.add {
  color: white;
  height: fit-content;
  font-size: 30px;
  font-family: "Roboto", sans-serif;
  width: 50px;
  background-image: var(--merged-gradient);
  background-size: 200%;
  background-position: left;
  border: none;
  margin: 10px 25px;
  border-radius: 30px;
  height: 50px;
  transition: 0.5s;
}
.add:hover {
  background-position: right;
  cursor: pointer;
}

input[type="checkbox"] {
  display: none;
}
label {
  position: relative;
  cursor: pointer;
}
label::before {
  content: "";
  background: url("../assets/tick.svg");
  background-position: center;
  background-size: contain;
  width: 25px;
  height: 25px;
  position: absolute;
  top: -12px;
  transform: scale(0) rotateZ(180deg);
  transition: all 0.3s cubic-bezier(0.54, 0.01, 0, 1.49);
}

input[type="checkbox"]:checked + label::before {
  transform: scale(1) rotateZ(0);
}

input[type="checkbox"]:checked + label::after {
  transform: scale(0) rotateZ(180deg);
}

label::after {
  content: "";
  border: 2px solid #35e6da;
  width: 20px;
  height: 20px;
  position: absolute;
  top: -12px;
  border-radius: 100%;
}

/* 

*/

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
.flex-center {
  width: 100%;
  display: flex;
  justify-content: center;
}
th {
  color: #84898f;
  font-weight: lighter;
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
  cursor: pointer;
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
</style>
