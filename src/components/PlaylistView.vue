<template>
  <div class="list-container">
      <div class="trending-card"></div>
      <h1 class="playlist-title">Playlist Title</h1>
      <table class="playlist-table">
          <thead>
              <tr>
                  <th>Title</th>
                  <th>Artist</th>
              </tr>
          </thead>
          <tbody>
    
              <tr v-for="(song, index) in songlist" :key="index">
                  <td>{{ song.name }}</td>
                  <td>{{ song.artist }}</td> 
              </tr>
            </tbody>
      </table>
  </div>
</template>

<script>
export default {
    props :['songlist']
}
</script>

<style scoped>

.list-container{
    display:flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
}

.trending-card{
    width: 40px;
    height: 2 rem;
    background-color: violet;
}

table > tbody> tr{
    background: white;
    width: 100%;
    height: 7.2rem;
    outline: 1px solid blue;
    text-align: center;
}
table{
    width: 100%;
}

table > thead > tr{
    width: 100%;
    height: 2rem;
    outline: 1px solid blue;
}

</style>