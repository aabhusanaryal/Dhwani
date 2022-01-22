<template>
  <div class="player-container flex">
    <div class="player-wrapper flex flex-column">
      <!-- Top bar containes favourites..., music controls and volume controls -->
      <div class="top-bar flex">
        <!-- Left contains favourite, add to playlist -->
        <div class="left flex">
          <div><img src="../assets/icons/heart.svg" /></div>
          <div><img src="../assets/icons/playlist_add.svg" /></div>
        </div>
        <!-- Center contains music controls -->
        <div class="center flex">
          <div><img src="../assets/icons/loop.svg" /></div>
          <div><img src="../assets/icons/previous.svg" /></div>
          <div><img src="../assets/icons/pause.svg" /></div>
          <div><img src="../assets/icons/next.svg" /></div>
          <div><img src="../assets/icons/shuffle.svg" /></div>
        </div>
        <!-- Right contains volume controls -->
        <div class="right flex">
          <div><img src="../assets/icons/volume_low.svg" /></div>
          <div><img src="../assets/icons/volume_high.svg" /></div>
        </div>
      </div>
      <!-- Bottom bar contains audio timestamp and seek controls -->
      <div class="bottom-bar flex">
        <div class="timestamp">time1</div>
        <div class="seek-bar-div">
          <input type="range" class="seek-bar-input" />
        </div>
        <div class="timestamp">time2</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Player",
};
</script>

<style scoped>
.flex {
  display: flex;
}
.flex-column {
  flex-direction: column;
}

.player-container {
  width: 100%;
  position: fixed;
  bottom: 30px;
  justify-content: center;
}
.player-wrapper {
  background: white;
  border-radius: 30px;
  width: 57%;
  min-height: 16vh;
}
.left,
.right {
  width: 80px;
  align-items: center;
}
.center {
  width: 300px;
  align-items: center;
}
.top-bar {
  margin-top: 40px;
}
.top-bar,
.left,
.center,
.right {
  justify-content: space-around;
}

.bottom-bar {
  margin-top: 20px;
  width: 100%;
  justify-content: center;
}
.seek-bar-div {
  flex-grow: 0.8;
}
.seek-bar-input {
  width: 100%;
}
img {
  width: 30px;
  height: 30px;
}
</style>
