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
              @click="playPrevious"
              src="../assets/icons/previous.svg"
            />
          </div>
          <div>
            <img
              class="large-icon"
              id="play"
              @click="playpause"
              :src="require(`../assets/icons/${playpauseicon}.svg`)"
            />
          </div>
          <div>
            <img
              class="medium-icon"
              id="next"
              @click="playNext"
              src="../assets/icons/next.svg"
            />
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
            v-model="seekSliderPosition"
          />
        </div>
        <div class="timestamp">{{ secondsToMinutes(currentTime) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Player",
  props: ["playlists"],
  data() {
    return {
      queue: [],
      nowPlaying: 0,
      paused: true,
      seekSliderPosition: 0, // between 0 to 100
      currentTime: 0, // audio duration in seconds
    };
  },

  methods: {
    playpause() {
      // Playing if paused
      if (this.paused) {
        this.queue[this.nowPlaying].play();
        this.paused = false;
      }
      // Pausing if playing
      else {
        this.queue[this.nowPlaying].pause();
        this.paused = true;
      }
    },
    playNext() {
      this.queue[this.nowPlaying].pause();
      this.nowPlaying++;
      this.queue[this.nowPlaying].currentTime = 0;
      this.queue[this.nowPlaying].play();
      this.paused = false;
    },
    playPrevious() {
      this.queue[this.nowPlaying].pause();
      this.nowPlaying--;
      this.queue[this.nowPlaying].currentTime = 0;
      this.queue[this.nowPlaying].play();
      this.paused = false;
    },
    secondsToMinutes(seconds) {
      let minutes;
      minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60;
      minutes = minutes.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      seconds = seconds.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      return `${minutes}:${seconds}`;
    },
  },
  mounted() {
    // WEIRD CIRCULAR BUG
    // setInterval(() => {
    //   if (!this.paused) {
    //     this.seekSliderPosition =
    //       (this.queue[this.nowPlaying].currentTime /
    //         this.queue[this.nowPlaying].duration) *
    //       100;
    //   }
    // }, 500);
    // Creating audio instance of all songs
    this.playlists[0].songs.forEach((song) => {
      let audio = new Audio(require(`@/assets/songs/${song}.mp3`));
      this.queue.push(audio);
    });
  },
  computed: {
    playpauseicon() {
      return this.paused ? "play" : "pause";
    },
    // currentTime() {
    //   try {
    //     return this.queue[this.nowPlaying].currentTime;
    //   } catch {
    //     return 0;
    //   }
    // },
  },
  watch: {
    seekSliderPosition: function () {
      this.currentTime = Math.floor(
        (this.queue[this.nowPlaying].duration * this.seekSliderPosition) / 100
      );
      this.queue[this.nowPlaying].currentTime = this.currentTime;
      console.log(this.currentTime);
    },
  },
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
.slider::-moz-range-progress {
  background-color: #43e5f7;
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

/* For medium sized devices: */
@media (max-width: 1350px) {
  .player-wrapper {
    width: 80%;
  }
}
/* For small sized devices: */
@media (max-width: 980px) {
  .player-wrapper {
    width: 90%;
  }
  .large-icon {
    width: 40px;
    height: 40px;
  }
  #previous {
    margin-left: 5px;
  }
  #next {
    margin-right: 5px;
  }
  .right {
    display: none; /* Hiding volume controls in mobile devices */
  }
}
</style>
