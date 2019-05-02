<template>
    <div>
        <div class="head">
            <span class="title">{{title}}...</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <a @click="togleType"><span class="togle">{{otherTitle}} </span></a>
        </div>
        <movieList v-bind:movies="current.items"  :nextPage='current.next' :load='loading'></movieList> 
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
        error:false,
        loading:true,
        current:{
          items:[],
          next:'',
        },
        coming:{
          items:[],
          next:''
        },
        showing:{
          items:[],
          next:''
        },
        currentType:'showing',
        title:'正在上映',
        otherTitle:'即将上映'
      }
    },
    mounted(){
      this.getMovie('showing');
      this.current=this.showing;
      
    },
    methods:{
      togleType(){
        if(this.coming.items.length===0){
          this.getMovie('coming');
        }
        // 切换标题
        var t=this.title;
        this.title=this.otherTitle;
        this.otherTitle=t;
        if(this.currentType==='showing'){
          this.current=this.coming;
          this.currentType='coming';
        }else{
          this.current=this.showing;
          this.currentType='showing';
        }

      },
      getMovie(coming_or_showing){
        if(coming_or_showing==='coming'){
          var url='/movie/cinema/coming';
        }else{
          var url='/movie/cinema/showing';
        }
        this.loading=true;
        this.$http.get(url
        )
        .then(response=>{
          if(coming_or_showing==='showing'){
            this.showing.items=response.data.items;
            this.showing.next=response.data.next;
          }else{
            this.coming.items=response.data.items;
            this.coming.next=response.data.next;
          }
          this.loading=false;
        })
        .catch(error=>{
          this.error=true;
          this.loading=false
        })
      }
    }
}
</script>


<style lang="less">
.head{
    width: 950px;
    margin: 30px auto;
    
}
</style>
