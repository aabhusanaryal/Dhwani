<template>
  <!-- <PlaylistTable :playlist='searchResults' /> -->
  <h4 v-if="searchResults.songs.length==0 && searchResults.artists.length==0">Not found! Please enter another keyword!</h4>
  <h3 v-if="searchResults.songs.length!=0">Songs</h3>
  <ul v-for="(song, index) in searchResults.songs" :key="index">
    <li :id="index" @click="playSong($event)">{{song.name}}</li>
  </ul>
  <h3 v-if="searchResults.artists.length!=0">Artists</h3>
  <ul v-for="(song, index) in searchResults.artists" :key="index">
    <li>{{song.artist}}</li>
  </ul>
</template>

<script>
import PlaylistTable from '../components/PlaylistTable.vue';
export default {
  components: {PlaylistTable},
  name: "Search",
  props:['playlists'],
  methods:{
    playSong(event){
      this.$emit("playSong",this.searchResults.songs[event.srcElement.id])
    }
  },
  computed: {
    query() {
      return this.$route.params.searchQuery;
    },
    searchResults(){
      //performing linear search in playlist 
      let result={
        name:"Search Results",
        songs:[],
        artists:[]
      }
      let n=this.playlists[0].songs.length //number of songs in "all songs"
      let arr=[...this.playlists[0].songs] //songs array of "all songs" playlist
      for(let i=0;i<n;i++){
        if(arr[i].name.toLowerCase().includes(this.query.toLowerCase()))
          result.songs.push(arr[i])
        else if(arr[i].artist.toLowerCase().includes(this.query.toLowerCase()))
          result.artists.push(arr[i])
      }
      return result
    }
  },
};
</script>

<style></style>
