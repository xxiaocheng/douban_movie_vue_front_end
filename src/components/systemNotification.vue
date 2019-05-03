<template>
  <div>
    <div v-for="sys in systemData" v-if="systemData.length!==0">
      <el-card :body-style="{ padding: '0px' ,height:'60px'}">
        <div class="sys-content">
          <span>{{sys.info}}</span>
          <span class="time">{{sys.time}}</span>
        </div>
      </el-card>
      <br>
    </div>
    <div class="load-more" v-if="next" v-on:click="fetchNotifications(next)">加载更多</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      systemData: [],
      next: ""
    };
  },
  methods: {
    fetchNotifications(next) {
      if (next) {
        var url = next;
      } else {
        var url = "/notification/sys";
      }
      this.$http
        .get(url)
        .then(response => {
          this.systemData = this.systemData.concat(response.data.items);
          this.next = response.data.next;
        })
        .catch(error => {
          console.log("fetch sys data error.");
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
.sys-content {
  padding: 20px;
  .time {
    float: right;
    right: 20px;
    position: relative;
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
