<template>
  <div class="movie-comment" v-loading="loading">
    <p class="movie-comment-title">{{title}} 的短评 · · · · · <small class="rating-count">(全部 {{ratingCount}} 条)</small></p>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item ><a @click="newRating">最新</a></el-breadcrumb-item>
      <el-breadcrumb-item ><a @click="hotRating">最热</a></el-breadcrumb-item>
    </el-breadcrumb>

    <div class="rating" v-for='(rating,id,index) in ratings' v-if="JSON.stringify(ratings) !== '{}'">
      <hr>
      <el-card :body-style="{ padding: '0px' }">
        <div class="head">
          <a><img src="http://localhost:5000/api/v1/photo/avatar/chengxiao_l.png" class="image avatar"></a>
          <a><span class="name">{{rating.username}}</span></a>
          <span class="cate" v-if="rating.cate===2">看过</span>
          <span class="cate" v-if="rating.cate===1">在看</span>
          <span class="cate" v-if="rating.cate===0">想看</span>
          <el-rate class="rating-score"
            v-model="rating.score/2"
            disabled
            text-color="#ff9900">
          </el-rate>
          <span class="time rating-time">{{ rating.time}}</span>
          <a class='report' @click="ratingAction(rating.id,'report')" ><i class="material-icons">error_outline</i></a>
          <a class="like like-status" v-if="ratings[id].me2rating==='like'" @click="ratingAction(id,'unlike')"><i class="material-icons">favorite</i><span class="like-count">{{ratings[id].likecount}}</span></a>
          <a class="like unlike-status" v-if="ratings[id].me2rating==='unlike'" @click="ratingAction(id,'like')"><i class="material-icons">favorite</i><span class="like-count">{{ratings[id].likecount}}</span></a>
        </div>
        <div style="padding: 14px;">
          <div class="bottom clearfix">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{rating.comment}}</p>
          </div>
        </div>
    </el-card>
    </div>
  </div>
</template>

<script>
  export default{
    props: ['title','movieId'],
    data(){
      return{
        thisMovieId:this.movieId,
        currentDate: "2019-04-09 18:33:30",
        score:3.5,
        ratings:{},
        ratingCount:0,
        ratingCate:'',
        nextPage:'',
        loading:true
      }
    },
    mounted(){
      this.fetchRating('hot',1)
    },
    methods:{
      ratingAction(id,typename){
        var url='/rating/'+id;
        var params=new URLSearchParams();
        params.append('typename',typename);
        this.$http.post(url,params
        )
        .then(response=>{
          this.showMessage(response.data.message,'success');
          if(typename==='like'){
            const ratings=this.ratings;
            ratings[id]['me2rating']='like';
            ratings[id]['likecount']=ratings[id]['likecount']+1;
            this.ratings={};
            this.ratings=ratings;
          }else if (typename==='unlike'){
            const ratings=this.ratings;
            ratings[id]['me2rating']='unlike';
            ratings[id]['likecount']=ratings[id]['likecount']-1;
            this.ratings={};
            this.ratings=ratings;
          }
        })
        .catch(error=>{
          this.showMessage(error.response.data.message,'warning');
        })
      },
      newRating(){
        console.log('new');
      },
      hotRating(){
        console.log('hot');
      },
      fetchRating(cate,page){
        this.ratingCata=cate;
        var url="/movie/"+this.thisMovieId+"/rating/all";
        this.$http.get(url,{
          params:{
            sort:cate,
            page:page
          }
        })
        .then(response=>{
          this.ratingCount=response.data.count;

          for (var i=0;i<response.data.items.length;i++){
            this.ratings[response.data.items[i].id]=response.data.items[i];
          }
          this.nextPage=response.data.next;
          this.loading=false;
        })
        .catch(error=>{
          console.log('get ratings error.')
          this.loading=false;
        })
      },
      showMessage(message,type){
          this.$message({
            showClose: true,
            message: message,
            type: type
          });
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .movie-comment{
    float: left;
    clear: both;
    margin-top: 20px;
    .movie-comment-title{
      color: #007722;
      font-size: 16px;
      .rating-count{
        color: rgb(43, 80, 226);
      }
    }
    .rating{
      width: 700px;
      .head{
        padding: 0;
        margin-bottom: 0;
        height: 30px;
        .avatar{
        left: 5px;
        width: 30px;
        height: 30px;
        float: left;
        position: relative;
        top: 3px;
        }
        .name{
          margin-left: 10px;
          position: relative;
          top:2px;
          font-size:2ch;
          float: left; 
          margin-right: 10px;
        }
        .cate{
          float: left;
          font-size: 1em;
          top: 5px;
          position: relative;
        }
        .rating-score{
          float: left;
          margin-left: 10px;
          position: relative;
          top:7px;
        }
        .rating-time{
          float: left;
          margin-left: 10px;
          position: relative;
          top:5px;
        }
        .like{
          float:right;
          position: relative;
          top: 5px;
          margin-right: 15px;
          text-decoration:none;
          .like-count{
            margin-left: 5px;
            top:-7px;
            position: relative;
            color: tomato;
          }
        }
        .unlike-status{
          color: rgb(136, 130, 157);
        }
        .like-status{
          color: red
        }
        .report{
          float:right;
          position: relative;
          color: gray;
          top: 5px;
        }
      }
      
    }
  }
</style>
