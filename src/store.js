import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem("isLogin") || false,
    token: localStorage.getItem("token") || "",
    usename: {}
  },
  mutations: {
    changeLogin(state, flag) {
      state.isLogin = flag;
    },
    changeMessageCount(state, data) {
      state.messageCount = data;
    },
    setUsername(state, data) {
      state.usename = data;
    }
  },
  actions: {}
});
