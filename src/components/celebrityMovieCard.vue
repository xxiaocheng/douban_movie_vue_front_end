<template>
  <div class="moviesList">
    <div class="movie-container">
      <div class="movieTag" v-for="movie in movies">
        <ul>
          <li class="film-pic">
            <router-link v-bind:to="'/movie/' + movie.id">
              <img class="movieImg" v-bind:src="movie.image_url" alt="" />
            </router-link>
          </li>
          <li class="film-name">
            <router-link v-bind:to="'/movie/' + movie.id">{{
              movie.title
            }}</router-link>
          </li>
          <li class="film-rate">
            <el-rate v-model="movie.score / 2" disabled text-color="#ff9900">
            </el-rate>
          </li>
          <li class="film-button"></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    movies: Array
  },
  methods: {}
};
</script>
