<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th>Release Date</th>
          <th>Vote Count</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="movie in paginatedData"
          v-on:click="singleMovieModal(movie.id)"
        >
          <td>{{ movie.title }}</td>
          <td>{{ moment(movie.release_date).format("MM/DD/YYYY") }}</td>
          <td>{{ movie.vote_count }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="prevPage">Previous</button>
    <button @click="nextPage">Next</button>
  </div>
</template>

<script>
  import moment from "moment";

  export default {
    name: "app",
    components: {},
    data() {
      return {
        pageNumber: 0,
        size: 20
      };
    },
    mounted() {
      this.$store.dispatch("getFullMovieList");
    },
    methods: {
      singleMovieModal(id) {
        debugger;
      },
      nextPage() {
        this.pageNumber++;
      },
      prevPage() {
        this.pageNumber--;
      },
      moment
    },
    computed: {
      pageCount() {
        let l = this.$store.state.fullMovieList.length,
          s = 20;
        return Math.ceil(l / s);
      },
      paginatedData() {
        const start = this.pageNumber * this.size,
          end = start + this.size;
        return this.$store.state.fullMovieList.slice(start, end);
      }
    }
  };
</script>
