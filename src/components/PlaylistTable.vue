<template>
  <div class="list-container">
    <table class="playlist-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Artist</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(song, index) in genresongs" :key="index">
          <td>{{ song.name }}</td>
          <td>{{ song.artist }}</td>
          <td>{{ secondsToMinutes(song.duration) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["playlist"],
  methods:{
        secondsToMinutes(seconds) {
        // Takes in seconds as parameter and returns a string of the format "mm:ss"
            let minutes;
            minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60;
            minutes = minutes.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
            });
            seconds = Math.floor(seconds).toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
            });
            return `${minutes}:${seconds}`;
        },
},
    computed: {
        genresongs: function(){
            //if genre is not loaded, show all songs of the playlist
            if(!this.$route.query.genre) {
                return this.playlist.songs;
            }   
            //if genre
            else if (this.$route.query.genre.length != 0){
                const arr = [];
                for(let i =0; i<this.playlist.songs.length; i++){
                    for(let j=0; j<this.$route.query.genre.length; j++){
                        //check genre of playlist.songs[i] with genre query's list
                        if(this.playlist.songs[i].genres.includes(this.$route.query.genre[j]) && !arr.includes(this.playlist.songs[i])){
                            arr.push(this.playlist.songs[i]);
                        }
                    }
                }
                return arr;
            }
            else{
                return this.playlist.songs;
            }
          }
    }
}
</script>

<style scoped>
.playlist-title {
  padding: 15px;
  color: var(--blue);
  font-size: 2.25rem;
}

.list-container {
  display: flex;
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
  font-size: 2rem;
  table-layout: fixed;
}

th > tr {
  background: var(--white);
}


tbody>tr:nth-child(even){
    background: linear-gradient(to right, #3ae0dd, rgb(236, 156, 236));
}
tbody>tr:nth-child(odd){
    background: linear-gradient(to right, rgb(236, 156, 236), #3ae0dd);
}
</style>
