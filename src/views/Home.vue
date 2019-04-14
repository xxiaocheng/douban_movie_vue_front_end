<template>
  <div>
    <movieList v-bind:movies="this.$store.state.movieItems" v-loading="this.$store.state.movieLoading"></movieList>
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
      }
    },
    mounted(){
      this.getMovie('/movie/cinema/coming')
    },
    methods:{
      getMovie(url){
        this.$http.get(url
        )
        .then(response=>{
          this.$store.commit('setMovieItems',response.data.items);
          this.$store.commit('setNextMovie',response.data.next);
          this.$store.commit('changeLoading',false)
        })
        .catch(error=>{
          this.error=true
        })
      },
      loadMore(){
        this.getMovie(this.nextPage)
      }
    }
}
</script>

