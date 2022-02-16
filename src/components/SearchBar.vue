<template>
  <div class="search-bar-container">
    <input
      type="text"
      name="search-bar"
      id="search-bar-input"
      placeholder="Search"
      v-model="searchQuery"
      @keypress="search"
      @keydown.backspace="backspace"
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
    backspace() {
      if (this.searchQuery && this.searchQuery.length != 1) {
        this.search();
      }
    },
  },

  watch: {
    $route(to, from) {
      // console.log(to.name, )
      if (to.name != from.name) {
        this.pastRoute = from;
        console.log(this.pastRoute);
      }
      if (to.name != "Search") this.searchQuery = "";
    },
    searchQuery(query) {
      if (!query) this.$router.push(this.pastRoute);
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
