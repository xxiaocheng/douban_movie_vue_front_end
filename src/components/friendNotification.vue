<template>
  <div>
    <div v-for="friend in friendData" v-if="friendData.length !== 0">
      <el-card :body-style="{ padding: '0px', height: '60px' }" shadow="hover">
        <img :src="friend.info.who_avatar" class="avatar" />
        <div class="friend-content">
          <router-link :to="'/people/' + friend.info.who_name"
            >{{ friend.info.who_name }}&nbsp;&nbsp;</router-link
          >
          <span>关注了你</span>
          <span class="time">{{ friend.time }}</span>
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
      friendData: [],
      next: ""
    };
  },
  methods: {
    fetchNotifications(next = "") {
      if (next) {
        var url = next;
      } else {
        var url = "/notification/friendship";
      }
      this.$http
        .get(url)
        .then(response => {
          this.friendData = this.friendData.concat(response.data.items);
          this.next = response.data.next;
        })
        .catch(error => {
          console.log("fetch friend data error.");
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
.friend-content {
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
