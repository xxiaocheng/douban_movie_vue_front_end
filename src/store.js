import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem("isLogin") || false,
    token: localStorage.getItem("token") || "",
    username: localStorage.getItem("username") || "",
    messageCount: "0",
    role: localStorage.getItem("role") || ""
  },
  mutations: {
    changeLogin(state, flag) {
      state.isLogin = flag;
      localStorage.setItem("isLogin", flag);
    },
    changeMessageCount(state, data) {
      state.messageCount = data;
    },
    setUsername(state, data) {
      localStorage.setItem("username", data);
      state.username = data;
    },
    setRole(state, data) {
      state.role = data;
      localStorage.setItem("role", data);
    },
    setToken(state, data) {
      localStorage.setItem("token", data);
      state.token = data;
    }
  },
  actions: {}
});
