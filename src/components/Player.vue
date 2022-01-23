<template>
  <div class="player-container flex">
    <div class="player-wrapper flex flex-column">
      <!-- Top bar containes favourites..., music controls and volume controls -->
      <div class="top-bar grid">
        <!-- Left contains favourite, add to playlist -->
        <div class="left flex">
          <div><img src="../assets/icons/heart.svg" /></div>
          <div><img src="../assets/icons/playlist_add.svg" /></div>
        </div>
        <!-- Center contains music controls -->
        <div class="center flex">
          <div><img src="../assets/icons/loop.svg" /></div>

          <div>
            <img
              class="medium-icon"
              id="previous"
              src="../assets/icons/previous.svg"
            />
          </div>
          <div>
            <img class="large-icon" id="play" src="../assets/icons/play.svg" />
          </div>
          <div>
            <img class="medium-icon" id="next" src="../assets/icons/next.svg" />
          </div>

          <div><img src="../assets/icons/shuffle.svg" /></div>
        </div>
        <!-- Right contains volume controls -->
        <div class="right flex">
          <div><img src="../assets/icons/volume_low.svg" /></div>
          <div class="volume-bar-div">
            <input type="range" class="volume-bar-input slider" />
          </div>
          <div><img src="../assets/icons/volume_high.svg" /></div>
        </div>
      </div>
      <!-- Bottom bar contains audio timestamp and seek controls -->
      <div class="bottom-bar flex">
        <div class="timestamp">time1</div>
        <div class="seek-bar-div">
          <input
            type="range"
            class="seek-bar-input slider"
            min="0"
            max="100"
            value="50"
          />
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
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  justify-items: center;
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
  min-height: 17.5vh;
}
.left {
  width: 80px;
  justify-content: flex-start;
  gap: 12px;
  justify-self: left;
}
.right {
  width: 155px;
  gap: 12px;
  justify-self: right;
}
.center {
  width: 200px;
  gap: 15px;
  align-items: center;
}
.top-bar {
  margin-top: 40px;
  width: 85%;
  align-self: center;
}

.top-bar,
.center {
  align-items: center;
  justify-content: center;
}

.bottom-bar {
  margin-top: 15px;
  width: 85%;
  height: 30px;
  align-items: center;
  align-self: center;
  justify-content: stretch;
}
.seek-bar-div {
  flex: 1;
  align-self: flex-start;
}
.seek-bar-input {
  width: 100%;
}

.slider {
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: 3px; /* Specified height */
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;
  /* border-radius: 50%; */
  cursor: pointer;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default CSS styles */
  height: 10px;
  width: 10px;
  border: 4px solid rgb(53, 53, 53);
  border-radius: 50%;
  /* background: black; */
}
.slider::-webkit-slider-thumb:hover {
  border: 4px solid rgb(42, 42, 42);
  height: 12px;
  width: 12px;
}
.medium-icon {
  width: 25px;
  height: 25px;
}
.large-icon {
  width: 50px;
  height: 50px;
}
img {
  width: 20px;
  height: 20px;
}
#previous {
  margin-left: 20px;
}
#next {
  margin-right: 20px;
}
</style>
