<template>
  <div role="login form">
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          type="string"
          v-model="loginForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="loginForm.pass"
          autocomplete="off"
          @keyup.native.enter="submitForm('loginForm')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('loginForm')"
          :disabled="disableLogin"
          >登陆</el-button
        >
        <el-button @click="resetForm('loginForm')">重置</el-button>
        <router-link to="/auth/forget-password" class="forget-password"
          >忘记密码?</router-link
        >
      </el-form-item>
    </el-form>
    <el-dialog title="重新发送确认邮件" :visible.sync="ratingFormVisible">
      <resentConfirmEmail></resentConfirmEmail>
    </el-dialog>
  </div>
</template>

<script>
import { callback, error } from "util";
import resentConfirmEmail from "./resentConfirmEmail";

export default {
  components: { resentConfirmEmail },
  data() {
    var validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }

      var username_rex = /^[a-zA-Z0-9\_]{6,16}$/;
      var rex_ok = username_rex.exec(value);
      if (!rex_ok) {
        return callback(new Error("用户名不符合要求"));
      }
      this.$http
        .get("/user/test/username", {
          params: {
            value: value
          }
        })
        .then(response => {
          callback();
        })
        .catch(error => {
          callback(new Error("用户不存在"));
        });
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      var password_rex = /^[0-9a-zA-Z\_\.\!\@\#\$\%\^\&\*]{6,20}$/;
      var rex_ok = password_rex.exec(value);
      if (!rex_ok) {
        return callback(new Error("密码不符合要求"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        pass: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
      },
      errorCount: 0,
      disableLogin: false,
      ratingFormVisible: false
    };
  },
  methods: {
    submitForm(formName) {
      if (this.disableLogin) {
        return false;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("OK");
          this.loginPost(this.loginForm.username, this.loginForm.pass);
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    loginPost(username, pass) {
      const params = new URLSearchParams();
      params.append("grant_type", "password");
      params.append("username", username);
      params.append("password", pass);
      this.$http
        .post("/token", params)
        .then(response => {
          this.showSucceedMess(this.loginForm.username);
          this.$store.commit("changeLogin", true);
          this.$store.commit("setUsername", username);
          this.$store.commit("setToken", response.data.access_token);
          this.$store.commit("setRole", response.data.role);
          this.$http.defaults.headers.common["Authorization"] =
            "bearer " + response.data.access_token;

          this.$router.push("/");
        })
        .catch(error => {
          this.errorCount = this.errorCount + 1;
          if (
            error.response.data.error_code === 1000 &&
            this.errorCount === 3
          ) {
            this.$message.info("未收到确认邮件?");
            this.ratingFormVisible = true;
          } else {
            if (this.errorCount === 5) {
              this.disableLogin = true;
              this.showFailedMess("错误次数太多,请稍后再试!");
            }
            this.showFailedMess(error.response.data.message);
          }
        });
    },
    showSucceedMess(username) {
      this.$message({
        showClose: true,
        message: username + " ，登陆成功!",
        type: "success"
      });
    },
    showFailedMess(message) {
      this.$message({
        showClose: true,
        message: message,
        type: "error"
      });
    }
  }
};
</script>

<style lang="less">
.forget-password {
  float: right;
  position: relative;
}
.el-dialog {
  height: auto;
  width: 40%;
}
</style>
