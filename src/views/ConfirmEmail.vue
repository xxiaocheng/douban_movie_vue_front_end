<template> </template>

<script>
// import { URLSearchParams } from 'url';
export default {
  mounted() {
    var token = this.$route.query.token;
    const params = new URLSearchParams();
    params.append("token", token);
    this.$http
      .post("/account/confirm-email", params)
      .then(response => {
        this.showSucceedMess(response.data.message);
        this.$router.push("/login");
      })
      .catch(error => {
        this.showErrorMess(error.response.data.message);
        this.$router.push("/");
      });
  },
  methods: {
    showSucceedMess(message) {
      this.$message({
        showClose: true,
        message: message,
        type: "success"
      });
    },
    showErrorMess(message) {
      this.$message({
        howClose: true,
        message: message,
        type: "error"
      });
    }
  }
};
</script>

<style scoped>
.mytitle {
  position: absolute;
  left: 20%;
  top: 30%;
}
</style>
