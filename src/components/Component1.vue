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
    <div v-if="showModal">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                <slot name="header"> default header </slot>
              </div>

              <div class="modal-body">
                <slot name="body"> default body </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  default footer
                  <button class="modal-default-button" v-on:click="showModal = false">
                    OK
                  </button>
                </slot>
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
        showModal: false
      };
    },
    mounted() {
      this.$store.dispatch("getFullMovieList");
    },
    methods: {
      singleMovieModal(id) {
        this.showModal = true;
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
