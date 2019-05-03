<template>
  <div>
    <nav class="navbar is-spaced" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <!-- 导航栏左边的选项,总是可见,通常包含logo或者一些其他链接-->
        <router-link to="/" class="navbar-item">
          <!--logo pic -->
          <img src="../assets/douban_movie.png" width="112" height="28">
        </router-link>
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          v-on:click="toggleNav"
          v-bind:class="{'is-active':isToggleNav}"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" v-bind:class="{'is-active':isToggleNav}">
        <!--导航栏右边的选项,在移动端隐藏-->
        <div class="navbar-start">
          <!-- 导航栏左边部分-->
          <router-link to="/" class="navbar-item">
            <i class="material-icons">home</i>
            首页
          </router-link>

          <router-link to="/cinema" class="navbar-item">
            <i class="material-icons">local_movies</i>
            影讯
          </router-link>
          <router-link to="/recommend" class="navbar-item">
            <i class="material-icons">pan_tool</i>
            猜你想看
          </router-link>
          <router-link to="/explore" class="navbar-item">
            <i class="material-icons">explore</i>
            选电影
          </router-link>
          <router-link to="/chart" class="navbar-item">
            <i class="material-icons">line_weight</i>
            排行榜
          </router-link>
          <router-link :to="profileUrl" class="navbar-item">
            <i class="material-icons">favorite</i>
            我的电影
          </router-link>
          <router-link
            class="navbar-item"
            to="/admin"
            v-if="isLogin&&this.$store.state.userRole==='admin'"
          >
            <i class="material-icons">build</i>
            管理
          </router-link>
          <div role="search box" class="navbar-item">
            <el-select v-model="queryCate" placeholder="请选择" style="width:80px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-autocomplete
              v-model="state4"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入搜索内容"
              @select="handleSelect"
            ></el-autocomplete>
            <!-- <el-button type="primary" icon="el-icon-search">搜索</el-button> -->
          </div>
        </div>
        <div class="navbar-end">
          <!--导航栏末尾-->
          <div class="navbar-item" v-if="!this.$store.state.isLogin">
            <div class="buttons">
              <router-link to="/sign" class="button is-primary">
                <strong>注册</strong>
              </router-link>
              <router-link to="/login" class="button is-light">登陆</router-link>
            </div>
          </div>
          <div role="message buttom" class="navbar-item" v-if="this.$store.state.isLogin">
            <el-badge :value="this.$store.state.messageCount" :max="99" class="item">
                <router-link to="/notification">
                  <i class="material-icons">message</i>
                </router-link>
            </el-badge>
          </div>
          <div class="navbar-item">
            <!--占位-->
          </div>
          <div class="navbar-item has-dropdown is-hoverable account" v-if="this.$store.state.isLogin">
            <!--下拉菜单-->
            <router-link to="/setting" class="navbar-link">
              <i class="material-icons">account_circle</i>
            </router-link>
            <div class="navbar-dropdown is-boxed">
              <router-link to="/setting" class="navbar-item">账号管理</router-link>
              <hr class="navbar-divider">
              <a class="navbar-item" v-on:click="logout">注销登录</a>
            </div>
          </div>
          <div class="navbar-item">
            <!--占位-->
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin:false,
      isToggleNav: false,
      state4: "",
      queryCate: "movie",
      options: [
        {
          value: "movie",
          label: "电影"
        },
        {
          value: "people",
          label: "用户"
        },
        {
          value: "celebrity",
          label: "演员"
        }
      ],
      username: localStorage.getItem("username")
    };
  },
  computed: {
    profileUrl: function() {
      return "/people/" + this.username;
    }
  },
  methods: {
    getMessageCount(){
      this.$http.get('/notification/new_count',
      )
      .then(response=>{
        this.$store.commit('changeMessageCount',response.data.count);
        setTimeout(() => {
          this.getMessageCount();
        }, 5000);
      })
      .catch(error=>{
        console.log('get message count error.');
      })
    },
    toggleNav: function() {
      this.isToggleNav = !this.isToggleNav;
    },
    querySearchAsync(queryString, cb) {
      this.$http
        .get("/search", {
          params: {
            cate: this.queryCate,
            q: queryString
          }
        })
        .then(response => {
          let suggestions = [];
          if (this.queryCate === "movie") {
            for (var i = 0; i < response.data.items.length; i++) {
              suggestions.push({
                value: response.data.items[i].title,
                id: response.data.items[i].id
              });
            }
          } else {
            for (var i = 0; i < response.data.items.length; i++) {
              suggestions.push({
                value: response.data.items[i].name,
                id: response.data.items[i].id
              });
            }
          }
          cb(suggestions);
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSelect(item) {
      // console.log(item.movieId)
      if (this.queryCate === "movie") {
        this.$router.push("/movie/" + item.id);
      } else if (this.queryCate === "people") {
        this.$router.push("/people/" + item.value);
      } else {
        this.$router.push("/celebrity/" + item.id);
      }
    },
    logout() {
      localStorage.removeItem("isLogin");
      localStorage.removeItem("token");
      this.$router.push("/");
      this.$store.commit("changeLogin", false);
    }
  },
  created() {
    this.isLogin=this.$store.state.isLogin;
    if (this.isLogin){
    this.getMessageCount();
    }
  },
};
</script>

<style lang="less">
.account{
    top: -5px;
    position: relative;
}
</style>
