<template>
  <div class="head">
    <span class="title">修改电影信息</span>
    <br />
    <br />

    <el-form
      :model="movieForm"
      :rules="rules"
      ref="movieForm"
      label-width="100px"
      class="movie-form"
    >
      <el-form-item label="名称" prop="title">
        <el-input v-model="movieForm.title"></el-input>
      </el-form-item>
      <el-form-item label="类别" prop="subtype">
        <el-select v-model="movieForm.subtype" placeholder="请选择类别">
          <el-option label="电影" value="movie"></el-option>
          <el-option label="电视剧" value="tv"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="院线状态" prop="subtype" v-if="movieForm.subtype === 'movie'">
        <el-select v-model="movieForm.cinema_status" placeholder>
          <el-option label="结束上映" value="0"></el-option>
          <el-option label="正在上映" value="1"></el-option>
          <el-option label="即将上映" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="豆瓣ID" prop="douban_id">
        <el-input v-model="movieForm.douban_id"></el-input>
      </el-form-item>
      <el-form-item label="年份" prop="year">
        <el-select v-model="movieForm.year" placeholder="请选择年份">
          <el-option
            v-for="year in yearOptions"
            :key="year.key"
            :label="year.value"
            :value="year.key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="季数" prop="current_season" v-if="movieForm.subtype === 'tv'">
        <el-input v-model="movieForm.current_season" type="number"></el-input>
      </el-form-item>
      <el-form-item label="集数" prop="episodes_count" v-if="movieForm.subtype === 'tv'">
        <el-input v-model="movieForm.episodes_count" type="number"></el-input>
      </el-form-item>
      <el-form-item label="总季数" prop="seasons_count" v-if="movieForm.subtype === 'tv'">
        <el-input v-model="movieForm.seasons_count" type="number"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="genres">
        <el-input v-model="movieForm.genres" placeholder="多个标签以空格分割"></el-input>
      </el-form-item>
      <el-form-item label="国家" prop="countries">
        <el-input v-model="movieForm.countries" placeholder="多个国家以空格分割"></el-input>
      </el-form-item>
      <el-form-item label="导演" prop="directors">
        <el-select
          v-model="movieForm.directors"
          multiple
          filterable
          remote
          collapse-tags
          reserve-keyword
          placeholder="请输入关键词"
          style="width:400px"
          :remote-method="queryDirectors"
        >
          <el-option
            v-for="item in directorsOptions"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          >
            <img :src="item.image" style="max-height:50px" />
            <span style="float: right; color: #8492a6; font-size: 13px">
              {{
              item.label
              }}
            </span>
            <br />
          </el-option>
        </el-select>
        <el-button type="text" @click="changeTab">没有找到相关导演?</el-button>
      </el-form-item>
      <el-form-item label="演员" prop="casts">
        <el-select
          v-model="movieForm.casts"
          multiple
          filterable
          remote
          collapse-tags
          reserve-keyword
          placeholder="请输入关键词"
          style="width:400px"
          :remote-method="queryCelebrities"
        >
          <el-option
            v-for="item in celebritiesOptions"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          >
            <img :src="item.image" style="max-height:50px" />
            <span style="float: right; color: #8492a6; font-size: 13px">
              {{
              item.label
              }}
            </span>
            <br />
          </el-option>
        </el-select>
        <el-button type="text" @click="changeTab">没有找到相关演员?</el-button>
      </el-form-item>
      <el-form-item label="原名" prop="original_title">
        <el-input v-model="movieForm.original_title"></el-input>
      </el-form-item>
      <el-form-item label="又名" prop="aka">
        <el-input v-model="movieForm.aka" placeholder="多个又名以空格分割"></el-input>
      </el-form-item>
      <el-form-item label="摘要" prop="summary">
        <el-input v-model="movieForm.summary" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="image">
        <el-upload
          class="upload-demo"
          ref="upload"
          action
          :file-list="movieForm.imageFile"
          :auto-upload="false"
          :on-change="handleChange"
          :show-file-list="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2Mb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('movieForm')" v-loading="loading">修改电影信息</el-button>
        <el-button @click="resetForm('movieForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // props: ["movieid"]
  data() {
    return {
      yearOptions: [],
      next: "",
      loading: false,
      state: "",
      directorsOptions: [],
      celebritiesOptions: [],
      movieForm: {
        title: "",
        subtype: "movie",
        cinema_status: "1",
        douban_id: "",
        year: 2020,
        image: "",
        countries: "",
        original_title: "",
        summary: "",
        aka: "",
        genres: "",
        directors: [],
        casts: [],
        current_season: 0,
        seasons_count: 0,
        episodes_count: 0
      },
      rules: {
        title: [{ required: true, message: "请输入名称", trigger: "blur" }],
        year: [{ required: true, message: "请输入年份", trigger: "blur" }],
        subtype: [{ required: true, message: "请选择类型", trigger: "change" }],
        // image: [{ required: true, message: "请选择图片", trigger: "blur" }],
        summary: [{ required: true, message: "请输入摘要", trigger: "blur" }],
        countries: [
          { required: true, message: "请输入国家信息", trigger: "blur" }
        ],
        genres: [{ required: true, message: "请输入标签", trigger: "blur" }],
        // directors: [
        //   { required: true, message: "请选择导演", trigger: "change" }
        // ],
        // casts: [{ required: true, message: "请选择演员", trigger: "change" }]
      }
    };
  },
  created() {
    this.generateYears();
    var url = "/movie/" + this.$route.params.movieid;
    this.$http
      .get(url)
      .then(response => {
        var movieInfo = response.data.data;
        this.movieForm.title = movieInfo.title;
        this.movieForm.subtype = movieInfo.subtype;
        this.movieForm.cinema_status = movieInfo.cinema_status.toString();
        this.movieForm.douban_id = movieInfo.douban_id;
        this.movieForm.year = movieInfo.year;
        console.log(movieInfo);

        for (var i = 0; i < movieInfo.countries.length; i++) {
          this.movieForm.countries +=
            movieInfo.countries[i]["country_name"] + " ";
        }

        this.movieForm.original_title = movieInfo.original_title;
        this.movieForm.summary = movieInfo.summary;
        for (var i = 0; i < movieInfo.aka_list.length; i++) {
          this.movieForm.aka += movieInfo.aka_list[i] + " ";
        }
        console.log("here");

        for (var i = 0; i < movieInfo.genres.length; i++) {
          this.movieForm.genres += movieInfo.genres[i]["genre_name"] + " ";
        }
        for (var i = 0; i < movieInfo.directors.length; i++) {
          this.directorsOptions.push({
            label: movieInfo.directors[i].name,
            id: movieInfo.directors[i].id,
            image: movieInfo.directors[i].avatar_url
          });
          this.movieForm.directors.push(movieInfo.directors[i]["id"]);
        }
        for (var i = 0; i < movieInfo.celebrities.length; i++) {
          this.celebritiesOptions.push({
            label: movieInfo.celebrities[i].name,
            id: movieInfo.celebrities[i].id,
            image: movieInfo.celebrities[i].avatar_url
          });
          this.movieForm.casts.push(movieInfo.celebrities[i]["id"]);
        }
        this.movieForm.current_season = movieInfo.current_season;
        this.movieForm.seasons_count = movieInfo.seasons_count;
        this.movieForm.episodes_count = movieInfo.episodes_count;
      })
      .catch(error => {
        this.$message.error("未找到相关信息");
        this.$router.push("/");
        console.log("get movie detail error");
      });
  },
  methods: {
    generateYears() {
      for (var i = 1900; i <= 2030; i++) {
        this.yearOptions.push({
          key: i,
          value: i
        });
      }
    },
    handleCastChange(item) {
      console.log(item);
    },
    changeTab() {
      this.$emit("toUploadCelebrityTab", "");
    },
    forQuery(key, cate) {
      this.directorsOptions = [];
      if (key !== "") {
        this.$http
          .get("/search", {
            params: {
              cate: "celebrity",
              q: key
            }
          })
          .then(response => {
            if (cate === "directors") {
              for (var i = 0; i < response.data.data.items.length; i++) {
                this.directorsOptions.push({
                  label: response.data.data.items[i].name,
                  id: response.data.data.items[i].id,
                  image: response.data.data.items[i].avatar_url
                });
              }
            } else {
              for (var i = 0; i < response.data.data.items.length; i++) {
                this.celebritiesOptions.push({
                  label: response.data.data.items[i].name,
                  id: response.data.data.items[i].id,
                  image: response.data.data.items[i].avatar_url
                });
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.directorsOptions = [];
      }
    },
    queryDirectors(query) {
      this.forQuery(query, "directors");
    },
    queryCelebrities(query) {
      this.forQuery(query, "celebrities");
    },
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
      this.$message.success("添加图片成功");
      this.movieForm.image = file;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      console.log(this.movieForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateMovie();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    arrayToString(arr) {
      var res = "";
      for (var i = 0; i < arr.length; i++) {
        res = res + arr[i] + " ";
      }
      return res;
    },
    updateMovie() {
      this.loading = true;
      var casts = this.arrayToString(this.movieForm.casts);
      var directors = this.arrayToString(this.movieForm.directors);
      var params = new FormData();
      params.append('movie_id',this.$route.params.movieid)
      params.append("douban_id", this.movieForm.douban_id);
      params.append("title", this.movieForm.title);
      params.append("subtype", this.movieForm.subtype);
      params.append("year", this.movieForm.year);
      params.append("image", this.movieForm.image.raw);
      params.append("countries", this.movieForm.countries);
      params.append("genres_name", this.movieForm.genres);
      params.append("original_title", this.movieForm.original_title);
      params.append("summary", this.movieForm.summary);
      params.append("aka", this.movieForm.aka);
      params.append("director_ids", directors);
      params.append("celebrities_ids", casts);
      if (this.movieForm.subtype === "tv") {
        params.append("seasons_count", this.movieForm.seasons_count);
        params.append("episodes_count", this.movieForm.episodes_count);
        params.append("current_season", this.movieForm.current_season);
      }else{
          params.append('cinema_status',this.movieForm.cinema_status)
      }
      this.$http
        .patch("/movie", params)
        .then(response => {
          this.loading = false;
          this.$message.success("电影信息修改成功");
        })
        .catch(error => {
          this.loading = false;
          this.$message.error("修改失败,请检查信息后再试");
        });
    }
  }
};
</script>