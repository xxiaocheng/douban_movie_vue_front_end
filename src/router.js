import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import NotFound from "./views/404.vue";
import Sign from "./views/Sign.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/sign",
      name: "sign",
      component: Sign
    },
    {
      path: "*",
      name: "404NotFound",
      component: NotFound
    }
  ]
});
