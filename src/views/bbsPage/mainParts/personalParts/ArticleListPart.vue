<template>
  <!-- <el-card :body-style="{ padding: '0px' }" shadow="hover"> -->
  <div id="OutContainer">
    <div v-for="(item, i) in articleArray">
      <PersonalArticleBar
        :title="item.title"
        :id="item.id"
        :createTime="item.created_time"
      />
      <hr color="#EBEEF5" SIZE="1" />
    </div>
    <!-- <div :key="key.id" v-for="key in articleData">
          <!-- <ArticleBar
            :authorInfo="key.author_info"
            :createTime="key.created_time"
            :title="key.title"
            :id="key.id"
          ></ArticleBar> -->
    <!-- <hr color="#EBEEF5" SIZE="1" /> -->
    <!-- </div>  -->

    <el-pagination
      class="bottomShadowBox"
      id="pageSelectorBar"
      background
      layout="prev, pager, next"
      :total="articleCount"
      :page-size="10"
      :current-page="page"
      @current-change="articlePageChange"
    >
    </el-pagination>
  </div>
  <!-- </el-card> -->
</template>

<script>
import HorizonSpace from "@/views/components/common/HorizonSpace";
import { PersonalArticle_get } from "@/network/users";
import PersonalArticleBar from "./PersonalArticleBar";
export default {
  name: "ArticleListPart",
  components: {
    //Carousel,
    //Selector,
    HorizonSpace,
    PersonalArticleBar,
  },
  watch: {
    "$route.query"(newval, oldval) {
      // this.currentUserId = parseInt(newval);
      // this.loadPersonInfo();
      if (newval.page) {
        this.page = parseInt(newval.page);
      }
    },
    page(newV, oldV) {
      this.personalArticle_get(newV);
      this.changePageInRoute(newV);
    },
    //   tableDataForEdit(newV,oldV) {
    //     this.dataBuff=newV;
    //     //console.log(this.dataBuff)
    //   }
  },
  mounted() {
    this.page = parseInt(this.$route.query.page);
    this.personalArticle_get(this.page);
    //   this.dataBuff=this.tableDataForEdit;
    //console.log(this.dataBuff)
  },
  methods: {
    changePageInRoute(page) {
      var query1 = JSON.parse(JSON.stringify(this.$route.query));
      query1.page = page;
      //console.log(query1)
      this.$router
        .push({ path: this.$route.path, query: query1 })
        .catch((err) => err);
    },
    personalArticle_get(page) {
      PersonalArticle_get(this.userId, page).then((res) => {
        console.log(res);
        switch (res.status) {
          case 200:
            this.articleCount = res.data.count;
            this.articleArray = res.data.results;
            break;
        }
      });
    },
    articlePageChange(toPage) {
      console.log("articlePageChange");
      console.log(toPage);
      this.page = toPage;
      // this.updatePageInRoute();
      // this.getArticlesByTags();
      // this.updatePageInRoute()
    },
  },
  props: {
    userId: {
      type: Number,
    },
    // editing: {
    //   //作用是请求的时候提供数据，还有整明为子集评论框
    //   type: Boolean,
    //   default() {
    //     return false;
    //   },
    // },
    // type: {
    //   //作用是请求的时候提供数据，还有整明为子集评论框
    //   type: String,
    //   default() {
    //     return "";
    //   },
    // },
    // content: {
    //   //作用是请求的时候提供数据，还有整明为子集评论框
    //   type: String,
    //   default() {
    //     return "";
    //   },
    // },
    // tableData: {
    //   type: Array,
    //   default() {
    //     return null;
    //   },
    // },
    // tableDataForEdit: {
    //   type: Array,
    //   default() {
    //     return null;
    //   },
    // },
  },
  data() {
    return {
      articleArray: [],
      page: 1,
      articleCount: 10000,
    };
  },
};
</script>

<style scoped>
#OutContainer {
  margin: -20px;
}
#pageSelectorBar {
  padding: 20px;
}
</style>
