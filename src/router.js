import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import NotFound from "./views/404.vue";
import Sign from "./views/Sign.vue";
import Login from "./views/Login.vue";
import Movie from "./views/Movie.vue";
import ConfirmEmail from "./views/ConfirmEmail.vue";
import SentResetPasswordEmail from "./views/SentResetPasswordEmail.vue";
import ResetPassword from "./views/ResetPassword.vue";
import ConfirmChangeEmail from "./views/ConfirmChangeEmail.vue";
import People from "./views/People.vue";
import Celebrity from "./views/Celebrity.vue";
import Friends from "./views/Friends.vue";
import Cinema from "./views/Cinema.vue";
import Recommend from "./views/Recommend.vue";
import Chart from "./views/Chart.vue";
import Explore from "./views/Explore.vue";
import Settings from "./views/Settings.vue";
import Notification from "./views/Notification.vue";
import Admin from "./views/Admin.vue";
import UpdateMovie from "./views/UpdateMovie.vue";
import UpdateCelebrity from "./views/UpdateCelebrity.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/admin",
      component: Admin,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: "/notification",
      component: Notification,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/setting",
      component: Settings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/explore",
      name: "choice movies",
      component: Explore,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/chart",
      component: Chart,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/recommend",
      component: Recommend,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/cinema",
      component: Cinema,
      meta: {
        requiresAuth: true
      }
    },
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
      props: true,
      component: Celebrity,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/celebrity/:celebrityid/update",
      name: "updateCelebrity",
      component: UpdateCelebrity,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true
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
      props: true,
      component: Movie,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/movie/:movieid/update",
      name: "updateMovie",
      component: UpdateMovie,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: "/people/:username",
      name: "peoplePage",
      props: true,
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
