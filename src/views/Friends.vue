<template>
  <div class="container-friends">
    <div class="head">
      <img :src="avatar" class="img" />
      <h1>
        &nbsp;&nbsp;
        <span class="title">{{ username }}</span
        >&nbsp;
        <span class="cate" v-if="friendsType === 'following'">的关注</span>
        <span class="cate" v-if="friendsType === 'follower'">的粉丝</span>
        <span class="count" v-if="friendsType === 'following'"
          >({{ followingCount }})</span
        >
        <span class="count" v-if="friendsType === 'follower'"
          >({{ followerCount }})</span
        >
      </h1>
    </div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane name="following" label="Ta的关注">
        <friendsList
          :friendsItems="followingData"
          v-loading="loading"
        ></friendsList>
        <div class="load-more" v-on:click="loadMore" v-if="followingnext">
          加载更多
        </div>
      </el-tab-pane>
      <el-tab-pane name="follower" label="Ta的粉丝">
        <friendsList
          :friendsItems="followerData"
          v-loading="loading"
        ></friendsList>
        <div class="load-more" v-on:click="loadMore" v-if="followerNext">
          加载更多
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import friendsList from "@/components/friendsList.vue";

export default {
  props: ["username", "cate"],
  components: {
    friendsList
  },
  data() {
    return {
      friendsType: this.cate,
      loading: true,
      followerData: [],
      followerNext: "",
      followingData: [],
      followingnext: "",
      followerCount: 0,
      followingCount: 0,
      avatar: ""
    };
  },
  watch: {
    friendsType(a, b) {
      if (a === "follower") {
        if (this.followerData.length === 0) {
          this.fetchFriends(a);
        }
      } else if (a === "following") {
        if (this.followingData.length === 0) {
          this.fetchFriends(a);
        }
      }
    }
  },
  computed: {
    activeName: {
      get() {
        return this.friendsType;
      },
      set(newVal) {
        this.friendsType = newVal;
      }
    }
  },
  methods: {
    loadMore() {
      if (this.friendsType === "follower") {
        this.fetchFriends(this.friendsType, this.followerNext);
      } else {
        this.fetchFriends(this.friendsType, this.followingnext);
      }
    },
    validCate() {
      if (this.cate !== "follower" && this.cate !== "following") {
        var profileUrl = "/people/" + this.username;
        this.$router.push(profileUrl);
      }
    },
    fetchFriends(friendsType, nextUrl = "") {
      this.loading = true;
      if (nextUrl) {
        var url = nextUrl;
      } else {
        var url = "/users/" + this.username + "/" + this.friendsType;
      }
      this.$http
        .get(url)
        .then(response => {
          if (friendsType === "follower") {
            this.followerNext = response.data.data.next;
            this.followerData = this.followerData.concat(response.data.data.items);
            this.followerCount = response.data.data.total;
          } else if (friendsType === "following") {
            this.followingnext = response.data.data.next;
            this.followingData = this.followingData.concat(response.data.data.items);
            this.followingCount = response.data.data.total;
          }
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
        });
    },
    fetchAvatar(username) {
      var url = "/user/" + username + "?type=summary";
      this.$http
        .get(url)
        .then(response => {
          this.avatar = response.data.avatar;
        })
        .catch(error => {
          console.log("fetch avatar error.");
        });
    }
  },
  created() {
    this.validCate();
    this.fetchFriends(this.friendsType);
    this.fetchAvatar(this.username);
  }
};
</script>

<style lang="less">
@import "../../style/base.less";
@import "../../style/color.less";
.container-friends {
  width: 950px;
  margin: 30px auto;
  .head {
    min-height: 200px;
    .img {
      max-width: 150px;
      float: left;
    }
    h1 {
      word-break: break-all;
      display: block;
      font-size: 25px;
      font-weight: bold;
      color: #494949;
      padding: 0 0 15px 0;
      .cate {
        color: rgba(0, 0, 0, 0.68);
      }
      .count {
        color: #888;
      }
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
}
</style>
