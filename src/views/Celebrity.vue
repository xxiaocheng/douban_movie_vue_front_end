<template>
    <celebrityDetail :celebrityInfo='info' :loadingInfo='loading'></celebrityDetail>
</template>

<script>
import celebrityDetail from "@/components/celebrityDetail.vue";

export default {
    components:{
        celebrityDetail
    },
    data() {
        return {
            loading:true,
            celebrityId:this.$route.params.celebrityid,
            info:{}
        }
    },
    mounted(){
        this.fetchCelebrityInfo();
    },
    methods:{
        fetchCelebrityInfo(){
            var url='/celebrity/'+this.celebrityId;
            this.$http.get(url
            )
            .then(response=>{
                this.info=response.data;
                this.loading=false;
            })
            .catch(error=>{
                console.log('fetch celebrity info error.');
                this.loading=false;
            })
        }
    }
}
</script>