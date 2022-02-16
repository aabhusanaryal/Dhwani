<template>
  Query: {{ query }}
  <PlaylistTable :playlist='searchResults' />
</template>

<script>
import PlaylistTable from '../components/PlaylistTable.vue';
export default {
  components: {PlaylistTable},
  name: "Search",
  props:['playlists'],
  // data(){
  //   return{
  //     sortedPlaylist:{
  //       name:"Sorted All Songs",
  //       songs:[]
  //     },
  //   }
  // },
  // methods:{
  //   insertionSort(){
  //     let n=this.playlists[0].songs.length //number of songs in "all songs"
  //     let arr=[...this.playlists[0].songs] //songs array of "all songs" playlist
  //     let temp
  //     let j
  //     for(let i=1;i<n;i++){
  //       console.log(i)
  //       temp=arr[i]
  //       j=i-1
  //       while(j>=0 && temp.name.localeCompare(arr[j].name)==-1){
  //         console.log(i)
  //         arr[j+1]=arr[j]
  //         j=j-1
  //       }
  //       arr[j+1]=temp
  //     }
  //     this.sortedPlaylist.songs=[...arr]
  //   }
  // },
  computed: {
    query() {
      return this.$route.params.searchQuery;
    },
    searchResults(){
      //performing linear search in playlist 
      let result={
        name:"Search Results",
        songs:[]
      }
      let n=this.playlists[0].songs.length //number of songs in "all songs"
      let arr=[...this.playlists[0].songs] //songs array of "all songs" playlist
      for(let i=0;i<n;i++){
        if(arr[i].name.toLowerCase().includes(this.query.toLowerCase()))
          result.songs.push(arr[i])
      }
      return result
    }
  },
  // mounted(){
  //   this.insertionSort();
  // }
};
</script>

<style></style>
