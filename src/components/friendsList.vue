<template>
  <div>
    <div class="card" v-for="user in friendsItems" v-if="friendsItems">
      <el-card shadow="hover" :body-style="{ padding: '0px' }">
        <div class="avatar">
          <router-link :to="getProfileUrl(user.name)">
            <img :src="user.avatar"  >
          </router-link>
        </div>
        <div class="content">
          <router-link :to="getProfileUrl(user.name)">
            <span class="username">{{user.name}}</span>
          </router-link>
          <br>
          <div class="signature">
            <span>{{user.signature}}</span>
          </div>
        </div>
      </el-card>
      <hr>
    </div>
  </div>
</template>

<script>
export default {
  props: ["friendsItems"],
  data() {
    return {
      itemsData: this.friendsItems
    };
  },
  watch: {
    friendsItems(a, b) {
      this.itemsData = a;
    }
  },
  methods: {
    getProfileUrl(username) {
      return "/people/" + username;
    }
  }
};
</script>

<style lang="less">
@import "../../style/color.less";
.card {
  a:visited {
    color: black;
  }
  max-height: 100px;
  .avatar {
    height: 100px;
    width: 100px;
    float: left;
    max-height: 100px;
  }
  .content {
    width: 850px;
    left: 20px;
    position: relative;
    .username {
      font-size: 1.6em;
      font-weight: 550;
    }
    .signature {
      color: #888;
      max-width: 880px;
    }
  }
}
</style>
