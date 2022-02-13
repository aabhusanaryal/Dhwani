<template>
  <div class="list-container">
      <h1 class="playlist-title">{{$route.params.playlist}}</h1>
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
    props :['songlist'], 
    computed: {
        genresongs: function(){
            if(!this.$route.query.genre) {
                return this.songlist;
            }
            else if(this.$route.query.genre.length == 0){
                return this.songlist;
            }
            else if(this.$route.query.genre.length != 0){
                const arr = [];
                for(let i =0; i<this.songlist.length; i++){
                    for(let j=0; j<this.$route.query.genre.length; j++){
                        if(this.songlist[i].genres.includes(this.$route.query.genre[j]) && !arr.includes(this.songlist[i])){
                            arr.push(this.songlist[i]);
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