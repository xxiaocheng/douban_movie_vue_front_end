<template>
  <div>
    <el-form
      :model="changePassForm"
      status-icon
      :rules="rules"
      ref="changePassForm"
      label-width="100px"
      class="change-password-form"
    >
      <el-form-item label="旧密码" prop="oldPass">
        <el-input
          type="password"
          v-model="changePassForm.oldPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input
          type="password"
          v-model="changePassForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="再次确认" prop="checkPass">
        <el-input
          type="password"
          v-model="changePassForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('changePassForm')"
          >保存修改</el-button
        >
        <el-button @click="resetForm('changePassForm')">重置</el-button>
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
        if (this.changePassForm.checkPass !== "") {
          this.$refs.changePassForm.validateField("checkPass");
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
      } else if (value !== this.changePassForm.pass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      changePassForm: {
        oldPass: "",
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
          this.modifyPass();
          console.log("ok");
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    modifyPass() {
      const params = new URLSearchParams();
      params.append("old_password", this.changePassForm.oldPass);
      params.append("new_password", this.changePassForm.pass);
      this.$http
        .patch("/user/password", params)
        .then(response => {
          this.$message.success(response.data.message);
        })
        .catch(error => {
          this.$message.error(error.response.data.message);
        });
    }
  }
};
</script>

<style lang="less">
.change-password-form {
  width: 400px;
}
</style>
