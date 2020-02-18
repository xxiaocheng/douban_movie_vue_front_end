<template>
  <div v-loading="loading">
    <div class="movie" v-for="(rating, index) in ratings" v-if="ratings">
      <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <img :src="rating.movie.image_url" class="image" />
        <div class="content">
          <span class="movie-title">{{ rating.movie.title }}</span>
          <span class="movie-year">{{ rating.movie.year }}</span>
          <br />
          <br />
          <el-rate
            v-model="rating.score / 2"
            disabled
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
          <span v-if="rating.tags.length !== 0">
            标签:&nbsp;&nbsp;
            <small v-for="tag in rating.tags">{{ tag + " " }}</small>
          </span>
          <br />
          <span v-if="rating.comment">
            评价:&nbsp;&nbsp;
            <small>{{ rating.comment }}</small>
          </span>
          <br />
          <small class="time">{{ rating.when.replace('T',' ') }}</small>
        </div>
        <div>
          <el-button
            type="danger"
            class="delete-button"
            @click="openConfirm(index)"
            >删除评价</el-button
          >
        </div>
      </el-card>
      <br />
    </div>
    <div class="load-more" v-if="next" v-on:click="fetchReportRatings(next)">
      加载更多
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ratings: [],
      next: "",
      loading: true
    };
  },
  methods: {
    openConfirm(index) {
      {
        this.$confirm("此操作将永久删除该评价, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.deleteRating(index);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    fetchReportRatings(next) {
      this.loading = true;
      if (next) {
        var url = next;
      } else {
        var url = "/rating/reported";
      }
      this.$http
        .get(url)
        .then(response => {
          this.ratings = this.ratings.concat(response.data.data.items);
          this.next = response.data.data.next;
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log("fetch report ratings error");
        });
    },
    deleteRating(index) {
      var ratingId = this.ratings[index].id;
      this.$http
        .delete("/rating/" + ratingId)
        .then(response => {
          this.$message.success("删除成功");
          this.ratings.splice(index);
        })
        .catch(error => {
          this.$message.error("删除失败");
        });
    }
  },
  created() {
    this.fetchReportRatings();
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../style/color";
.movie {
  a:visited {
    color: black;
  }
  .image {
    float: left;
    width: 115px;
    vertical-align: middle;
  }
  .content {
    display: inline;
    left: 20px;
    position: relative;
    .movie-title {
      font-size: 1.1em;
    }
    .movie-year {
      left: 10px;
      position: relative;
      color: #888;
    }
  }
  .delete-button {
    float: right;
  }
}
.load-more {
  cursor: pointer;
  width: 1050px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: #eee;
  color: @doubanColor;
}
</style>
