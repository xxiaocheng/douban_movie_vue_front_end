<template>
  <div class="movie-comment" v-loading="loading">
    <p class="movie-comment-title">
      {{ title }} 的短评 · · · · ·
      <small class="rating-count">(全部 {{ ratingCount }} 条)</small>
    </p>
    <hr />
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><a @click="newRating">最新</a></el-breadcrumb-item>
      <el-breadcrumb-item aria-current="page"
        ><a @click="hotRating">最热</a></el-breadcrumb-item
      >
    </el-breadcrumb>

    <commentCard v-bind:ratingsProp="ratings"></commentCard>

    <hr />
    <div class="load-more" v-if="nextPage" v-on:click="loadMore">加载更多</div>
  </div>
</template>

<script>
import commentCard from "@/components/commentCard.vue";

export default {
  components: {
    commentCard
  },
  props: ["title", "movieId"],
  data() {
    return {
      thisMovieId: this.movieId,
      score: 3.5,
      ratings: [],
      ratingCount: 0,
      ratingCate: "",
      nextPage: "",
      loading: false
    };
  },
  watch: {
    movieId: function(a, b) {
      this.thisMovieId = a;
      this.fetchRating("new", 1);
    }
  },
  mounted() {
    this.fetchRating("new", 1);
  },
  methods: {
    newRating() {
      this.ratings = [];
      this.fetchRating("new", 1);
    },
    hotRating() {
      this.ratings = [];
      this.fetchRating("hot", 1);
    },
    fetchRating(cate = "", page = -1, url = "") {
      this.loading = true;
      if (cate) {
        this.ratingCate = cate;
      } else {
        cate = this.ratingCate;
      }
      if (this.thisMovieId) {
        if (page > 0) {
          var curr_url = "/movie/" + this.thisMovieId + "/rating";
          url = curr_url; 
        }
        this.$http
          .get(url, {
            params: {
              sort: cate,
              page: page
            }
          })
          .then(response => {
            this.ratingCount = response.data.data.total;
            this.ratings = this.ratings.concat(response.data.data.items);
            this.nextPage = response.data.data.next;
            this.loading = false;
          })
          .catch(error => {
            console.log("get ratings error.");
            this.loading = false;
          });
      }
    },
    showMessage(message, type) {
      this.$message({
        showClose: true,
        message: message,
        type: type
      });
    },
    loadMore() {
      this.fetchRating((url = this.nextPage));
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less">
@import "../../style/color";
.movie-comment {
  float: left;
  clear: both;
  margin-top: 20px;
  .load-more {
    cursor: pointer;
    width: 700px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #eee;
    color: @doubanColor;
  }
  .movie-comment-title {
    color: #007722;
    font-size: 16px;
    .rating-count {
      color: rgb(43, 80, 226);
    }
  }
}
</style>
