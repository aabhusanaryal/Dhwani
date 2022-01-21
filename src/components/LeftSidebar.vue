<template>
  <div class="left-sidebar">
    <center>
      <div id="logo"><img src="../assets/logo.png" alt="" /></div>
    </center>
    <div class="playlists-wrapper">
      <div
        class="playlist-card"
        v-for="(playlist, index) in playlists"
        :key="index"
      >
        <span class="text">
          {{ playlist.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftSidebar",
  props: ["playlists"],
  data() {
    return {};
  },
};
</script>

<style scoped>
#logo img {
  width: 100px;
  margin: 50px auto;
}
.left-sidebar {
  left: 0;
  min-width: var(--left-sidebar-width);
  min-height: 100vh;
  background: linear-gradient(
    85.47deg,
    rgba(53, 230, 218, 0.65) 10.3%,
    rgba(5, 145, 245, 0.47) 95.71%
  );
  /* text-align: center; */
}
.playlists-wrapper {
  /* Keeping distance from the logo */
  margin-top: 40px;
  display: flex;
  /* Setting the flex-direction to column-reverse makes sure that the latest addition is at the top */
  flex-direction: column-reverse;
  flex-wrap: wrap;
  align-items: center;
}
.playlist-card {
  font-family: "Roboto", sans-serif;
  font-size: 25px;
  width: 80%;
  background-color: #fff;
  /* padding-left: 90px; */
  margin: 10px 0;
  border-radius: 40px;
  height: 50px;
  /* Centers the text inside the card vertically. The value should be same as height */
  line-height: 50px;
}

.playlist-card:hover {
  background-color: rgb(248, 248, 248);
}

.text {
  padding-left: 35px;
  /* font-weight: bold; */
  color: var(--cyan);
}
</style>
