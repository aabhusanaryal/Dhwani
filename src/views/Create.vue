<template>
  <form @submit.prevent="addPlaylist">
    <div class="main-wrapper">
      <input
        type="text"
        placeholder="Enter Playlist Name"
        v-model="playlistName"
        class="name-input"
      />
      <button class="add" type="submit">+</button>
      <br />
      <span id="error-msg">
        {{ errMsg }}
      </span>
      <table>
        <thead>
          <tr>
            <th class="sn">#</th>
            <th>Name</th>
            <th>Artist</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(song, index) in playlists[0].songs" :key="index">
            <td class="sn">{{ index + 1 }}</td>
            <td>{{ song.name }}</td>
            <td>{{ song.artist }}</td>
            <td class="checkbox-wrapper">
              <input
                type="checkbox"
                :value="song"
                v-model="addedSongs"
                name="songCheckbox"
                :id="index"
              />
              <label :for="index"></label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
  width: fit-content;
  margin: 0 auto;
  font-size: 23px;
  font-family: "Roboto", sans-serif;
}
.main-wrapper {
  padding-left: 50px;
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
#error-msg {
  color: red;
}
table {
  color: #646569;
  display: block;
  border-collapse: separate;
  border-spacing: 0 20px;
}
tbody {
  display: block;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 550px;
}
thead {
  display: block;
  height: 50px;
}
td,
th {
  text-align: center !important;
  width: 400px;
  text-align: left;
}
th {
  color: #84898f;
  font-weight: lighter;
}
.sn {
  width: 100px;
}
.checkbox-wrapper {
  width: 50px;
}
input[type="checkbox"]{
  display:none;
}
label{
    position: relative;
}
label::before {
  content: "";
  background: url("../assets/tick.svg");
  background-position: center;
  background-size: contain;
  width: 25px;
  height: 25px;
  position: absolute;
  left:-30px;
  top: -10px;
  transform: scale(0) rotateZ(180deg);
  transition: all 0.5s cubic-bezier(0.54,0.01,0,1.49);
}

input[type="checkbox"]:checked + label::before{
  transform: scale(1) rotateZ(0);
}
input[type="checkbox"]:checked + label::after{
  transform: scale(0) rotateZ(180deg);
}

label::after{
  content: "";
  border: 2px solid black;
  width:20px;
  height: 20px;
  position: absolute;
  left: -30px;
  top: -10px;
  border-radius: 100%;
}

/*MEDIA QUERIES*/
@media screen and (max-width: 1350px) {
  .main-wrapper {
    padding-left: 30px;
  }
  .name-input {
    font-size: 35px;
    border-bottom-width: 4px;
  }
  .add {
    font-size: 25px;
    width: 45px;
    height: 45px;
    margin: 8px 20px;
    border-radius: 30px;
    transition: 0.5s;
  }
  table {
    border-spacing: 0 20px;
  }
  thead {
    height: 45px;
  }
  td,
  th {
    width: 270px;
  }
}
@media screen and (max-width: 768px) {
  form {
    font-size: 18px;
  }
  .main-wrapper {
    padding-left: 20px;
  }
  table {
    border-spacing: 0 27px;
  }
  td,
  th {
    max-width: 200px;
  }
}
</style>
