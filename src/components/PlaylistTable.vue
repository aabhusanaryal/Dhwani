<template>
  <div class="list-container">
      <table class="playlist-table">
          <thead>
              <tr>
                  <th>Title</th>
                  <th>Artist</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(song, index) in genresongs" :key="index">
                  <td>{{ song.name }}</td>
                  <td>{{ song.artist }}</td> 
              </tr>
            </tbody>
      </table>
  </div>
</template>

<script>
export default {
    props :['playlist'], 
    computed: {
        genresongs: function(){
            if(!this.$route.query.genre) {
                return this.playlist.songs;
            }
            else if(this.$route.query.genre.length == 0){
                return this.playlist.songs;
            }
            else if(this.$route.query.genre.length != 0){
                const arr = [];
                for(let i =0; i<this.playlist.songs.length; i++){
                    for(let j=0; j<this.$route.query.genre.length; j++){
                        if(this.playlist.songs[i].genres.includes(this.$route.query.genre[j]) && !arr.includes(this.playlist.songs[i])){
                            arr.push(this.playlist.songs[i]);
                        }
                    }
                }
                return arr;
            }
            else{
                return this.songlist;
            }
        }
    }
}
</script>

<style scoped>

.playlist-title{
    padding: 15px;
    color: var(--blue);
    font-size: 2.25rem;
}

.list-container{
    display:flex;
    background: var(--white);
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
}

table {
    width: 100%;
    padding: 10px;
    border-collapse: collapse;
    margin-left: 10px;
    margin-right: auto;
    text-align: center;
    font-size:2rem;
}

th>tr{
    background: var(--white);
}

tr:nth-child(even){
    background: var(--blue);
}
tbody>tr:nth-child(odd){
    background: var(--light-grey)
}
</style>