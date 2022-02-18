<template>
  <div class="mobile" role="navigation">
    <div class="mobile-nav">
      <center>
        <div id="logo">
          <router-link to="/"
            ><img src="../assets/logo.svg" alt="Dhwani Logo"
          /></router-link>
        </div>
      </center>
    </div>
  </div>
  <div class="left-sidebar desktop" role="navigation">
    <center>
      <div id="logo">
        <router-link to="/"
          ><img src="../assets/logo.svg" alt="Dhwani Logo"
        /></router-link>
      </div>
    </center>

    <div class="playlists-wrapper">
      <!-- Playlist Link Card Start -->
      <!-- We're rendering router-link as adiv rather than an anchor -->
      <router-link :to="`/create`" custom v-slot="{ navigate }">
        <div
          :class="$route.path === `/create` ? 'active-card' : ''"
          class="playlist-card link"
          @click="navigate"
          @keypress.enter="navigate"
          role="link"
          tabindex="0"
        >
          <span class="text"> Create Playlist </span>
        </div>
      </router-link>
      <router-link
        :to="`/playlist/${playlist.name}`"
        custom
        v-for="(playlist, index) in playlists"
        :key="index"
        v-slot="{ navigate }"
      >
        <div
          :class="
            $route.path === `/playlist/${playlist.name}` ? 'active-card' : ''
          "
          class="playlist-card link"
          @click="navigate"
          @keypress.enter="navigate"
          role="link"
          tabindex="0"
        >
          <span class="text">
            <!-- Only showing the first 12 chars of playlist.name followed by a ... if needed -->
            {{
              playlist.name.length > 15
                ? `${playlist.name.slice(0, 15)}...`
                : `${playlist.name}`
            }}
          </span>
        </div>
      </router-link>
      <!-- Playlist Link Card End -->
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
  width: 100%;
  min-height: 100vh;
  background: white;
  z-index: 100;
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
  font-weight: 500;
  width: 80%;
  background-image: var(--merged-gradient);
  background-size: 200%;
  background-position: left;
  /* padding-left: 90px; */
  margin: 10px 0;
  border-radius: 10px;
  height: 60px;
  /* Centers the text inside the card vertically. The value should be same as height */
  line-height: 60px;
  transition: 0.5s;
}

.playlist-card:hover,
.playlist-card:focus {
  background-position: right;
  /* background: var(--hover-gradient); */
}

.active-card {
  background: var(--active-gradient) !important;
}
.text {
  padding-left: 35px;
  /* font-weight: bold; */
  color: white;
}
@media (max-width: 768px) {
  /* Mobile view */
  .desktop {
    display: none;
  }
  #logo {
    height: 100%;
  }
  #logo img {
    margin: 10px;
    height: 70px;
  }
  .mobile {
    width: 100%;
    height: 100%;
    padding-bottom: 10px;
    background: white;
  }
}
@media (min-width: 769px) {
  .mobile {
    display: none;
  }
}
</style>
