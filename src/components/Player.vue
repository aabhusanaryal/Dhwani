<template>
  <div class="song-info-container">
    <div class="song-info-wrapper">
      <div class="cover-art-container">
        <img :src="nowPlaying.cover" alt="" class="cover-art" />
        <div id="song-info">
          <div id="song-name">{{ nowPlaying.name }}</div>
          <div id="artist-name">{{ nowPlaying.artist }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="player-container flex">
    <div class="player-wrapper flex flex-column">
      <!-- Top bar containes favourites..., music controls and volume controls -->
      <div class="top-bar grid">
        <!-- Left contains favourite, add to playlist -->
        <div class="left flex">
          <div>
            <img
              :src="
                require(nowPlaying.isFav
                  ? '../assets/icons/heart_fill.svg'
                  : '../assets/icons/heart.svg')
              "
              class="icon"
              @click="updateFavourites"
            />
          </div>
          <div><img src="../assets/icons/playlist_add.svg" class="icon" /></div>
        </div>
        <!-- Center contains music controls -->
        <div class="center flex">
          <div>
            <img
              src="../assets/icons/loop.svg"
              class="icon"
              :class="looping ? 'green-icon' : ''"
              @click="toggleLoop"
            />
          </div>
          <div>
            <img
              class="medium-icon icon"
              id="previous"
              @click="playPrevious"
              src="../assets/icons/previous.svg"
            />
          </div>
          <div>
            <img
              class="large-icon icon"
              id="play"
              @click="this.paused ? this.play() : this.pause()"
              :src="require(`../assets/icons/${playpauseicon}.svg`)"
            />
          </div>
          <div>
            <img
              class="medium-icon icon"
              id="next"
              @click="playNext"
              src="../assets/icons/next.svg"
            />
          </div>

          <div @click="shuffle">
            <img src="../assets/icons/shuffle.svg" class="icon" />
          </div>
        </div>
        <!-- Right contains volume controls -->
        <div class="right flex">
          <div>
            <img
              src="../assets/icons/volume_low.svg"
              @click="volume > 10 ? (volume -= 10) : (volume = 0)"
              class="icon"
            />
          </div>
          <div class="volume-bar-div">
            <input
              type="range"
              class="volume-bar-input slider"
              :style="`background-size: ${volume}% 100%;`"
              v-model="volume"
            />
          </div>
          <div>
            <img
              src="../assets/icons/volume_high.svg"
              @click="volume < 90 ? (volume += 10) : (volume = 100)"
              class="icon"
            />
          </div>
        </div>
      </div>
      <!-- Bottom bar contains audio timestamp and seek controls -->
      <div class="bottom-bar flex">
        <div class="timestamp">{{ secondsToMinutes(currentTime) }}</div>
        <div class="seek-bar-div">
          <input
            type="range"
            class="seek-bar-input slider"
            :style="`background-size: ${
              (seekSliderPosition / seekBarMaxRange) * 100
            }% 100%;`"
            min="0"
            :max="seekBarMaxRange"
            v-model="seekSliderPosition"
            @input="seekTrack"
          />
        </div>
        <div class="timestamp">
          {{
            nowPlaying.duration
              ? secondsToMinutes(nowPlaying.duration - currentTime)
              : "00:00"
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DLL from "../DLL.js";
export default {
  name: "Player",
  props: ["playlists"],
  emits: ["updateFavourites"],
  data() {
    return {
      queue: new DLL(), // Holds a DLL containing currently playing songs
      nowPlaying: null, // Holds the currently playing song object
      paused: true, // Is the music currently paused?
      seekSliderPosition: 0, // between 0 to seekBarMaxRange
      currentTime: 0, // audio duration in seconds
      seekBarMaxRange: 1000, // higher the better
      volume: 5,
      audioArr: [],
    };
  },

  // How does a song play? The complete workflow.

  // When the app is first loaded, a playlist containing all songs is created in App.vue, which is then
  // passed to Player.vue, as a prop. This songs of this playlist is then added to the queue (a DLL).
  // Then, the first song of the queue is loaded using the loadSong method. This initial queueing and
  // loading happens takes place in the mounted hook. The user may then play the song.

  // To play a song, it must first be loaded using the loadSong method and then can be played using the
  // play method.

  // loadSong(songObj)
  // To play a song, we must create an Audio object. This is done by the loadSong method. It takes in
  // songObj as a parameter, and finds the song in @assets/songs/ and creates an Audio object. This
  // Audio object is then stored as songObj.audio and also as this.nowPlaying. To avoid multiple songs
  // being played simultaneously, we first pause the nowPlaying song while loading a new song.

  // play()
  // This method doesn't take in any argument. It simply calls the play() method of the nowPlaying.audio and
  // also sets this.paused = false

  // pause()
  // Polar opposite of play()

  // playNext()
  // Moves the head of the queue to the next song, and plays the song

  // playPrevious()
  // Polar opposite of playNext()

  methods: {
    shuffle() {
      this.queue.shuffle();
    },
    loop() {
      this.queue.loop();
    },
    unloop() {
      this.queue.unloop();
    },
    loadSong(songObj) {
      // Creates an Audio object for the current song if it already doesn't have one
      // and sets it as the nowPlaing song
      this.pause();
      if (songObj.audio == null) {
        songObj.audio = new Audio(
          require(`@/assets/songs/${songObj.path}.mp3`)
        );
      }
      this.nowPlaying = songObj;
      this.nowPlaying.audio.currentTime = 0;
      this.nowPlaying.audio.volume = this.volume / 100;
    },
    play() {
      // Plays this.nowPlaying.audio
      if (this.nowPlaying) {
        this.paused = false;
        this.nowPlaying.audio.play();
      }
    },
    pause() {
      // Pauses this.nowPlaying.audio
      if (this.nowPlaying) {
        this.paused = true;
        this.nowPlaying.audio.pause();
      }
    },
    playNext() {
      this.loadSong(this.queue.next());
      this.play();
    },
    playPrevious() {
      this.loadSong(this.queue.previous());
      this.play();
    },
    seekTrack() {
      // Calculating the current time based on the seek slider position.
      this.currentTime =
        (this.nowPlaying.audio.duration * this.seekSliderPosition) /
        this.seekBarMaxRange;
      this.nowPlaying.audio.currentTime = this.currentTime;
    },
    // This method is called from App.vue
    playPlaylist(playlistName) {
      // This takes in the name of playlist as argument, finds that playlist in the playlists array
      // and starts playing it

      // Finding the corrent playlist
      let playlist = this.playlists.filter(
        (playlist) => playlist.name == playlistName
      )[0];
      // Replacing the current queue with the new playlist
      this.queue.clear();
      this.queuePlaylist(playlist);
      // Loading the first song of the new queue and playing it
      this.loadSong(this.queue.head());
      this.play();
    },
    // This method is called from App.vue
    playSong(song) {
      this.queue.clear();
      this.queue.addArray([song]);
      this.loadSong(this.queue.head());
      this.play();
    },
    queuePlaylist(playlist) {
      // Takes a playlist object and queues the songs of that playlist to the current queue
      let arr = playlist.songs;
      this.queue.addArray(arr);
    },
    updateFavourites() {
      this.$emit("updateFavourites", this.nowPlaying);
    },
    toggleLoop() {
      if (this.looping) this.queue.unloop();
      else this.queue.loop();
    },
    // Methods not realted to the functionality of the player are below this line
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
  created() {
    setInterval(() => {
      // Moving the slider head depending upon the currentTime of the song
      if (!this.paused) {
        this.seekSliderPosition =
          (this.nowPlaying.audio.currentTime / this.nowPlaying.audio.duration) *
          this.seekBarMaxRange;
        this.currentTime = this.nowPlaying.audio.currentTime;
        if (this.nowPlaying.audio.ended) {
          // i.e after one song finishes playing, play next song
          this.playNext();
        }
      }
    }, 250);

    // When the app is first load, populating queue with all songs
    this.queuePlaylist(this.playlists[0]);
    this.loadSong(this.queue.head());

    // Keyboard Shortcuts
    document.addEventListener("keydown", (e) => {
      if (
        !(
          document.activeElement.tagName == "INPUT" &&
          document.activeElement.type == "text"
        )
      ) {
        // Only executing the kb shortcuts if no text field is focused
        // Play pause with spacebar start
        if (e.code == "Space") this.paused ? this.play() : this.pause();
        // Play pause with spacebar end

        // Volume up and down with Ctrl + UP / DOWN start
        if (e.ctrlKey && e.code == "ArrowUp")
          this.volume < 90 ? (this.volume += 10) : (this.volume = 100);
        if (e.ctrlKey && e.code == "ArrowDown")
          this.volume > 10 ? (this.volume -= 10) : (this.volume = 0);
        // Volume up and down with Ctrl + UP / DOWN end

        // VSeek with Ctrl + LEFT/RIGHT start
        if (e.ctrlKey && e.code == "ArrowRight") {
          this.seekSliderPosition += 30;
          this.seekTrack();
        }
        if (e.ctrlKey && e.code == "ArrowLeft") {
          this.seekSliderPosition -= 30;
          this.seekTrack();
        }
      }
    });
  },
  computed: {
    playpauseicon() {
      // playpauseicon = "play" or "pause" depending on the current state of the player
      return this.paused ? "play" : "pause";
    },
    currentComputedTime() {
      // returns the currentTime (in seconds) of the currently playing song, if any song is playing.
      // else returns 0
      try {
        return this.nowPlaying.audio.currentTime;
      } catch {
        return 0;
      }
    },
    looping() {
      return this.queue.looping;
    },
  },
  watch: {
    volume: function () {
      this.nowPlaying.audio.volume = this.volume / 100;
    },
    seekSliderPosition: function (prev, next) {
      // This code is here to fix a stupid bug in which the slider goes to 50% when a new song is buffering
      if (isNaN(prev) || isNaN(next)) this.seekSliderPosition = 0;
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
  background-image: linear-gradient(black, black);
  background-repeat: no-repeat;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default CSS styles */
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: black;
}
.slider::-webkit-slider-thumb:hover {
  border: 4px solid rgb(42, 42, 42);
  height: 12px;
  width: 12px;
}
.slider::-moz-range-progress {
  background-color: #43e5f7;
}
.icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.medium-icon {
  width: 25px;
  height: 25px;
}
.large-icon {
  width: 50px;
  height: 50px;
}
.green-icon {
  filter: invert(50%) sepia(61%) saturate(1861%) hue-rotate(82deg)
    brightness(120%) contrast(121%);
}
.icon:hover {
  /* FIXME - Fine tune the color */
  filter: invert(47%) sepia(1%) saturate(1663%) hue-rotate(20deg)
    brightness(91%) contrast(94%);
}
.green-icon:hover {
  filter: invert(94%) sepia(85%) saturate(5818%) hue-rotate(100deg)
    brightness(104%) contrast(102%);
}
#previous {
  margin-left: 20px;
}
#next {
  margin-right: 20px;
}

/* Song info card */
.song-info-container {
  width: var(--left-sidebar-width);
  height: calc(var(--left-sidebar-width) + 40px);
  position: fixed;
  bottom: 10px;
  right: 0px;
  padding: 20px;
}
.song-info-wrapper {
  margin-left: 10%;
  margin-top: 10%;
  background: white;
  border-radius: 8%;
  width: 90%;
  height: 90%;
  display: flex;
  justify-content: center;
}

.cover-art-container {
  padding-top: 25px;
  /* text-align: center; */
}
.cover-art {
  width: calc(var(--left-sidebar-width) - 85px);
  height: calc(var(--left-sidebar-width) - 85px);
  border-radius: 8%;
}

#song-info {
  padding-left: 5px;
}
#song-name {
  font-size: 24px;
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
