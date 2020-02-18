<template>
  <div>
    <el-form
      :model="celebrityForm"
      :rules="rules"
      ref="celebrityForm"
      label-width="100px"
      class="celebrity-form "
    >
      <el-form-item label="影人名称" prop="name">
        <el-input v-model="celebrityForm.name"></el-input>
      </el-form-item>
      <el-form-item label="影人性别" prop="gender">
        <el-select v-model="celebrityForm.gender" placeholder="请选择性别">
          <el-option label="男" value="male"></el-option>
          <el-option label="女" value="female"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="豆瓣ID" prop="douban_id">
        <el-input v-model="celebrityForm.douban_id"></el-input>
      </el-form-item>
      <el-form-item label="英文名" prop="nama_en">
        <el-input v-model="celebrityForm.nama_en"></el-input>
      </el-form-item>
      <el-form-item label="出生地" prop="born_place">
        <el-input v-model="celebrityForm.born_place"></el-input>
      </el-form-item>
      <el-form-item label="又名" prop="aka">
        <el-input
          v-model="celebrityForm.aka"
          placeholder="多个又名以'/'分割"
        ></el-input>
      </el-form-item>
      <el-form-item label="外文名" prop="aka_en">
        <el-input
          v-model="celebrityForm.aka_en"
          placeholder="多个外文名以'/'分割"
        ></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="upload-demo"
          ref="upload"
          action
          :file-list="celebrityForm.avatarFile"
          :auto-upload="false"
          :on-change="handleChange"
          :show-file-list="false"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过2Mb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('celebrityForm')"
          v-loading="loading"
          >立即创建</el-button
        >
        <el-button @click="resetForm('celebrityForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      celebrityForm: {
        name: "",
        gender: "",
        douban_id: "",
        name_en: "",
        born_place: "",
        aka: "",
        aka_en: "",
        avatar: []
      },
      rules: {
        name: [{ required: true, message: "请输入影人姓名", trigger: "blur" }],
        gender: [
          { required: true, message: "请选择艺人性别", trigger: "change" }
        ],
        avatar: [{ required: true, message: "请选择影人头像", trigger: "blur" }]
      },
      loading: false
    };
  },
  methods: {
    handleChange(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isJPG =
        file.raw.type === "image/jpeg" || file.raw.type === "image/png";
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 2MB!");
        return false;
      }
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
        return false;
      }
      this.$message.success("添加头像成功");
      this.celebrityForm.avatar = file;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.celebrityForm.avatar) {
            this.$message.error("请添加头像");
            return false;
          }
          this.uploadCelebrity();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    uploadCelebrity() {
      this.loading = true;
      var params = new FormData();
      params.append("image", this.celebrityForm.avatar.raw);
      params.append("name", this.celebrityForm.name);
      params.append("douban_id", this.celebrityForm.douban_id);
      params.append("gender", this.celebrityForm.gender);
      params.append("name_en", this.celebrityForm.name_en);
      params.append("born_place", this.celebrityForm.born_place);
      params.append("aka", this.celebrityForm.aka);
      params.append("aka_en", this.celebrityForm.aka_en);
      this.$http
        .post("/celebrity", params)
        .then(response => {
          this.loading = false;
          this.$message.success("影人信息添加成功");
        })
        .catch(error => {
          this.loading = false;
          this.$message.error("添加失败,请稍后再试");
        });
    }
  }
};
</script>

<style lang="less">
.celebrity-form {
  max-width: 500px;
}
</style>
