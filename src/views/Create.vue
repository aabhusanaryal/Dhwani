<template>
    <form>
        <input type="text" 
        placeholder="Enter Playlist Name" 
        v-model="playlistName" 
        class="name-input" 
        required>
        <table>
            <tr>
                <th>>S.N.</th>
                <th>>Name</th>
                <th>>Artist</th>
            </tr>
            <tr v-for="(song, index) in playlists[0].songs" :key="index">
                <td>{{index+1}}</td>
                <td>{{song.name}}</td>
                <td>{{song.artist}}</td>
                <td>
                    <input type="checkbox" :value=song v-model="addedSongs">
                </td>
            </tr>
        </table>
        <button class="add" @click="addPlaylist">Done</button>
    </form>
</template>

<script>
export default {
    props:['playlists'],
    data(){
        return{
            addedSongs:[],
            playlistName:''
        }
    },
    methods:{
        addPlaylist(){
            if(this.playlistName){
                this.$emit('addPlaylist',this.playlistName,this.addedSongs)
                this.$router.push('/')
            }
        }
    }
}
</script>

<style scoped>

th{
    height: 20px;
}
button.add{
    height:fit-content;
}
/* td{
    height: 20px;
} */
.name-input{
    height: fit-content;
}
</style>