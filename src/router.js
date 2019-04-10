import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import NotFound from "./views/404.vue";
import Sign from "./views/Sign.vue";
import Login from "./views/Login.vue";
import Movie from "./views/Movie.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/sign",
      name: "sign",
      component: Sign,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        noLogin: true
      }
    },
    {
      path: "/movie/:movieid",
      name: "moviePage",
      component: Movie,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "*",
      name: "404NotFound",
      component: NotFound,
      meta: {
        requiresAuth: false
      }
    }
  ]
});
