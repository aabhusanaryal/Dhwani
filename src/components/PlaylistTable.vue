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
  <button @click="sortthelist" class="sort">Sort</button>
</template>

<script>
export default {
  props: ["playlist"],
  data: function () {
    return {
      sortedlist: [],
      sorted: false,
    };
  },
  methods: {
    //function to merge the array
    merge(arr, beg, mid, end) {
      let i = beg;
      let j = mid + 1;
      let k = 0;
      const temp = [];
      while (i <= mid && j <= end) {
        if (arr[i].duration < arr[j].duration) {
          temp[k++] = arr[i++];
        } else {
          temp[k++] = arr[j++];
        }
      }
      while (i <= mid) {
        temp[k++] = arr[i++];
      }
      while (j <= end) {
        temp[k++] = arr[j++];
      }
      for (let i = beg; i <= end; i++) {
        arr[i] = temp[i - beg];
      }
    },

    mergeSort(arr, beg, end) {
      if (beg < end) {
        //divide the array into singular elements
        var mid = beg + Math.floor((end - beg) / 2);
        this.mergeSort(arr, beg, mid);
        this.mergeSort(arr, mid + 1, end);
        //merge the elements elements are divided in to singular arrays with one elemets each
        this.merge(arr, beg, mid, end);
      }
    },

    sortthelist() {
      this.sorted = !this.sorted;
      console.log("Sort = " + this.sorted);
      console.log(this.playlist.songs);
      if (!this.sorted) {
        //deepcopy
        this.sortedlist = [...this.playlist.songs];
        console.log(this.playlist.songs);
      } else {
        this.sortedlist = [...this.genresongs];
        this.mergeSort(this.sortedlist, 0, this.sortedlist.length - 1);
      }
    },

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
    genresongs: function () {
      //if genre is not loaded, show all songs of the playlist
      if (!this.$route.query.genre) {
        if (this.sortedlist.length == 0) {
          return this.playlist.songs;
        }
        return this.sortedlist;
      }

      //if genre
      else if (this.$route.query.genre.length != 0) {
        const arr = [];
        for (let i = 0; i < this.sortedlist.length; i++) {
          for (let j = 0; j < this.$route.query.genre.length; j++) {
            //check genre of playlist.songs[i] with genre query's list
            if (
              this.sortedlist[i].genres.includes(this.$route.query.genre[j]) &&
              !arr.includes(this.sortedlist[i])
            ) {
              arr.push(this.sortedlist[i]);
            }
          }
        }
        return arr;
      } else {
        //when the genre list is empty
        if (this.sorted) {
          //if we want to show sorted list, send sorted list as the list of songs
          return this.sortedlist;
        }
        //if we dont want to show sorted list, send the og playlist as the list of songs
        return this.playlist.songs;
      }
    },
  },
};
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

tr:nth-child(even) {
  background: var(--blue);
}
tbody > tr:nth-child(odd) {
  background: var(--light-grey);
}
</style>
