<template>
  <div class="selectBar">
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <SelectedTagsBar
        class="SelectedTagsBar"
        :detailCatData="
          $refs.SelectDialogue ? $refs.SelectDialogue.realTagChosen : {}
        "
        :closeable="false"
        ref="SelectedTagsBar"
      />
      <div style="padding: 14px; padding-bottom: 14px" class="">
        <el-button
          size="mini"
          type="primary"
          plain
          @click="showSelectDialogue(true)"
        >
          选择标签来对文章进行筛选
        </el-button>
      </div>
    </el-card>

    <HorizonSpace />
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <div style="">
        <div :key="key.id" v-for="key in articleData">
          <ArticleBar
            :authorInfo="key.author_info"
            :createTime="key.created_time"
            :title="key.title"
            :id="key.id"
          ></ArticleBar>
          <hr color="#EBEEF5" SIZE="1" />
        </div>

        <el-pagination
          class="bottomShadowBox"
          background
          layout="prev, pager, next"
          :total="articleCount"
          :page-size="10"
          :current-page="articleCurPage"
          @current-change="articlePageChange"
        >
        </el-pagination>
      </div>
    </el-card>
    <HorizonSpace />
    <!-- <SelectDialogue ref="SelectDialogue" @updateChosenTags="onUpdateChosenTags"
    @onTagsLoaded="refreshTags()"
    /> -->
    <SelectDialogue2
      v-show="selectDialogueVisible"
      ref="SelectDialogue"
      @cancel="cancelSelect"
      @onTagsLoaded="refreshTags()"
      @updateChosenTags="onUpdateChosenTags"
    />
  </div>
</template>

<script>
import HorizonSpace from "@/views/components/common/HorizonSpace";
import ArticleBar from "./selectParts/ArticleBar";
import SelectDialogue from "@/views/components/dialogues/WriteSelect";
import SelectDialogue2 from "@/views/components/dialogues/SelectDialogue";
import SelectedTagsBar from "@/views/components/bars/SelectedTagsBar";
import { GetArticlesByTags } from "@/network/articles";
export default {
  name: "selectBar",
  components: {
    ArticleBar,
    HorizonSpace,
    SelectDialogue,
    SelectDialogue2,
    SelectedTagsBar,
  },
  mounted: function () {
    // console.log(this.$refs)

    // this.updatePage()
    this.$refs.SelectDialogue.loadCats().then((res) => {
      if (this.$route.query.page) {
        this.articleCurPage = parseInt(this.$route.query.page);
      }
      var tags;
      if (this.$route.query.hasOwnProperty("tags")) {
        tags = this.$route.query.tags.split(",");
        // console.log(this.$route.query);
        // console.log(tags);
        this.$refs.SelectDialogue.chooseTagWithoutCat(tags);
        this.onUpdateChosenTags(tags, false);
      }
      // console.log(this.articleCurPage)
      this.getArticlesByTags();
    });

    // this.$refs.SelectDialogue.initCategories()
  },
  data() {
    return {
      chosenTags: [],
      catDetail: [],
      img: null,
      value: [],
      articleCurPage: 1,
      articleCount: 100000,

      articleData: [],
      selectDialogueVisible: false,
    };
  },
  watch: {
    $refs(to) {
      console.log(to);
    },
    $route(to, from) {
      if (from.query.page != to.query.page) {
        console.log("routePageChange");
        this.articleCurPage = parseInt(to.query.page);
        this.getArticlesByTags();
      }
      if (from.query.tags != to.query.tags) {
        console.log("routeTagChange");
        this.refreshTags();
        this.getArticlesByTags();
      }
    },
    selectDialogueVisible: function (val) {
      if (!!val) {
        this.ModalHelper.afterOpen();
      } else {
        this.ModalHelper.beforeClose();
      }
    },
  },
  methods: {
    cancelSelect() {
      this.selectDialogueVisible = false;
    },
    updatePageInRoute() {
      var query1 = JSON.parse(JSON.stringify(this.$route.query));
      query1.page = this.articleCurPage;
      //console.log(query1)
      this.$router.push({ path: this.$route.path, query: query1 });
    },
    articlePageChange(toPage) {
      console.log("articlePageChange");
      console.log(toPage);
      this.articleCurPage = toPage;
      this.updatePageInRoute();
      // this.getArticlesByTags();
      // this.updatePageInRoute()
    },
    showSelectDialogue(visible) {
      this.selectDialogueVisible = visible;
      // this.$refs.SelectDialogue.dialogVisible=visible;
    },
    getArticlesByTags() {
      GetArticlesByTags(this.chosenTags, this.articleCurPage).then((res) => {
        // console.log(res)
        switch (res.status) {
          case 200:
            this.articleData = res.data.results;
            this.articleCount = res.data.count;

            break;
          case 404:
            this.articleCurPage = 1;
            this.updatePageInRoute();
            this.getArticlesByTags();
            break;
        }
      });
    },
    refreshTags() {
      // var tags;
      // if(this.$route.query.hasOwnProperty('tags')){
      //   tags=this.$route.query.tags.split(',')
      //   // console.log(this.$route.query);
      //   // console.log(tags);
      //   this.$refs.SelectDialogue.chooseTagWithoutCat(tags)
      //   this.onUpdateChosenTags(tags,false);
      // }else{
      //   tags=[]
      //   this.$refs.SelectDialogue.chooseTagWithoutCat(tags)
      //   this.onUpdateChosenTags(tags,false);
      // }
      // this.getArticlesByTags();
    },
    onUpdateChosenTags(tags, needJump) {
      //交给SelectDialogue的时候设置
      console.log("onUpdateChosenTags", tags, needJump);
      var tagChanged;
      if (tags.length != this.chosenTags.length) {
        //长度不等情况
        tagChanged = true;
      } else if (tags.length == 0) {
        //长度相等，都为0
        tagChanged = false;
        console.log("b");
      } else {
        //对数组进行排序，然后在做比较
        tags = this.sortArr(tags);
        var same = true;
        for (var i in tags) {
          if (tags[i] != this.chosenTags[i]) {
            same = false;
            break;
          } else {
            //console.log(tags[i],this.chosenTags[i]);
          }
        }
        tagChanged = !same;
        console.log("c", this.chosenTags);
      }
      console.log("tagChanged", tagChanged);
      if (tagChanged) {
        // if(true){
        this.chosenTags = tags;
        if (needJump != false) {
          if (tags.length > 0) {
            var query1 = JSON.parse(JSON.stringify(this.$route.query));
            query1.tags = tags + "";
            //console.log(query1)
            this.$router.push({ path: this.$route.path, query: query1 });
            //this.$router.push({ path: "/bbs/select/?tags="+tags});
          } else {
            var query1 = JSON.parse(JSON.stringify(this.$route.query));
            delete query1.tags;
            //console.log(query1)
            this.$router.push({ path: this.$route.path, query: query1 });
          }
        }

        // }
        // else{
        //   this.chosenTags=tags;
        //   this.catDetail=this.$refs.SelectDialogue.categories;
        //   //console.log(this.catDetail)
        //   this.catDetail.validCatCount=this.catDetail.length;
        //   for(var cat of this.catDetail){
        //     var cnt=0;
        //     for(var index in cat.tag_chosen){
        //       cnt++;
        //     }
        //     if(cnt==0){
        //       this.catDetail.validCatCount--;
        //     }
        //     cat.cnt=cnt
        //   }
        //   this.$forceUpdate();
        // }
      }

      //this.updateHasOneChanged()
    },
  },
};
</script>
  
<style scoped>
.el-pagination {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 15px;
}
.info_tags {
  margin-right: 10px;
  margin-bottom: 10px;
}
.SelectedTagsBar {
  margin-top: 4px;
  margin-left: 4px;
}
</style>
