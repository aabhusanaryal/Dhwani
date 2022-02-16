<template>
  <div class="right-sidebar">
    <div class="sidebar-wrapper">
      <h1>Genre</h1>
      <div class="chips-container">
        <div
          class="chips"
          :class="filter.includes(genre) ? 'active-chips' : ''"
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
      filter: [],
    };
  },
  methods: {
    filterGenre(genre) {
      // Toggling the filter on/ off
      if (this.filter.includes(genre)) {
        // If the filter already exists, removing the filter
        this.filter = this.filter.filter((el) => el != genre); // This line removes genre from this.filter
      } else this.filter.push(genre); // If the filter doesn't already exist in this.filter, appending it
      // Updating the query params in URL
      this.$router.push({ query: { genre: this.filter } });
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
  line-height: 30px;
  text-align: center;
  background: white;
  margin: 5px;
  padding: 10px;
  border-radius: 50px;
  cursor: pointer;
  transition: 0.3s ease;
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
