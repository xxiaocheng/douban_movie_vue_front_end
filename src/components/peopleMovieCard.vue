<template>
    <div>
        <div class="movie" v-for="movie in movies" v-if='movies'>
            <el-card :body-style="{ padding: '0px' }" shadow="always">
                <router-link  :to="'/movie/'+movie.movie.id">
                <img :src="movie.movie.image" class="image" >
                <div class="content">
                    <span class="movie-title">{{movie.movie.title}}</span>
                    <span class="movie-year">{{movie.movie.year}}</span><br><br>
                    <el-rate
                        v-model="movie.score/2"
                        disabled
                        text-color="#ff9900"
                        score-template="{value}">
                    </el-rate>
                    <span v-if='movie.tags.length!==0'>标签:&nbsp;&nbsp;<small v-for="tag in movie.tags">{{tag+' '}}</small></span><br>
                    <span v-if='movie.comment'>评价:&nbsp;&nbsp;<small>{{movie.comment}}</small></span>
                    <br>
                    <small class="time">{{movie.time}}</small>
                </div>
                </router-link >
            </el-card>
            <br>
        </div>
    
    </div>
</template>


<script>
export default {
    props:['movies'],

}
</script>

<style lang="less" rel="stylesheet/less">
@import "../../style/color";
.movie{
    a:visited{
    color:black;
    }
    .image{
        float: left;
        width: 115px;
        vertical-align: middle;
    }
    .content{
        left: 20px;
        position: relative;
        .movie-title{
            font-size:1.1em;
        }
        .movie-year{
            left: 10px;
            position: relative;
            color: #888;
        }
        
    }

}

</style>