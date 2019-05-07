<template>
  <!--重置密码页面 ,输入两次密码 ,充值密码-->
  <div>
    <el-form
      :model="resetPasswordForm"
      status-icon
      :rules="rules"
      ref="resetPasswordForm"
      label-width="100px"
      class="resetPasswordForm"
    >
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="resetPasswordForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="resetPasswordForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('resetPasswordForm')"
          >重置密码</el-button
        >
        <el-button @click="resetForm('resetPasswordForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      var password_rex = /^[0-9a-zA-Z\_\.\!\@\#\$\%\^\&\*]{6,20}$/;
      var rex_ok = password_rex.exec(value);
      if (!rex_ok) {
        return callback(new Error("密码不符合要求"));
      } else {
        if (this.resetPasswordForm.checkPass !== "") {
          this.$refs.resetPasswordForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      }
      var password_rex = /^[0-9a-zA-Z\_\.\!\@\#\$\%\^\&\*]{6,20}$/;
      var rex_ok = password_rex.exec(value);
      if (!rex_ok) {
        return callback(new Error("密码不符合要求"));
      } else if (value !== this.resetPasswordForm.pass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      resetPasswordForm: {
        pass: "",
        checkPass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var token = this.$route.query.token;
          const params = new URLSearchParams();
          params.append("password", this.resetPasswordForm.pass);
          params.append("token", token);
          this.$http
            .post("/account/reset-password", params)
            .then(response => {
              this.showSucceedMess(response.data.message);
              this.$router.push("/login");
            })
            .catch(error => {
              this.showFailedMess(error.response.data.message);
            });
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    showSucceedMess(message) {
      this.$message({
        showClose: true,
        message: message,
        type: "success"
      });
    },
    showFailedMess(message) {
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
.resetPasswordForm {
  height: 200px;
  width: 400px;
  position: absolute;
  left: 15%;
  top: 25%;
}
</style>
