<template>
  <div class="trending-container">
    <div class="trending-wrapper">
      <h2><span class="gradient-text">Trending</span>🔥</h2>
      <div
        class="trending-card-wrapper"
        :style="`background: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ), url(${song.cover});`"
      >
        <div class="content-wrapper">
          <h3 id="artist">{{ song ? song.artist : "" }}</h3>
          <h1 id="song-name">{{ song ? song.name : "" }}</h1>
          <button id="play" @click="playSong">Play</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrendingCard",
  props: ["song"],
  emits: ["playSong"],
  methods: {
    playSong() {
      this.$emit("playSong", this.song);
    },
  },
};
</script>

<style scoped>
.trending-container {
  width: 100%;
}
.trending-wrapper {
  padding: 2.7rem;
  padding-top: 0rem;
  padding-bottom: 0.5rem;
}

.trending-card-wrapper {
  /* The following two properties can be used to make image full size */
  background-size: 60% !important;
  background-position-y: center !important;
  background-position-x: center !important;
  /* background-repeat: no-repeat !important; */
  height: 16rem;
  border-radius: 1.5rem;
  color: white;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
}
.content-wrapper {
  padding-left: 2rem;
  padding-top: 1rem;
}
h3 {
  font-size: 1.5rem;
  color: var(--light-grey);
  font-weight: 200;
}
.gradient-text {
  background-image: var(--heading-gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
h1 {
  font-size: 5rem;
}
button {
  border: none;
  border-radius: 1rem;
  width: 6.3rem;
  height: 2.7rem;
  background-image: var(--grey-gradient);
  background-size: 200%;
  background-position: left;
  transition: 0.4s;
  font-size: 1.3rem;
  padding: 0.4rem 0.2rem;
  cursor: pointer;
}
button:hover {
  background-position: right;
}
</style>
