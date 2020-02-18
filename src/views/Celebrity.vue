<template>
  <celebrityDetail :celeInfo="info" :loadingInfo="loading"></celebrityDetail>
</template>

<script>
import celebrityDetail from "@/components/celebrityDetail.vue";

export default {
  props: ["celebrityid"],
  components: {
    celebrityDetail
  },
  data() {
    return {
      loading: true,
      info: {}
    };
  },
  watch: {
    $route(to, from) {
      this.fetchCelebrityInfo();
    }
  },
  mounted() {
    this.fetchCelebrityInfo();
  },
  methods: {
    fetchCelebrityInfo() {
      var url = "/celebrity/" + this.celebrityid;
      this.$http
        .get(url)
        .then(response => {
          this.info = response.data.data;
          this.loading = false;
        })
        .catch(error => {
          this.$message.error("未找到相关信息");
          this.$router.push("/");
          console.log("fetch celebrity info error.");
          this.loading = false;
        });
    }
  }
};
</script>
