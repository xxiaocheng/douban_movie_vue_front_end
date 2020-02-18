<template>
  <div>
    <div class="rating" v-for="(rating, index) in comments" v-if="comments">
      <hr />
      <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <div class="comment-head">
          <a>
            <img :src="rating.user_avatar" class="image avatar" />
          </a>
          <router-link :to="'/people/' + rating.username">
            <span class="name">{{ rating.username }}</span>
          </router-link>
          <span class="cate" v-if="rating.cate === 2">看过</span>
          <span class="cate" v-if="rating.cate === 1">在看</span>
          <span class="cate" v-if="rating.cate === 0">想看</span>
          <el-rate
            class="rating-score"
            v-model="rating.score / 2"
            disabled
            text-color="#ff9900"
          ></el-rate>
          <span class="time rating-time">{{ rating.when.replace('T',' ') }}</span>
          <a class="report" @click="ratingAction(index, 'report')">
            <i class="material-icons">error_outline</i>
          </a>
          <a
            class="like like-status"
            v-if="rating.me_like_rating === true"
            @click="ratingAction(index, 'unlike')"
          >
            <i class="material-icons">favorite</i>
            <span class="like-count">{{ rating.like_count }}</span>
          </a>
          <a
            class="like unlike-status"
            v-if="rating.me_like_rating === false"
            @click="ratingAction(index, 'like')"
          >
            <i class="material-icons">favorite</i>
            <span class="like-count">{{ rating.like_count }}</span>
          </a>
        </div>
        <div style="padding: 14px;">
          <div class="bottom clearfix">
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ rating.comment }}
            </p>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ["ratingsProp"],
  data() {
    return {
      comments: []
    };
  },
  watch: {
    ratingsProp: function(val) {
      this.comments = val;
    }
  },
  methods: {
    ratingAction(index, typename) {
      var url = "/rating/" + this.comments[index].id;
      var params = new URLSearchParams();
      params.append("cate", typename);
      this.$http
        .post(url, params)
        .then(response => {
          this.showMessage(response.data.message, "success");
          if (typename !== "report") {
            var comment = this.comments[index];
            if (typename === "like") {
              comment.me_like_rating = true
              comment.like_count = comment.like_count + 1;
              this.$set(this.comments, index, comment);
            } else if (typename === "unlike") {
              comment.me_like_rating = false
              comment.like_count = comment.like_count - 1;
              this.$set(this.comments, index, comment);
            }
          }
        })
        .catch(error => {
          this.showMessage(error.response.data.message, "error");
        });
    },
    showMessage(message, type) {
      this.$message({
        showClose: true,
        message: message,
        type: type
      });
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../style/color";
.rating {
  width: 700px;
  .comment-head {
    padding: 0;
    margin-bottom: 0;
    height: 30px;
    .avatar {
      left: 5px;
      width: 30px;
      height: 30px;
      float: left;
      position: relative;
      top: 3px;
    }
    .name {
      margin-left: 10px;
      position: relative;
      top: 2px;
      font-size: 2ch;
      float: left;
      margin-right: 10px;
    }
    .cate {
      float: left;
      font-size: 1em;
      top: 5px;
      position: relative;
    }
    .rating-score {
      float: left;
      margin-left: 10px;
      position: relative;
      top: 7px;
    }
    .rating-time {
      float: left;
      margin-left: 10px;
      position: relative;
      top: 5px;
    }
    .like {
      float: right;
      position: relative;
      top: 5px;
      margin-right: 15px;
      text-decoration: none;
      .like-count {
        margin-left: 5px;
        top: -7px;
        position: relative;
        color: tomato;
      }
    }
    .unlike-status {
      color: rgb(136, 130, 157);
    }
    .like-status {
      color: red;
    }
    .report {
      float: right;
      position: relative;
      color: gray;
      top: 5px;
    }
  }
}
</style>
