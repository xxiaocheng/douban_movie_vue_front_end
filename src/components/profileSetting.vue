<template>
  <div>
    <el-form
      :model="profileForm"
      status-icon
      :rules="rules"
      ref="profileForm"
      label-width="100px"
      class="profile-form" 
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="profileForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="个性签名" prop="signature">
        <el-input type="textarea" v-model="profileForm.signature" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="长居地" prop="location">
        <el-cascader
          size="large"
          :options="options"
          v-model="profileForm.location"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('profileForm')">保存修改</el-button>
        <el-button @click="resetForm('profileForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { provinceAndCityData } from "element-china-area-data";
export default {
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
        .get("/user/validate", {
          params: {
            type_name: "username",
            value: value
          }
        })
        .then(response => {
          callback();
        })
        .catch(error => {
          if (value === this.currentUsername) {
            callback();
          } else {
            callback(new Error("用户名已存在"));
          }
        });
    };
    var validateSignature = (rule, value, callback) => {
      if (value.length > 50) {
        return callback(new Error("长度不能超过50个字符"));
      } else {
        callback();
      }
    };
    return {
      profileForm: {
        username: "",
        signature: "",
        location: []
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        signature: [{ validator: validateSignature, trigger: "blur" }]
      },
      currentUsername: "",
      options: provinceAndCityData
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            this.putchInfo();
          console.log("submit");
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    fillFormDefault() {
      var currentUsername = this.$store.state.username;
      this.currentUsername = currentUsername;
      this.$http
        .get("/user")
        .then(response => {
          this.profileForm.username = response.data.name;
          this.profileForm.signature = response.data.signature;
          //   this.profileForm.location = response.data.loc_name;
        })
        .catch(error => {
          console.log("fetch default info error.");
        });
    },
    putchInfo(){
        const params = new URLSearchParams();
        params.append('username',this.profileForm.username);
        params.append('signature',this.profileForm.signature);
        var location=this.profileForm.location[0]+'.'+this.profileForm.location[1];
        params.append('location',location)
        this.$http.patch('/user',
        params
        )
        .then(response=>{
            this.$message.success("修改成功!");
        })
        .catch(error=>{
            this.$message.error("修改失败,请稍后再试!");
        })
    }
  },
  created() {
    this.fillFormDefault();
  }
};
</script>


<style lang="less">

.profile-form{
    width: 400px;
    .el-cascader{
        width: 300px;
    }
}

</style>
