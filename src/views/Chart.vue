<template>
  <div>
      <div class="head">
        <span class="title">{{tagTitle||title}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <a @click="togleTitle"><span>{{otherTitle}}</span></a>&nbsp;&nbsp;&nbsp;&nbsp;
        <a @click="showTags"><span>分类排行榜</span></a>                
      </div>
      <movieList v-bind:movies="movieItems"  :nextPage='nextPage' :load='loading'></movieList> 
      <el-dialog title="选择标签" :visible.sync="dialogVisible" >
        <el-tag type="success" @click="choiceTag(tag.name)" v-for="tag in tags" v-if='tags'>{{tag.name}}&nbsp;&nbsp;&nbsp;&nbsp;</el-tag>
      </el-dialog>
  </div>

</template>

<script>
// @ is an alias to /src
import movieList from "@/components/moviecard.vue";

export default {
    components:{
        movieList
    },
    data() {
      return {
        dialogVisible:false,  
        error:false,
        loading:true,
        movieItems:[],
        nextPage:'',
        tagTitle:'',
        title:'周排行榜',
        otherTitle:'月排行榜',
        tags:[],
        currentTag:'',
        currentRange:'week',
      }
    },
    mounted(){
      this.getMovie('/movie/leaderboard/week');
      this.fetchTags();
    },
    methods:{
      choiceTag(tagName){
        console.log(tagName);
        this.currentTag=tagName;
        this.dialogVisible=false;
        this.tagTitle="豆瓣电影分类排行榜 - "+tagName+"片";
        var url='/movie/typerank?type_name='+tagName;
        this.getMovie(url);
        
      },
      fetchTags(){
        this.$http.get('/tags'
        )
        .then(response=>{
          this.tags=response.data.items;
        })
        .catch(error=>{
          console.log('fetch tags error.');
        })
      },
      togleTitle(){
        var t =this.title;
        this.title=this.otherTitle;
        this.otherTitle=t;
        this.tagTitle='';
        if(this.currentRange==='week'){
          this.getMovie('/movie/leaderboard/month');
          this.currentRange='month';
        }else{
          this.getMovie('/movie/leaderboard/week');
          this.currentRange='week';
        }
      },
      showTags(){
        this.dialogVisible=true;
      },
      getMovie(url){
        this.loading=true;
        this.$http.get(url
        )
        .then(response=>{
          this.movieItems=response.data.items;
          this.nextPage=response.data.next;
          this.loading=false;

        })
        .catch(error=>{
          this.error=true;
          this.loading=false
        })
      },
    }
}
</script>

<style lang="less">

</style>
