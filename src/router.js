import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import NotFound from "./views/404.vue";
import Sign from "./views/Sign.vue";
import Login from "./views/Login.vue";
import Movie from "./views/Movie.vue";
import ResentConfirmEmail from "./views/ResentConfirmEmail.vue";
import ConfirmEmail from "./views/ConfirmEmail.vue";
import SentResetPasswordEmail from "./views/SentResetPasswordEmail.vue";
import ResetPassword from "./views/ResetPassword.vue";
import ConfirmChangeEmail from "./views/ConfirmChangeEmail.vue";
import People from "./views/People.vue";
import Celebrity from "./views/Celebrity.vue";
import Friends from "./views/Friends.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/people/:username/:cate",
      name: "friends",
      component: Friends,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/celebrity/:celebrityid",
      name: "celebrity",
      component: Celebrity,
      meta: {
        requiresAuth: true
      }
    },
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
      component: Login
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
      path: "/people/:username",
      name: "peoplePage",
      component: People,
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
    },
    {
      path: "/account/resent-confirm",
      name: "resentConfirmEmail",
      component: ResentConfirmEmail,
      meta: {
        noLogin: true
      }
    },
    {
      path: "/auth/confirm-email",
      name: "comfirnEmail",
      component: ConfirmEmail
    },
    {
      path: "/auth/forget-password",
      name: "sentResetPasswordEmail",
      component: SentResetPasswordEmail
    },
    {
      path: "/auth/reset-password",
      name: "resetPassword",
      component: ResetPassword
    },
    {
      path: "/auth/change-email",
      name: "changeEmail",
      component: ConfirmChangeEmail,
      meta: {
        requiresAuth: false
      }
    }
  ]
});
