<template>
  <div>
    <div class="head">
      <span class="title">选影视</span>
      <br />
      <br />

      <div style="margin-top:20px">
        <el-radio-group
          v-model="subtypeRadio"
          size="mini"
          @change="changeChoice"
        >
          <el-radio-button label="all">全部形式</el-radio-button>
          <el-radio-button label="movie">影视</el-radio-button>
          <el-radio-button label="tv">电视剧</el-radio-button>
        </el-radio-group>
      </div>

      <div style="margin-top:20px" class="aaaaa">
        <el-radio-group v-model="tagRadio" size="mini" @change="changeChoice">
          <el-radio-button label="all">全部类型</el-radio-button>
          <el-radio-button
            v-for="tag in tags"
            :label="tag.genre_name"
          ></el-radio-button>
        </el-radio-group>
      </div>

      <div style="margin-top:20px" class="aaaaa">
        <el-radio-group
          v-model="countryRadio"
          size="mini"
          @change="changeChoice"
        >
          <el-radio-button label="all">全部地区</el-radio-button>
          <el-radio-button
            v-for="country in countries"
            :label="country.country_name"
          ></el-radio-button>
        </el-radio-group>
      </div>

      <div style="margin-top:20px" class="aaaaa">
        <el-radio-group v-model="yearRadio" size="mini" @change="changeChoice">
          <el-radio-button label="all">全部时间</el-radio-button>
          <el-radio-button
            v-for="year in years"
            :label="year"
          ></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <movieList
      v-bind:movies="movieItems"
      :nextPage="nextPage"
      :load="loading"
    ></movieList>
  </div>
</template>

<script>
import movieList from "@/components/moviecard.vue";

export default {
  components: {
    movieList
  },
  data() {
    return {
      loading: true,
      movieItems: [],
      nextPage: "",
      subtypeRadio: "all",
      yearRadio: "all",
      tagRadio: "all",
      countryRadio: "all",
      tags: [],
      countries: [],
      years: [],
      params: {
        subtype: "",
        type_name: "",
        country: "",
        year: ""
      }
    };
  },
  methods: {
    changeChoice() {
      this.params.subtype = this.getValue(this.subtypeRadio);
      this.params.genre_name = this.getValue(this.tagRadio);
      this.params.country_name = this.getValue(this.countryRadio);
      this.params.year = this.getValue(this.yearRadio);
      console.log(this.params)
      this.fetchMovies();
    },
    getValue(val) {
      return val === "all" ? "" : val;
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
    fetchCountries() {
      this.$http
        .get("/country")
        .then(response => {
          this.countries = response.data.data;
        })
        .catch(error => {
          console.log("fetch country error.");
        });
    },
    fetchYears() {
      this.$http
        .get("/year")
        .then(response => {
          this.years = response.data.data;
        })
        .catch(error => {
          console.log("fetch year error.");
        });
    },
    fetchMovies() {
      this.$http
        .get("/movie/choice", {
          params: this.params
        })
        .then(response => {
          this.movieItems = response.data.data.items;
          this.nextPage = response.data.data.next;
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log("fetch movies error.");
        });
    }
  },
  mounted() {
    this.fetchTags();
    this.fetchCountries();
    this.fetchYears();
    this.fetchMovies();
  }
};
</script>

<style lang="less">
.aaaaa {
  display: flex;
  flex-wrap: nowrap;
}
</style>
