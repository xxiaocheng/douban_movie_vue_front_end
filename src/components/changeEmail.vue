<template>
  <div class="change-email">
    <div>
      <span class="label">邮箱:</span>
      <span>{{ currentEmail }}</span
      >&nbsp;&nbsp;&nbsp;&nbsp;
      <a @click="changeEmail">更改邮箱</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentEmail: ""
    };
  },
  methods: {
    _changeEmail() {
      this.$http
        .post("/auth/change-email")
        .then(response => {
          this.$message.success(response.data.message);
        })
        .catch(error => {
          this.$message.error(error.response.data.message);
        });
    },
    changeEmail() {
      this.$confirm("此操作将更换绑定邮箱, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(_ => {
          this._changeEmail();
        })
        .catch(_ => {});
    },
    fetchEmail() {
      this.$http
        .get("/user")
        .then(response => {
          this.currentEmail = response.data.email;
        })
        .catch(response => {
          console.log("fetch email error");
        });
    }
  },
  created() {
    this.fetchEmail();
  }
};
</script>

<style lang="less">
.change-email {
  width: 850px;
  margin: 10px auto 0;
  .label {
    font-size: 1.2em;
  }
}
</style>
