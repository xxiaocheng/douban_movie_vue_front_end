<template>
  <movieDetail v-bind:movieDetail="movieInfo" v-bind:me2movie="me2movie">
  </movieDetail>
</template>

<script>
import movieDetail from "@/components/movieDetail.vue";

export default {
  props: ["movieid"],
  components: {
    movieDetail
  },
  data() {
    return {
      movieInfo: {},
      me2movie: {}
    };
  },
  watch: {
    $route(to, from) {
      this.fetchMovieInfo();
    }
  },
  mounted() {
    this.fetchMovieInfo();
  },
  methods: {
    fetchMovieInfo() {
      var url = "/movie/" + this.$route.params.movieid;
      console.log(url);
      this.$http
        .get(url)
        .then(response => {
          this.movieInfo = response.data;
          this.me2movie = response.data.me2movie;
        })
        .catch(error => {
          this.$message.error("未找到相关信息");
          this.$router.push("/");
          console.log("get movie detail error");
        });
    }
  }
};
</script>
