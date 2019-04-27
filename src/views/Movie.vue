<template>
    <movieDetail v-bind:movieDetail="movieInfo" v-bind:me2movie="me2movie">

    </movieDetail>
</template>


<script>
import movieDetail from "@/components/movieDetail.vue";

export default {
    components:{
        movieDetail
    },
    data(){
        return{
            movieInfo:{},
            me2movie:{}
        }
    },
    mounted(){
        var url='/movie/'+this.$route.params.movieid;
        console.log(url)
        this.$http.get(url
        )
        .then(response=>{
            this.movieInfo=response.data;
            this.me2movie=response.data.me2movie
            this.$store.commit('changeMovieDetailLoading',false);
            
        })
        .catch(error=>{
            console.log('get movie detail error');
            this.$store.commit('changeMovieDetailLoading',false);
        })
    }
}
</script>