<template>
  <div>
    <div class="head">
      <span class="title">你关注的......</span>
    </div>
    <div class="feed-content">
      <hr />
      <followFeed></followFeed>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import followFeed from "@/components/followFeed.vue";

export default {
  components: {
    followFeed
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style lang="less">
.feed-content {
  width: 950px;
  margin: 10px auto 0;
}
</style>
