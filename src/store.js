import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem("isLogin") || false,
    token: localStorage.getItem("token") || "",
    usename: {},
    movieLoading: true,
    nextMovie: null,
    movieItems: [],
    movieDetailLoading: true
  },
  mutations: {
    setMovieItems(state, items) {
      state.movieItems = items;
    },
    changeLogin(state, flag) {
      state.isLogin = flag;
    },
    changeMessageCount(state, data) {
      state.messageCount = data;
    },
    setUsername(state, data) {
      state.usename = data;
    },
    changeLoading(state, data) {
      state.movieLoading = data;
    },
    setNextMovie(state, data) {
      state.nextMovie = data;
    },
    changeMovieDetailLoading(state, data) {
      state.movieDetailLoading = data;
    }
  },
  actions: {}
});
