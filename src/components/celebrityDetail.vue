<template>
  <div class="container-moving" v-loading="loadingInfo">
    <div class="content">
      <h1>
        <span class="title">{{celebrityInfo.name}}</span>
      </h1>
      <div class="detail clearfix">
        <div class="left-side">
          <div class="actor-list">
            <div class="subject">
              <div class="mainpic">
                <img class="movieImg" :src="celebrityInfo.image" alt>
              </div>
              <div class="info">
                <span class="p1" v-if="celebrityInfo.gender">性别:</span>
                <span class="attrs">{{celebrityInfo.gender}}</span>
                <br v-if="celebrityInfo.gender">
                <span class="p1" v-if="celebrityInfo.born_place">出生地:</span>
                <span class="attrs">{{celebrityInfo.born_place}}</span>
                <br v-if="celebrityInfo.born_place">
                <span class="p1" v-if="celebrityInfo.name_en">英文名:</span>
                <span class="attrs">{{celebrityInfo.name_en}}</span>
                <br v-if="celebrityInfo.name_en">
                <span class="p1" v-if="JSON.stringify(celebrityInfo.aka_en) !== '[]'">更多外文名:</span>
                <span v-for="name in celebrityInfo.aka_en" class="attrs">{{name}}/</span>
                <br v-if="JSON.stringify(celebrityInfo.aka_en) !== '[]'">
                <span
                  class="p1"
                  v-if="JSON.stringify(celebrityInfo.aka) !=='[]' "
                >更多中文名:</span>
                <span v-for="name in celebrityInfo.aka" class="attrs">{{name}}/</span>
                <br v-if="JSON.stringify(celebrityInfo.aka) !=='[]'">
                <span class="p1" v-if="celebrityInfo.douban_id">豆瓣链接:</span>
                <span>
                  <a
                    :href="'https://movie.douban.com/celebrity/'+celebrityInfo.douban_id"
                    target="_blank"
                  >{{celebrityInfo.douban_id}}</a>
                </span>
                <br v-if="celebrityInfo.douban_id">
              </div>
            </div>
            <div>
              <el-button type="danger" @click="deleteCelebrityConfirm" v-if="this.$store.state.role!=='user'">删除该影人</el-button>
            </div>
          </div>
        </div>
      </div>
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="ta导演的" name="direct">
          <movieList :movies="celebrityInfo.direct_movies" v-loading="loadingInfo"></movieList>
        </el-tab-pane>
        <el-tab-pane label="ta参演的" name="cast">
          <movieList :movies="celebrityInfo.casts_movies" v-loading="loadingInfo"></movieList>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>


<script>
import movieList from "@/components/celebrityMovieCard.vue";
export default {
  components: {
    movieList
  },
  props: ["celeInfo", "loadingInfo"],
  data() {
    return {
      celebrityInfo:this.celeInfo,
      activeName: "direct"
    };
  },
  watch:{
    celeInfo(a,b){
      this.celebrityInfo=a;
    }
  },
  methods: {
    deleteCelebrityConfirm() {
      this.$confirm("此操作将永久该影人, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteCelebrity();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deleteCelebrity() {
      this.$http
        .delete("/celebrity/" + this.celebrityInfo.id)
        .then(response => {
          this.$message.success("当前影人信息已被删除");
        })
        .catch(error => {
          this.$message.error("请稍后再试");
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
    min-height: 420px;
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
            width: 500px;
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
              max-width: 300px;
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
        }
      }
    }
  }
}
</style>
