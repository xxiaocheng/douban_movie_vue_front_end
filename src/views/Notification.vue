<template>
  <div>
    <div class="head">
      <span class="title">我的提醒</span>
    </div>
    <div class="notifition-content">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="赞" name="like">
          <likeNotification></likeNotification>
        </el-tab-pane>
        <el-tab-pane label="新的关注" name="friends">
          <friendNotification></friendNotification>
        </el-tab-pane>
        <el-tab-pane label="系统消息" name="system">
          <systemNotification></systemNotification>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>


<script>
import likeNotification from "@/components/likeNotification.vue";
import friendNotification from "@/components/friendNotification.vue";
import systemNotification from "@/components/systemNotification.vue";

export default {
  components: { likeNotification, friendNotification, systemNotification },
  data() {
    return {
      activeName: "like"
    };
  },
  methods: {
    handleClick() {
      console.log(this.activeName);
    }
  }
};
</script>

<style lang="less">
.notifition-content {
  width: 950px;
  margin: 10px auto 0;
}
</style>
