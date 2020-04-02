<template>
  <div
    class="container-moving"
    v-loading="this.$store.state.movieDetailLoading"
  >
    <div class="content">
      <h1>
        <span class="title">{{ movieDetail.title }}</span>
        <span class="year">({{ movieDetail.year }})</span>
      </h1>
      <div class="detail clearfix">
        <div class="left-side">
          <div class="actor-list">
            <div class="subject">
              <div class="mainpic">
                <img class="movieImg" :src="movieDetail.image_url" alt />
              </div>
              <div class="info">
                <span class="p1">导演:</span>
                <span v-for="item in movieDetail.directors" class="attrs">
                  <router-link :to="'/celebrity/' + item.id">{{
                    item.name
                  }}</router-link>/
                </span>
                <br />
                <span class="p1">主演:</span>
                <span v-for="item in movieDetail.celebrities" class="attrs">
                  <router-link :to="'/celebrity/' + item.id">{{
                    item.name
                  }}</router-link
                  >/
                </span>
                <br />
                <span class="p1">类型:</span>
                <span v-for="item in movieDetail.genres" class="attrs"
                  >{{ item.genre_name }}/</span
                >
                <br />
                <span class="p1">制片国家/地区:</span>
                <span
                  v-for="(item, index) in movieDetail.countries"
                  class="attrs"
                  >{{ item.country_name }}/</span
                >
                <br />
                <span class="p1">又名:</span>
                <span v-for="item in movieDetail.aka_list" class="attrs">{{
                  item
                }} </span>
                <br />
                <span class="p1" v-if="movieDetail.seasons_count">总季数:</span>
                <span v-if="movieDetail.seasons_count">{{
                  movieDetail.seasons_count
                }}</span>
                <br v-if="movieDetail.seasons_count" />
                <span class="p1" v-if="movieDetail.episodes_count">集数:</span>
                <span v-if="movieDetail.episodes_count">{{
                  movieDetail.episodes_count
                }}</span>
                <br v-if="movieDetail.episodes_count" />
                <span class="p1" v-if="movieDetail.current_season">季数:</span>
                <span v-if="movieDetail.current_season">{{
                  movieDetail.current_season
                }}</span>
                <br v-if="movieDetail.current_season" />
                <span class="p1" v-if="movieDetail.douban_id">豆瓣链接:</span>
                <span>
                  <a
                    :href="
                      'https://movie.douban.com/subject/' +
                        movieDetail.douban_id
                    "
                    target="_blank"
                    >{{ movieDetail.douban_id }}</a
                  >
                </span>
                <br v-if="movieDetail.douban_id" />
              </div>
            </div>
            <div class="people-sroce">
              <div>
                <p>豆瓣评分</p>
                <span class="score" v-if="movieDetail.score / 2">{{
                  movieDetail.score
                }}</span>
                <el-rate
                  v-model="movieDetail.score / 2"
                  disabled
                  text-color="#ff9900"
                ></el-rate>
                <p class="comment-num" v-if="movieDetail.score">
                  {{ movieDetail.rating_count }}人评价
                </p>
              </div>
            </div>
            <div>
              <el-button
                type="danger"
                @click="deleteMovieConfirm"
                v-if="this.$store.state.role !== 'user'"
                >删除这个电影</el-button
              >
            </div>
            <div>
              <router-link :to="'/movie/'+this.movieDetail.id+'/update'">
              <el-button
                type="warning"
                v-if="this.$store.state.role !== 'user'"
                >修改电影信息</el-button
              >
              </router-link>
            </div>
          </div>
          <div class="insterest-people">
            <div class="top" v-if="me2movie ===null">
              <a @click="wishRating()">
                <button>想看</button>
              </a>
              <a @click="doRating()" v-if="movieDetail.subtype === 'tv'">
                <button>在看</button>
              </a>
              <a @click="collectRating()">
                <button>看过</button>
              </a>
              <span class="score-to">
                评价:
                <el-rate
                  v-model="score"
                  show-text
                  :texts="['很差', '较差', '还行', '推荐', '力荐']"
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                  @change="collectRating"
                ></el-rate>
              </span>
            </div>
            <div class="top" v-if="me2movie !== null">
              <span class="stitle" v-if="me2movie.cate === 2">
                我
                <small>{{ me2movie.time }}</small> 看过
              </span>
              <span class="stitle" v-if="me2movie.cate === 1">
                我
                <small>{{ me2movie.time }}</small> 在看
              </span>
              <span class="stitle" v-if="me2movie.cate === 0">
                我
                <small>{{ me2movie.time }}</small> 想看
              </span>
              <br />
              <span class="score-to">
                我的评价:
                <el-rate
                  v-model="me2movie.score / 2"
                  disabled
                  text-color="#ff9900"
                  score-template="{value}"
                ></el-rate>
              </span>
              <a @click="deleteRating()">删除</a>
              <br />
              <span v-if="JSON.stringify(me2movie.tags) !== '[]'">
                标签:
                <small v-for='tag in me2movie.tags'>{{ tag + " " }}</small>
              </span>
              <br />
              <span v-if="me2movie.comment">
                评价:
                <small>{{ me2movie.comment }}</small>
              </span>
            </div>
          </div>
          <div class="gtleft"></div>
          <div class="summary">
            <p class="summary-title">
              {{ movieDetail.title }} 的剧情简介 · · · · · ·
            </p>
            <p class="intro">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                movieDetail.summary
              }}
            </p>
          </div>
          <movieComment
            :movieId="this.movieDetail.id"
            :title="movieDetail.title"
          ></movieComment>
        </div>
      </div>
    </div>
    <el-dialog title="评价" :visible.sync="ratingFormVisible">
      评分:
      <el-rate
        v-model="score"
        show-text
        :texts="['很差', '较差', '还行', '推荐', '力荐']"
        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
      ></el-rate>
      <br />标签:
      <br />
      <el-input
        v-model="tags"
        placeholder="多个标签用空格分隔"
        class
        type="text"
      ></el-input>

      <!-- <input class="input" type="text" placeholder="多个标签用空格分隔" v-model='tags'><br> -->
      评论:
      <br />
      <el-input
        type="textarea"
        autosize
        placeholder="请输入评论 ·  ·  · "
        v-model="comment"
      ></el-input>
      <!-- <input class="input" type="text" placeholder="输入评论 ·  ·  · " v-model='comment'><br> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelRating()">取 消</el-button>
        <el-button type="primary" @click="rating">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["movieDetail", "me2movie"],
  data() {
    return {
      ratingFormVisible: false,
      score: 0,
      tags: "",
      comment: "",
      typeName: "",
      movieId: this.movieDetail.id
    };
  },
  components: {
    movieComment: resolve => {
      require(["./movieComment.vue"], resolve);
    }
  },
  methods: {
    deleteMovieConfirm() {
      this.$confirm("此操作将永久该电影, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteMovie();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deleteMovie() {
      this.$http
        .delete("/movie/" + this.movieDetail.id)
        .then(response => {
          this.$message.success("当前电影已被删除");
        })
        .catch(error => {
          this.$message.error("请稍后再试");
        });
    },
    cancelRating() {
      this.ratingFormVisible = false;
    },
    wishRating() {
      this.showRating();
      this.typeName = 0;
    },
    doRating() {
      this.showRating();
      this.typeName = 1;
    },
    collectRating() {
      this.showRating();
      this.typeName = 2;
    },
    showRating() {
      this.ratingFormVisible = true;
    },
    rating() {
      const params = new URLSearchParams();
      var movieId = this.movieDetail.id;
      params.append("interest", this.typeName);
      params.append("score", this.score * 2);
      params.append("tags", this.tags);
      params.append("comment", this.comment);
      this.$http
        .post("/movie/" + movieId + "/rating", params)
        .then(response => {
          this.showSucceedMess("评价成功!");
          this.$router.go(0);
        })
        .catch(error => {
          this.showFailedMess("请稍后再试!");
        });
      this.ratingFormVisible = false;
    },
    showSucceedMess(message) {
      this.$message({
        showClose: true,
        message: message,
        type: "success"
      });
    },
    showFailedMess(message) {
      this.$message({
        showClose: true,
        message: message,
        type: "error"
      });
    },
    deleteRating() {
      this.$confirm("此操作将永久该评价, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var id = this.me2movie.id;
          var url = "/rating/" + id;
          this.$http
            .delete(url)
            .then(response => {
              this.showSucceedMess(response.data.message);
              this.$router.go(0);
            })
            .catch(error => {
              this.showFailedMess("请稍后再试!");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style rel="stylesheet/less" lang="less">
@import "../../style/base";
.container-moving {
  width: 950px;
  margin: 30px auto;
  .content {
    min-height: 500px;
    h1 {
      word-break: break-all;
      display: block;
      font-size: 25px;
      font-weight: bold;
      color: #494949;
      padding: 0 0 15px 0;
      .year {
        color: #888;
      }
    }
    .detail {
      .left-side {
        float: left;
        width: 700px;
        padding-right: 40px;
        .actor-list {
          margin-bottom: 30px;
          .subject {
            width: 415px;
            float: left;
            .mainpic {
              margin: 3px 12px 0 0;
              max-width: 155px;
              overflow: hidden;
              text-align: center;
              float: left;
              height: 240px;
              a {
                img {
                  margin-bottom: 10px;
                  max-width: 100px;
                }
              }
              .more-pic {
                text-decoration: none;
                color: #bbbbbb;
                font-size: 12px;
                text-align: center;
              }
            }
            .info {
              float: left;
              max-width: 240px;
              word-wrap: break-word;
              .p1 {
                line-height: 150%;
                color: #666666;
              }
              .attrs {
                color: #37a;
              }
            }
          }
          .people-sroce {
            float: right;
            width: 160px;
            margin: 2px 0 0 0;
            padding: 0 0 0 15px;
            border-left: 1px solid #eaeaea;
            color: #aaa;
            .score {
              font-size: 25px;
              margin-right: 10px;
            }
            .el-rate {
              vertical-align: top;
              display: inline-block;
              margin-top: 3px;
              i {
                font-size: 14px;
              }
            }
            .comment-num {
              margin-top: -20px;
              margin-left: 45px;
              color: #666699;
            }
          }
        }
        .insterest-people {
          clear: both;
          padding: 20px 0 3px;
          .top {
            button {
              display: inline-block;
              width: 50px;
              height: 25px;
              background: #fae9da;
              border: 1px solid #ca6445;
              color: #333;
              margin-right: 10px;
              border-radius: 4px;
            }
          }
          .score-to {
            .el-rate {
              margin-left: 5px;
              display: inline-block;
              .el-rate__icon {
                font-size: 12px;
              }
            }
          }
        }
        .gtleft {
          padding: 4px 4px 0 0;
          float: left;
          .ul {
            padding-top: 6px;
            li {
              float: left;
              display: inline;
              line-height: 14px;
              margin-right: 15px;
              img {
                max-width: 100%;
                margin-right: 5px;
              }
              a {
                text-decoration: none;
                color: #37a;
              }
            }
          }
        }
        .summary {
          float: left;
          clear: both;
          margin-top: 20px;
          .summary-title {
            color: #007722;
            font-size: 16px;
          }
        }
      }
      .right-side {
        float: right;
        width: 310px;
        .ticket {
          padding: 20px 0;
          margin-bottom: 40px;
          background-color: #f0f3f5;
          color: #999;
          font-size: 13px;
          text-align: center;
          a {
            display: inline-block;
            width: 160px;
            line-height: 30px;
            background: #268dcd;
            border-radius: 2px;
            color: #fff;
          }
        }
        .game-pic {
          img {
            display: inherit;
            margin: 0 auto;
          }
        }
        .qrcode-app {
          margin: 20px 0;
          border: none;
        }
      }
    }
  }
}
</style>
