<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th v-on:click="(sortColumns(column))" v-for="column in columns">
            {{ column }}
          </th>
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
    <div v-if="pageNumber > 0">{{ pageNumber }}</div>
    <button @click="prevPage">Previous</button>
    <button @click="nextPage">Next</button>
    <div v-if="showModal">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header"></div>

              <div class="modal-body">
                <h1>{{ singleMovie.title }}</h1>
                <img :src="singleMovie.base_url + singleMovie.poster_path" />
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
        columns: ["Title", "Release Date", "Vote Count"]
      };
    },
    mounted() {
      this.$store.dispatch("getFullMovieList");
    },
    methods: {
      singleMovieModal(id) {
        this.$store.dispatch("getSingleMovie", id);
        this.showModal = true;
      },
      singleMovieImg(baseUrl, imgPath) {
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
    //   sortColumns(col) {
    //     switch (col) {
    //       case "Title":
    //         function compare(a, b) {
    //           if (a.name < b.name) return -1;
    //           if (a.name > b.name) return 1;
    //           return 0;
    //         }
    //         return this.arrays.sort(compare);
    //         break;
    //       case "Release Date":

    //         break;
    //       case "Vote Count":
    //         debugger;
    //         break;
    //     }
    //   },
      moment
    },
    computed: {
      pageCount() {
        let length = this.$store.state.fullMovieList.length;
        return Math.ceil(length / size);
      },
      paginatedData() {
        const start = this.pageNumber * this.size,
          end = start + this.size;
        return this.$store.state.fullMovieList.slice(start, end);
      },
      singleMovie() {
        return this.$store.state.singleMovieModal;
      },
      sortVotes(){
      }
    }
  };
</script>

