<template>
  <div>
    <div v-loading="loading">
      <div
        class="feed-card"
        v-for="feed in feedData"
        v-if="feedData.length !== 0"
      >
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="user">
            <router-link :to="'/people/' + feed.user.name">
              <img :src="feed.user.avatar" class="avatar" />
            </router-link>
            <div class="user-title">
              <router-link :to="'/people/' + feed.user.name">
                <span>{{ feed.user.name }}</span> </router-link
              >&nbsp;
              <span v-if="feed.cate === 0" style="color:#888">想看</span>
              <span v-if="feed.cate === 1" style="color:#888">在看</span>
              <span v-if="feed.cate === 2" style="color:#888">看过</span>
              <span class="feed-time">{{ feed.time }}</span>
              <el-rate
                v-model="feed.score / 2"
                disabled
                :colors="['#8888']"
                class="rate"
              ></el-rate>
            </div>
          </div>
          <div class="feed-movie">
            <div>
              <router-link :to="'/movie/' + feed.movie.id">
                <span>{{ feed.movie.title }}</span> </router-link
              >&nbsp;
              <span style="color:#888">({{ feed.movie.year }})</span>
              <el-rate
                v-model="feed.movie.score / 2"
                disabled
                class="rate"
              ></el-rate>
              <span class="score">{{ feed.movie.score }}</span>
              <br />
            </div>
            <br />

            <div class="movie-img">
              <router-link :to="'/movie/' + feed.movie.id">
                <img :src="feed.movie.image" />
              </router-link>
            </div>
            <span v-if="feed.movie.summary">{{
              feed.movie.summary.slice(0, 70) + "..."
            }}</span>
            <div class="movie-info">
              <span class="p1">导演:</span>
              <span v-for="item in feed.movie.directors" class="attrs">
                <router-link :to="'/celebrity/' + item.id">{{
                  item.name
                }}</router-link>
              </span>
              <br />
              <span class="p1">主演:</span>
              <span v-for="item in feed.movie.casts" class="attrs">
                <router-link :to="'/celebrity/' + item.id">{{
                  item.name
                }}</router-link
                >/
              </span>
              <br />
              <span class="p1">类型:</span>
              <span v-for="item in feed.movie.genres" class="attrs"
                >{{ item }}/</span
              >
              <br />
            </div>
          </div>
        </el-card>
        <br />
      </div>
    </div>
    <div class="load-more" v-if="next" v-on:click="fetchFeed(next)">
      加载更多
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      feedData: [],
      next: "",
      loading: true
    };
  },
  methods: {
    fetchFeed(next) {
      if (next) {
        var url = next;
      } else {
        var url = "/feed";
      }
      this.loading = true;
      this.$http
        .get(url)
        .then(response => {
          this.feedData = this.feedData.concat(response.data.items);
          this.next = response.data.next;
          this.loading = false;
        })
        .catch(error => {
          console.log("feed feed error");
          this.loading = false;
        });
    }
  },
  created() {
    this.fetchFeed();
  }
};
</script>

<style lang="less">
@import "./../../style/color.less";

.feed-card {
  .el-card {
    height: 340px;
  }
  .user {
    height: 100px;
    .avatar {
      max-width: 50px;
      margin: 10px;
    }
    .user-title {
      padding: 10px;
      display: inline;
      top: -40px;
      position: relative;
      .feed-time {
        float: right;
        position: relative;
        padding: 13px;
      }
      .rate {
        left: 78px;
        top: 3px;
        position: relative;
      }
    }
  }
  .feed-movie {
    background: #f9f9f9;
    left: 78px;
    width: 800px;
    height: 200px;
    position: relative;
    padding: 20px;
    .rate {
      top: -2px;
      left: 10px;
      position: relative;
    }
    .el-rate {
      display: inline;
    }
    .score {
      color: rgb(247, 186, 42);
      left: 10px;
      position: relative;
    }
    .movie-img {
      max-width: 90px;
      float: right;
    }
    .movie-info {
      padding: 10px;
      .attrs {
        color: #888;
      }
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
</style>
