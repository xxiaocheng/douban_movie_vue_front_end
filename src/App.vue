<template>
  <div id="app">
    <myNavbar></myNavbar>
    <router-view></router-view>
  </div>
</template>

<script>
import myNavbar from "@/components/navbar.vue";

export default {
  name:'navbar',
  components:{
    myNavbar
  }  
}
</script>

