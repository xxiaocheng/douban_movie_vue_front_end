<template>
    <div class="moviesList" >
        <div class="movie-container">
            <div class="movieTag" v-for="movie in movies" >
                <ul>
                    <li class="film-pic">
                        <router-link v-bind:to="'/movie/'+movie.id">
                        <img class="movieImg"  v-bind:src="movie.image" alt="">
                        </router-link>
                    </li>
                    <li class="film-name">
                        <router-link v-bind:to="'/movie/'+movie.id">{{movie.title}}</router-link>
                    </li>
                    <li class="film-rate">
                        <el-rate
                            v-model="movie.score/2"
                            disabled
                            text-color="#ff9900">
                        </el-rate>
                    </li>
                    <li class="film-button">
                    </li>
                </ul>
            </div>
            <div class="load-more" v-if="this.$store.state.nextMovie" v-on:click="loadMore">加载更多</div>
        </div>
  </div>
</template>
<script>
export default {
    props:{
        movies:Array
    },
    methods: {
      loadMore(){
          this.$http.get(this.$store.state.nextMovie
          ).then(response=>{
            this.$store.commit('setMovieItems',this.$store.state.movieItems.concat(response.data.items));
            this.$store.commit('setNextMovie',response.data.next);
            this.$store.commit('changeLoading',false)
            })
            .catch(error=>{
            this.error=true
            })
      }  
    },
}
</script>



<style rel="stylesheet/less" lang="less">
@import "../../style/color";
@import "../../style/base";
.moviesList{
  width: 950px;
  margin: 10px auto 0;
  min-height: 500px;
  .movie-container{
    width: 700px;
    margin-top: -10px;
    .movieTag{
      padding-top: 20px;
      width: 118px;
      height: 270px;
      overflow: hidden;
      font-size: 12px;
      text-align: center;
      display: inline-block;
      margin: 0 20px 20px 0;
      ul{
        margin: 0 auto;
        padding: 0;
        li{
          list-style: none;
        }
      }
      a{
        cursor: pointer;
        text-decoration: none;
      }
      .film-pic{
        height: 180px;
        margin-bottom: 12px;
        overflow: hidden;
        a{
          img{
            width: 128px;
            vertical-align: middle;
          }
        }
      }
      .film-name{
        font-size: 14px;
        white-space: nowrap;
        height: 22px;
        overflow: hidden;
        a{
          display: inline-block;
          word-spacing: normal;
          height: 24px;
          line-height: 24px;
          text-decoration: none;
          color: black;
        }
      }
      .film-rate{
        display: inline-block;
        margin: 4px auto 2px;
        height: 19px;
        .el-rate{
          display: inline-block;
          .el-rate__icon{
            font-size: 12px;
          }
        }
        .rateNum{
          display: inline-block;
          font-size: 12px;
        }
      }
      .film-button{
        span{
          display: block;
          margin:0 auto;
          text-align: center;
          width: 90px;
          height: 24px;
          line-height: 24px;
          background-color:#268dcd;
          border-radius: 2px;
          a{
            color: #fff;
          }
        }

      }

    }
    .load-more{
      cursor: pointer;
      width: 700px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: #eee;
      color: @doubanColor;
    }
  }

}
</style>
