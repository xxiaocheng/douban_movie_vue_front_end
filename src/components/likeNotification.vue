<template>
  <div>
    <div v-for="like in likeData" v-if="likeData.length !== 0">
      <el-card :body-style="{ padding: '0px', height: '60px' }" shadow="hover">
        <img :src="like.info.who_avatar" class="avatar" />
        <div class="like-content">
          <router-link :to="'/people/' + like.info.who_name"
            >{{ like.info.who_name }}&nbsp;&nbsp;</router-link
          >点赞了你在&nbsp;&nbsp;
          <router-link :to="'/movie/' + like.info.movie_id"
            >{{ like.info.movie_title }}&nbsp;&nbsp;</router-link
          >
          <span>下的评价</span>
          <span class="time">{{ like.time }}</span>
        </div>
      </el-card>
      <br />
    </div>
    <div class="load-more" v-if="next" v-on:click="fetchNotifications(next)">
      加载更多
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      likeData: [],
      next: ""
    };
  },
  methods: {
    fetchNotifications(next = "") {
      if (next) {
        var url = next;
      } else {
        var url = "/notification/like";
      }
      this.$http
        .get(url)
        .then(response => {
          this.likeData = this.likeData.concat(response.data.items);
          this.next = response.data.next;
        })
        .catch(error => {
          console.log("fetch like data error.");
        });
    }
  },
  created() {
    this.fetchNotifications();
  }
};
</script>

<style lang="less">
@import "./../../style/color.less";
.avatar {
  left: 5px;
  max-height: 50px;
  position: relative;
  top: 5px;
}
.like-content {
  display: inline;
  position: relative;
  top: -17px;
  padding: 20px;
  .time {
    float: right;
    right: 20px;
    position: relative;
    top: 15px;
  }
}
.load-more {
  cursor: pointer;
  width: 950px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: #eee;
  color: @doubanColor;
}
</style>
