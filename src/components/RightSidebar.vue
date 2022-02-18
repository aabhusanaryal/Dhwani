<template>
  <div class="right-sidebar">
    <div class="sidebar-wrapper">
      <h2 class="gradient-text">Moods</h2>
      <div class="chips-container">
        <div
          class="chips"
          :class="filterGenres.includes(genre) ? 'active-chips' : ''"
          v-for="(genre, index) in genres"
          :key="index"
          @click="filterGenre(genre)"
        >
          {{ genre }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RightSidebar",
  props: ["genres"],
  data() {
    return {
      filterGenres: [],
    };
  },
  methods: {
    filterGenre(genre) {
      // Toggling the filter on/ off
      if (this.filterGenres.includes(genre)) {
        // If the filter already exists, removing the filter
        this.filterGenres = this.filterGenres.filter((el) => el != genre); // This line removes genre from this.filter
      } else this.filterGenres.push(genre); // If the filter doesn't already exist in this.filter, appending it
      // Updating the query params in URL
      this.$router.push({ query: { genre: this.filterGenres } });
    },
  },
  watch: {
    $route(to, from) {
      // Removing the filters when the route is changed
      if (to.path != from.path) this.filterGenres = [];
    },
  },
};
</script>

<style scoped>
.right-sidebar {
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;
  /* text-align: center; */
  overflow: hidden;
}
.chips-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;
}
h1 {
  font-size: 3.3rem;
}
.chips {
  width: 70px;
  height: 30px;
  user-select: none; /* Making the text unselectable */
  line-height: 30px;
  text-align: center;
  background: white;
  margin: 5px;
  padding: 10px;
  border-radius: 50px;
  cursor: pointer;
  transition: 0.1s ease;
  font-family: "Roboto", sans-serif;
}
.chips:hover {
  background: rgb(241, 240, 240);
}
.active-chips {
  background: var(--active-gradient) !important;
  color: white;
}
.sidebar-wrapper {
  margin: 30px 25px;
}
</style>
