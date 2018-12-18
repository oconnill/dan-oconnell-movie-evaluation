<template>
  <div>
        <table class="table table-striped">
                <thead>
                  <tr>
                    <th>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td v-for="movie in fullMoviesList">{{ movie.title }}</td>
                    <td v-for="movie in fullMoviesList">{{ movie.release_date }}</td>
                    <td v-for="movie in fullMoviesList">{{ movie.vote_count }}</td>
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
            return this.$store.state.fullMenuList
        }
    }
  };
</script>
