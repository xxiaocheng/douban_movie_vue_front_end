<template>
  <div>
    <div class="delete-account">
      <p>删除账号后您的账号不可恢复</p>
      <p>您的私有数据将被永远删除</p>
      <br />
      <a @click="open">是否仍要注销</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: ""
    };
  },
  methods: {
    open() {
      this.$prompt("请输入密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: "密码不能为空!",
        inputType: "password"
      })
        .then(({ value }) => {
          this.password = value;
          this.$confirm("此操作将永久删除账号, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(_ => {
              this._deleteAccount();
            })
            .catch(_ => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    logout() {
      localStorage.removeItem("isLogin");
      localStorage.removeItem("token");
      this.$router.push("/");
      this.$store.commit("changeLogin", false);
    },
    _deleteAccount() {
      const params = new URLSearchParams();
      params.append("password", this.password);
      this.$http
        .delete("/users/current_user", {
          data: params,
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(response => {
          this.$message.success("成功删除账号!");
          this.logout();
        })
        .catch(error => {
          this.$message.error(" 请确认密码后重试!");
        });
    }
  }
};
</script>

<style lang="less">
.delete-account {
  width: 850px;
  margin: 10px auto 0;
}
</style>
