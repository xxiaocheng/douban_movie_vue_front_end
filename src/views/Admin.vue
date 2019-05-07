<template>
  <div>
    <div class="setting-head">
      <span class="title">管理员</span>
    </div>
    <br>
    <div class="setting-content">
      <el-tabs tab-position="left" v-model="activeName">
        <el-tab-pane label="添加影视" name="uploadMovie">
          <uploadMovie v-on:toUploadCelebrityTab="toUploadCelebrityTab"></uploadMovie>
        </el-tab-pane>
        <el-tab-pane label="添加影人" name="uploadCelebrity">
          <uploadCelebrity></uploadCelebrity>
        </el-tab-pane>
        <el-tab-pane label="处理举报评论">
          <handleReportRating></handleReportRating>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import handleReportRating from "@/components/handleReportRating.vue";
import uploadCelebrity from "@/components/uploadCelebrity.vue";
import uploadMovie from "@/components/uploadMovie.vue";

export default {
  components: { handleReportRating, uploadCelebrity, uploadMovie },
  data() {
    return {
      activeName: "uploadMovie"
    };
  },
  methods: {
    toUploadCelebrityTab(tabName) {
      this.activeName = "uploadCelebrity";
    }
  }
};
</script>


<style lang="less">
</style>
