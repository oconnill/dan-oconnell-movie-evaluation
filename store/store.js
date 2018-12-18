import vue from "vue";
import vuex from "vuex";
import axios from "axios";

vue.use(vuex);

export const store = new vuex.Store({
  state: {
    fullMovieList: [],
    singleMovieModal: [],
    handleError: []
  },

  mutations: {
    setFullMovieList(state, data) {
      state.fullMovieList = data;
    },
    setSingleMovie(state, data) {
      state.singleMovieModal = data;
    },
    handleError(state, data) {
      state.handleError = data;
    }
  },

  actions: {
    getFullMovieList({ commit, dispatch }) {
      axios
        .get("http://candidate-test.icapture.com/oconnelld/movies.php")
        .then(response => {
          commit("setFullMovieList", response.data);
        })
        .catch(err => {
          commit("handleError", err);
        });
    },
    getSingleMovie({ commit, dispatch }, id) {
      axios
        .get(
          "http://candidate-test.icapture.com/oconnelld/movies.php?movieid=" +
            id
        )
        .then(response => {
          commit("setSingleMovie", response.data);
        })
        .catch(err => {
          commit("handleError", err);
        });
    }
  }
});

export default store;
