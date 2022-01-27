<template>
  <div class="center-container">Hello this is home. lorem1000</div>
  <div class="playlist-container"> 
    <PlaylistView />
  </div>
</template>

<script>
// @ is an alias to /src
import PlaylistView from "@/components/PlaylistView.vue";

export default {
  name: "Home",
  components: {PlaylistView},
};
</script>

<style scoped>
.center-container {
  font-size: 25px;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 100vh;
}
</style>
