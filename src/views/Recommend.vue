<template>
  <div>
    <movieList v-bind:movies="movieItems"  :nextPage='nextPage' :load='loading'></movieList> 
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
        movieItems:[],
        nextPage:''
      }
    },
    mounted(){
      this.getMovie('/movie/recommend')
    },
    methods:{
      getMovie(url){
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

