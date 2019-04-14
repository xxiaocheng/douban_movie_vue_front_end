import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import axios from "axios";
import "bulma/css/bulma.css";
import "material-design-icons/iconfont/material-icons.css";

axios.defaults.baseURL = "http://192.168.2.220:5000/api/v1";
//axios.defaults.timeout = 10000;
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = "bearer " + token;
}

// router 全局拦截器
router.beforeEach((to, from, next) => {
  let isLogin = localStorage.getItem("isLogin");
  if (to.meta.noLogin) {
    if (isLogin) {
      console.log("here");
      next("/");
    } else {
      next();
    }
  }
  if (to.meta.requiresAuth) {
    if (isLogin === "true") {
      next();
    } else {
      next({
        path: "/login"
      });
    }
  } else {
    next();
  }
});
// axios 全局拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        router.replace({
          path: "/login"
        });
        localStorage.removeItem("token");
        localStorage.removeItem("isLogin");
      } else {
        return Promise.reject(error);
      }
    }
  }
);

Vue.prototype.$http = axios;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

