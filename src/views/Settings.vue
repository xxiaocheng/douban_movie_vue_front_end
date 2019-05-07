<template>
  <div>
    <div class="setting-head">
      <span class="title">用户设置</span>
    </div>
    <br />
    <div class="setting-content">
      <el-tabs tab-position="left" style="height: 400px;">
        <el-tab-pane label="基本信息">
          <profileSetting></profileSetting>
        </el-tab-pane>
        <el-tab-pane label="更改头像">
          <avatarSetting></avatarSetting>
        </el-tab-pane>
        <el-tab-pane label="修改密码">
          <changePassword></changePassword>
        </el-tab-pane>
        <el-tab-pane label="修改邮箱">
          <changeEmail></changeEmail>
        </el-tab-pane>
        <el-tab-pane label="删除账户">
          <deleteAccount></deleteAccount>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import avatarSetting from "@/components/avatarSetting.vue";
import profileSetting from "@/components/profileSetting.vue";
import changePassword from "@/components/changePassword.vue";
import changeEmail from "@/components/changeEmail.vue";
import deleteAccount from "@/components/deleteAccount.vue";

export default {
  components: {
    avatarSetting,
    profileSetting,
    changePassword,
    changeEmail,
    deleteAccount
  },
  data() {
    return {};
  }
};
</script>

<style lang="less">
.setting-head {
  width: 1150px;
  margin: 30px auto;
}
.setting-content {
  width: 1200px;
  margin: 30px auto;
  .el-tabs__item {
    font-size: 17px;
  }
}
</style>
