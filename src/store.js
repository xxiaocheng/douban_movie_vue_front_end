import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    messageCount: 100,
    token: "",
    userRole: "admin",
    usename: "chengxiaoxiao"
  },
  mutations: {
    changeLogin(state) {
      state.isLogin = !state.isLogin;
    },
    changeMessageCount(state, data) {
      state.messageCount = data;
    },
    setToken(state, data) {
      state.token = data;
    },
    setRole(state, data) {
      state.userRole = data;
    },
    setUsername(state, data) {
      state.usename = data;
    }
  },
  actions: {}
});
