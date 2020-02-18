<template>
  <div>
    <div class="head">
      <span class="title">{{ tagTitle || title }}</span
      >&nbsp;&nbsp;&nbsp;&nbsp;
      <a @click="togleTitle"
        ><span>{{ otherTitle }}</span></a
      >&nbsp;&nbsp;&nbsp;&nbsp;
      <a @click="showTags"><span>分类排行榜</span></a>
    </div>
    <movieList
      v-bind:movies="movieItems"
      :nextPage="nextPage"
      :load="loading"
    ></movieList>
    <el-dialog title="选择标签" :visible.sync="dialogVisible">
      <el-tag
        type="success"
        @click="choiceTag(tag)"
        v-for="tag in tags"
        v-if="tags"
        >{{ tag.genre_name }}&nbsp;&nbsp;&nbsp;&nbsp;</el-tag
      >
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import movieList from "@/components/moviecard.vue";

export default {
  components: {
    movieList
  },
  data() {
    return {
      dialogVisible: false,
      error: false,
      loading: true,
      movieItems: [],
      nextPage: "",
      tagTitle: "",
      title: "周排行榜",
      otherTitle: "月排行榜",
      tags: [],
      currentTag: "",
      currentRange: "week"
    };
  },
  mounted() {
    this.getMovie("/movie/leader-board/week");
    this.fetchTags();
  },
  methods: {
    choiceTag(genre) {
      console.log(genre.id);
      this.currentTag = genre.genre_name;
      this.dialogVisible = false;
      this.tagTitle = "豆瓣电影分类排行榜 - " + genre.genre_name + "片";
      var url = "/movie/genre/" + genre.id;
      this.getMovie(url);
    },
    fetchTags() {
      this.$http
        .get("/genre")
        .then(response => {
          this.tags = response.data.data;
        })
        .catch(error => {
          console.log("fetch tags error.");
        });
    },
    togleTitle() {
      var t = this.title;
      this.title = this.otherTitle;
      this.otherTitle = t;
      this.tagTitle = "";
      if (this.currentRange === "week") {
        this.getMovie("/movie/leader-board/month");
        this.currentRange = "month";
      } else {
        this.getMovie("/movie/leader-board/week");
        this.currentRange = "week";
      }
    },
    showTags() {
      this.dialogVisible = true;
    },
    getMovie(url) {
      this.loading = true;
      this.$http
        .get(url)
        .then(response => {
          this.movieItems = response.data.data.items;
          this.nextPage = response.data.data.next;
          this.loading = false;
        })
        .catch(error => {
          this.error = true;
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less"></style>
