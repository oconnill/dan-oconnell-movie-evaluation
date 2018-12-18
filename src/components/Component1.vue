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
                  <tr v-for="movie in fullMoviesList">
                    <td>{{ movie.title }}</td>
                    <td>{{ movie.release_date }}</td>
                    <td>{{ movie.vote_count }}</td>
                  </tr>
                </tbody>
              </table>          
  </div>
</template>

<script>
  export default {
    name: "app",
    components: {},
    data() {
      return {};
    },
    mounted() {
        this.$store.dispatch('getFullMovieList');
    },
    methods: {},
    computed: {
        fullMoviesList() {
            return this.$store.state.fullMovieList
        }
    }
  };
</script>
