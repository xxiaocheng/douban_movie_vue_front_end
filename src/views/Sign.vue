<template>
    <div>
        <mySignForm class="signform"></mySignForm>
        
    </div>
</template>


<script>
import mySignForm from "@/components/signform.vue";

export default {
    name:'signform',
    components:{
        mySignForm
    }
}
</script>

<style>
.signform{
    height: 200px;
    width: 400px;
    position: absolute;
    left: 15%;
    top:25%
}
</style>
