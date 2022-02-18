<template>
  <div class="search-bar-container">
    <input
      type="text"
      name="search-bar"
      id="search-bar-input"
      placeholder="Search"
      v-model="searchQuery"
      @keypress="search"
      @keydown.backspace="search"
      autocomplete="off"
    />
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      data: "hello this is search",
      searchQuery: "",
      pastRoute: null,
    };
  },
  methods: {
    search() {
      setTimeout(() => {
        this.$router.replace({
          name: "Search",
          params: { searchQuery: this.searchQuery },
        });
      }, 0);
    },
  },

  watch: {
    $route(to, from) {
      if (to.name != from.name) {
        this.pastRoute = from;
      }
      if (to.name != "Search") this.searchQuery = "";
    },
  },
};
</script>

<style>
.search-bar-container {
  max-width: 100%;
  display: flex; /* To center the search bar */
  justify-content: center;
  padding-top: 1.2rem;
}
#search-bar-input {
  height: 25px;
  outline: none;
  border: none;
  width: 70%;
  border-radius: 99999em;
  padding: 10px 30px;
}
#search-bar-input:focus {
  /* border: 1px solid red; */
}
@media (max-width: 786px) {
  .search-bar-container {
    padding-top: 20px;
  }
}
</style>
