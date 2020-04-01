<template>
  <div class="container-people" v-loading="loadingUserInfo">
    <div class="content">
      <div class="detail clearfix">
        <div class="left-side">
          <div class="subject">
            <div class="mainpic">
              <a>
                <img :src="peopleInfo.avatar_image" />
              </a>
            </div>
            <h1>
              <span class="username title">{{ peopleInfo.username }}</span>
            </h1>
            <p class="signature">{{ peopleInfo.signature }}</p>
          </div>
          <div class="location" v-if="location">
            <i class="material-icons loc-img">location_on</i>
            <span>{{ location }}</span>
          </div>
          <div class="friendship">
            粉丝
            <router-link :to="'/people/' + username + '/follower'"
              >({{ followers }})</router-link
            >&nbsp;&nbsp;&nbsp; 关注
            <router-link :to="'/people/' + username + '/following'"
              >({{ peopleInfo.followings_count }})</router-link
            >
            <br />
            <a @click="follow"
              v-if="!followHe && loginUser !== peopleInfo.username"
            >
              <button>关注</button>
            </a>
            <a @click="unfollow" v-if="followHe && loginUser !== peopleInfo.username">
              <button>取消关注</button>
            </a>
          </div>
          <div class="role-set" v-if="this.$store.state.role === 'Administrator'">
            <el-select
              v-model="currentRole"
              placeholder="请选择"
              class="role-options"
            >
              <el-option
                v-for="role in roles"
                :key="role"
                :label="role"
                :value="role"
              ></el-option>
            </el-select>
            <el-button size="medium" @click="setRole()" class="set-role-button"
              >更改权限</el-button
            >
          </div>
        </div>
      </div>
      <div class="people-active">
        <div class="cate">
          <el-tabs type="card" @tab-click="handleClick" v-model="activeName">
            <el-tab-pane :label="'看过(' + collectCount + ')'" name="collect">
              <peopleMovieCard :movies="collectMovies"></peopleMovieCard>
              <div
                @click="fetchMore(activeName)"
                v-if="collectNext"
                class="load-more"
              >
                获取更多
              </div>
            </el-tab-pane>
            <el-tab-pane :label="'在看(' + doCount + ')'" name="do">
              <peopleMovieCard :movies="doMovies"></peopleMovieCard>
              <div
                @click="fetchMore(activeName)"
                v-if="doNext"
                class="load-more"
              >
                获取更多
              </div>
            </el-tab-pane>
            <el-tab-pane :label="'想看(' + wishCount + ')'" name="wish">
              <peopleMovieCard :movies="wishMovies"></peopleMovieCard>
              <div
                @click="fetchMore(activeName)"
                v-if="wishNext"
                class="load-more"
              >
                获取更多
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import peopleMovieCard from "@/components/peopleMovieCard.vue";
import { CodeToText } from "element-china-area-data";
export default {
  components: {
    peopleMovieCard
  },
  props: ["username"],
  data() {
    return {
      loginUser: localStorage.getItem("username"),
      peopleInfo: {},
      loadingUserInfo: true,
      followHe: false,
      followers: 0,
      signature: "",
      activeName: "collect",
      collectMovies: [],
      collectNext: "",
      collectCount: 0,
      doMovies: [],
      doNext: "",
      doCount: 0,
      wishMovies: [],
      wishNext: "",
      wishCount: 0,
      codeToText: CodeToText,
      location: "",
      currentRole: '',
      roles: []
    };
  },
  watch: {
    $route(to, from) {
      this.username = this.$route.params.username;
      this.collectMovies = [];
      this.wishMovies = [];
      this.doMovies = [];
      this.fetchUserInfo();
      this.fetchMovie("collect");
      this.fetchMovie("wish");
      this.fetchMovie("do");
      console.log(this.$store.state.role)
      if (this.$store.state.role === "Administrator") {
        this.getCurrentRole();
        this.getAllRole();
      }
    }
  },
  methods: {
    getCurrentRole() {
      this.$http
        .get("/users/" + this.username + "/role")
        .then(response => {
          this.currentRole = response.data.role_name;
        })
        .catch(error => {
          console.log("get current role error");
        });
    },
    getAllRole() {
      this.$http
        .get("/role")
        .then(response => {
          this.roles = response.data.data.roles;
        })
        .catch(error => {
          console.log("get all role info error");
        });
    },
    setRole() {
      const params = new URLSearchParams();
      params.append("role_name", this.currentRole);
      this.$http
        .put("/users/" + this.username + "/role", params)
        .then(response => {
          this.$message.success("设置用户权限成功");
        })
        .catch(error => {
          this.$message.error("设置用户权限失败");
        });
    },
    fetchMore(tabName) {
      if (tabName === "do") {
        this.fetchMovie("-1", this.doNext);
      }
      if (tabName === "wish") {
        this.fetchMovie("-1", this.wishNext);
      }
      if (tabName === "collect") {
        this.fetchMovie("-1", this.collectNext);
      }
    },
    handleClick(tab, event) {
      if (tab.name === "do") {
        if (this.doMovies.length === 0) {
          this.fetchMovie(tab.name);
        }
      } else if (tab.name === "wish") {
        if (this.wishMovies.length === 0) {
          this.fetchMovie(tab.name);
        }
      } else if (tab.name === "collect") {
        if (this.collectMovies.length === 0) {
          this.fetchMovie(tab.name);
        }
      }
    },
    fetchMovie(cate = "-1", url = "-1") {
      // 两个参数每次只需要传入一个,第一次访问传入 cate  ,加载更多时传入 url 即可 .
      if (url === "-1") {
        url = "/users/" + this.username + "/movie";
        var param = {
          type_name: cate
        };
      } else {
        cate = url
          .split("type_name")[1]
          .split("=")[1]
          .split("&")[0];
        var param = {};
      }
      this.$http
        .get(url, {
          params: param
        })
        .then(response => {
          if (cate === "wish") {
            this.wishNext = response.data.data.next;
            this.wishMovies = this.wishMovies.concat(response.data.data.items);
            this.wishCount = response.data.data.total;
          } else if (cate === "do") {
            this.doNext = response.data.data.next;
            this.doMovies = this.doMovies.concat(response.data.data.items);
            this.doCount = response.data.data.total;
          } else if (cate === "collect") {
            this.collectNext = response.data.data.next;
            this.collectMovies = this.collectMovies.concat(response.data.data.items);
            this.collectCount = response.data.data.total;
          }
        })
        .catch(error => {
          console.log("fetch movie error.");
            console.log(this.collectMovies)
        });
    },
    follow() {
      var follow_url = "/users/"+this.username+"/follow";
      this.$http
        .post(follow_url)
        .then(response => {
          this.followHe = true;
          this.followers = this.followers + 1;
          this.showSucceedMess("关注成功", "success");
        })
        .catch(error => {
          this.showSucceedMess("关注失败", "error");
        });
    },
    unfollow() {
      var follow_url = "/users/"+this.username+"/unfollow";
      const params = new URLSearchParams();
      this.$http
        .delete(follow_url)
        .then(response => {
          this.followHe = false;
          this.followers = this.followers - 1;
          this.showSucceedMess("取消关注成功", "success");
        })
        .catch(error => {
          this.showSucceedMess("取消失败", "error");
        });
    },
    showSucceedMess(message, type) {
      this.$message({
        showClose: true,
        message: message,
        type: type
      });
    },
    fetchUserInfo() {
      var people_frofile_url = "/users/" + this.$route.params.username;
      this.$http
        .get(people_frofile_url)
        .then(response => {
          this.peopleInfo = response.data.data;
          if (response.data.data.city_name) {
            this.location = response.data.data.city_name;
          }
          this.followHe = response.data.follow;
          this.followers = response.data.data.followers_count;
          console.log(response.data.followers_count);
          console.log(this.followers);
          this.signature = response.data.data.signature;
          this.loadingUserInfo = false;
        })
        .catch(error => {
          console.log("get user detail error");
          // go to 404 page
          this.loadingUserInfo = false;
          this.$router.push("/");
          this.$message.error("未找到相关信息");
          this.loadingUserInfo = false;
          this.error = true;
        });
    },
    
  },
  created() {
    this.fetchUserInfo();
    this.fetchMovie("collect");
    this.fetchMovie("wish");
    this.fetchMovie("do");
    if (this.$store.state.role === "Administrator") {
      this.getCurrentRole();
      this.getAllRole();
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/base";
@import "../../style/color.less";
.container-people {
  width: 950px;
  margin: 30px auto;
  .content {
    .load-more {
      cursor: pointer;
      width: 950px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: #eee;
      color: @doubanColor;
    }
    min-height: 420px;
    h1 {
      word-break: break-all;
      display: block;
      font-size: 25px;
      font-weight: bold;
      color: #494949;
      padding: 0 0 15px 0;
    }
    .detail {
      .left-side {
        float: left;
        width: 800px;
        padding-right: 30px;
        .subject {
          width: 500px;
          float: left;
          .mainpic {
            margin: 3px 12px 0 0;
            max-width: 200px;
            overflow: hidden;
            text-align: center;
            float: left;
            height: 200px;
            a {
              img {
                margin-bottom: 10px;
                max-width: 150px;
              }
            }
          }
          .username {
            top: -25px;
            position: relative;
          }
          .signature {
            top: -40px;
            position: relative;
            font-size: 4mm;
          }
        }
        .create-time {
          float: left;
        }
        .loc-img {
          position: relative;
          top: 5px;
        }
        .friendship {
          float: right;
          position: relative;
          top: -23px;
          button {
            display: inline-block;
            width: 55px;
            height: 25px;
            background: #fae9da;
            border: 1px solid #ca6445;
            color: #333;
            margin-right: 10px;
            border-radius: 4px;
          }
        }
        .role-set {
          display: inline;
          .role-options {
          }
          .set-role-button {
            padding: 8px;
          }
        }
      }
    }
  }
}
</style>
