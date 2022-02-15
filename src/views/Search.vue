<template>Query: {{ query }}</template>

<script>
export default {
  name: "Search",
  computed: {
    query() {
      return this.$route.params.searchQuery;
    },
  },
};
</script>

<style></style>
