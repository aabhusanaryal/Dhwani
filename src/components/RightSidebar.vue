<template>
  <div class="right-sidebar">
    <div class="sidebar-wrapper">
      <h1>Genre</h1>
      <div class="chips-container">
        <div class="chips" v-for="(mood, index) in genre" :key="index">
          {{ mood }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RightSidebar",
  props: ["genre"],
};
</script>

<style>
.right-sidebar {
  min-width: var(--left-sidebar-width);
  max-width: var(--left-sidebar-width);
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
.sidebar-wrapper {
  margin: 30px 25px;
}
</style>
