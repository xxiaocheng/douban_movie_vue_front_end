import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import axios from "axios";
import "bulma/css/bulma.css";
import "material-design-icons/iconfont/material-icons.css";

axios.defaults.baseURL = "http://localhost:5000/api/v1";
//axios.defaults.timeout = 10000;
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
