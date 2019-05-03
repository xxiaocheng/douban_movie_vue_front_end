<template>
  <div>
    <div class="setting-avatar">
      <div class="avatar">
        <!-- <div class="account-form-avatar">
          <img src="http://localhost:5000/api/v1/photo/avatar/chengxiao_l.png" class="avatar-img">
        </div> -->
        <div class="change-avatar">
          <el-upload
            drag
            action
            class="avatar-uploader"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="changeUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <div v-else>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖拽到此处即可</div>
              <div class="el-upload__tip">支持 PNG/JPEG/JPG 图片格式，单张图片最大支持2MB</div>
            </div>
          </el-upload>
        </div>
      </div>
    </div>
    <el-dialog title="图片剪裁" :visible.sync="dialogVisible">
      <div class="cropper-content">
        <div class="cropper" style="text-align:center">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :fixedBox="option.fixedBox"
          ></vueCropper>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="finish" :loading="loading">上传</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      dialogVisible: false,
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "jpeg", // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      loading: false,
      fileinfo: "",
      previews: {},
      fileName: ""
    };
  },
  methods: {
    changeUpload(file, picsList) {
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
      this.fileName = file.raw.name;
      this.fileinfo = file;
      this.option.img = URL.createObjectURL(file.raw);
      //   上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        // this.option.img = file.url;
        this.dialogVisible = true;
      });
    },
    finish() {
      this.$refs.cropper.getCropBlob(data => {
        var fileName = "goods" + this.fileinfo.uid;
        var newPicUrl = URL.createObjectURL(data);
        this.imageUrl = newPicUrl;
        var file = new File([data], this.fileName);
        this.uploadAvatar(this.fileinfo.raw,file);
      });
      this.dialogVisible = false;
    },
    uploadAvatar(raw_file,crop_file) {
      this.loading = true;
      var params = new FormData();
      params.append("raw_file", raw_file);
      params.append('l_file',crop_file);
      this.$http
        .post("/user/upload-avatar", params)
        .then(response => {
          this.loading = false;
          this.$message.success('更换头像成功');
        })
        .catch(error => {
          this.loading = false;
          console.log("upload error");
          this.$message.error('不小心失败啦');
        });
    }
  }
};
</script>

<style lang="less">
.cropper-content {
  .cropper {
    width: auto;
    height: 300px;
  }
}
.setting-avatar {
  width: 800px;
  margin: 10px auto 0;
  .avatar {
    margin-bottom: 20px;
    position: relative;
    .account-form-label {
      float: left;
      display: block;
      line-height: 40px;
      height: 40px;
      width: 60px;
      font-size: 13px;
    }
    .account-form-avatar {
      display: inline;
      margin: 0;
      padding: 0;
      .avatar-img {
        max-width: 300px;
        overflow: hidden;
        position: relative;
        margin-right: 10px;
        vertical-align: top;
      }
    }
    .change-avatar {
      display: inline-block;
      margin: 0;
      padding: 0;
      .avatar-uploader .el-upload {
        width: 300px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .el-upload-dragger {
        height: 300px;
        width: 300px;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 180px;
        height: 180px;
        line-height: 180px;
        text-align: center;
      }
      .new-avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
}
</style>
