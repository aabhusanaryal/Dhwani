<template>
  <form @submit.prevent="addPlaylist">
    <input
      type="text"
      placeholder="Enter Playlist Name"
      v-model="playlistName"
      class="name-input"
    />
    <button class="add" type="submit">+</button>
    <br />
    <span id="errMsg">
      {{ errMsg }}
    </span>
    <table>
      <thead>
        <tr>
          <th class="SN TH">#</th>
          <th class="TH">Name</th>
          <th class="TH">Artist</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(song, index) in playlists[0].songs" :key="index">
          <td class="SN">{{ index + 1 }}</td>
          <td>{{ song.name }}</td>
          <td>{{ song.artist }}</td>
          <td class="checkbox-wrapper">
            <input
              type="checkbox"
              :value="song"
              v-model="addedSongs"
              name="songCheckbox"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </form>
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
      if (this.addedSongs.length != 0) {
        if (this.playlistName) {
          this.$emit("addPlaylist", this.playlistName, this.addedSongs);
          this.$router.push("/");
        } else this.errMsg = "Please enter a name!";
      } else this.errMsg = "Please select at least one song!";
    },
  },
};
</script>

<style scoped>
form {
  margin: 10px auto;
}
table {
  font-family: "Roboto", sans-serif;
  color: #4c4e52;
  display: block;
  border-collapse: separate;
  border-spacing: 0 20px;
}
tbody {
  display: block;
  overflow-y: scroll;
  max-height: 600px;
}
td,
th {
  width: 200px;
  text-align: left;
}
.SN {
  width: 100px;
}
th {
  color: #6f7378;
  font-weight: lighter;
}
.add {
  color: white;
  height: fit-content;
  font-family: "Roboto", sans-serif;
  font-size: 25px;
  width: 50px;
  /* background: var(--active-gradient); */
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
.name-input {
  font-family: Roboto;
  font-style: normal;
  background-color: rgb(244, 245, 254);
  color: #4c4e52;
  /* border:none; */
  height: fit-content;
  font-size: 40px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom-width: 5px;
  border-image: var(--primary-gradient) 100;
  border-image-width: 0 0 3px 0;
}
input:focus-visible {
  border-top: none;
  border-right: none;
  border-left: none;
  border-image: linear-gradient(
      93.64deg,
      #35e6da 0.98%,
      rgba(5, 145, 245, 0.42),
      #35e6da 0.98%,
      rgba(16, 55, 245, 0.5) 119.65%
    )
    100;
  border-image-width: 0 0 4px 0;
  transition: 0.05s;
  outline: none;
}
input::placeholder {
  color: rgba(178, 180, 189, 255);
}
#errMsg {
  color: red;
}
</style>
