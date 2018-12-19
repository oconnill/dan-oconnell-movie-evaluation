<template>
  <div class="movie-table">
    <table class="table table-striped">
      <thead>
        <tr>
          <th v-on:click="sortColumns(column)" v-for="column in columns">
            {{ column.heading }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="movie in paginatedData"
          v-on:click="singleMovieModal(movie.id)"
        >
          <td v-on:click="sortColumns(column.field)" v-for="column in columns">
            {{
              column.formatter
                ? column.formatter(movie[column.field])
                : movie[column.field]
            }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="pageNumber > 0">{{ pageNumber }}</div>
    <button v-if="pageNumber > 0" @click="prevPage">Previous</button>
    <button v-if="pageNumber < pageCount" @click="nextPage">Next</button>
    <div v-if="showModal">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header"></div>

              <div class="modal-body">
                <h1>{{ singleMovie.title }}</h1>
                <div class="inner">
                  <img :src="singleMovie.base_url + singleMovie.poster_path" />
                </div>
                <p>{{ singleMovie.overview }}</p>
              </div>

              <div class="modal-footer">
                <button class="modal-default-button" v-on:click="closeModal">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
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
        size: 20,
        showModal: false,
        ascending: false,
        sortColumn: "",
        columns: [
          {
            heading: "Title",
            field: "title"
          },
          {
            heading: "Release Date",
            field: "release_date",
            formatter: function(d) {
              return moment(d).format("MM/DD/YYYY");
            }
          },
          {
            heading: "Vote Count",
            field: "vote_count"
          }
        ]
      };
    },
    mounted() {
      //Makes intial Movie List Ajax call on page load
      this.$store.dispatch("getFullMovieList");
    },
    methods: {
      singleMovieModal(id) {
        // On click calls a function in the store for a single movie with id Ajax request
        this.$store.dispatch("getSingleMovie", id);
        this.showModal = true;
      },
      singleMovieImg(baseUrl, imgPath) {
        // Concatenates base url and img path to return a img src for the view
        return baseUrl + imgPath;
      },
      nextPage() {
        this.pageNumber++;
      },
      prevPage() {
        this.pageNumber--;
      },
      closeModal() {
        this.$store.state.singleMovieModal = [];
        this.showModal = false;
      },
      sortColumns(col) {
        if (this.sortColumn === col) {
          this.ascending = !this.ascending;
        } else {
          this.ascending = true;
          this.sortColumn = col;
        }

        var ascending = this.ascending;

        this.$store.state.fullMovieList.sort(function(a, b) {
          if (a[col.field] > b[col.field]) {
            return ascending ? 1 : -1;
          } else if (a[col.field] < b[col.field]) {
            return ascending ? -1 : 1;
          }
          return 0;
        });
      },
      moment
    },
    computed: {
      pageCount() {
        let length = this.$store.state.fullMovieList.length;
        return Math.ceil(length / this.size) - 1;
      },
      paginatedData() {
        // splits up movie data to limit 20 entries per page
        const start = this.pageNumber * this.size,
          end = start + this.size;
        return this.$store.state.fullMovieList.slice(start, end);
      },
      singleMovie() {
        return this.$store.state.singleMovieModal;
      }
    }
  };
</script>
