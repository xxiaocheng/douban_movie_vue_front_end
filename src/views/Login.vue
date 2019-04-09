<template>
    <div>
        <myLoginForm class="loginform" ></myLoginForm>
    </div>
</template>


<script>
import myLoginForm from "@/components/loginform.vue";

export default {
    name:"loginform",
    components:{
        myLoginForm
    }
}
</script>


<style>
.loginform{
    height: 200px;
    width: 400px;
    position: absolute;
    left: 15%;
    top:25%
}
</style>