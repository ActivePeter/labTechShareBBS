<template>
  <div id="barContainer" class="bottomShadowBox">
    <a
      :href="'/bbs/read/' + id"
      class="articleTitle"
      @click.prevent="toRead(id)"
    >
      {{ title }}
    </a>
    <div>
      <el-tag size="mini" type="info" id="menuBtn" class="hoverShadow"
        >...</el-tag
      >
      <el-tag size="mini" type="info" class="hoverShadow">{{
        createTime | makeTime
      }}</el-tag>
    </div>
  </div>
</template>

<script>
import HorizonSpace from "@/views/components/common/HorizonSpace";
export default {
  name: "PersonalArticleBar",
  components: {
    //Carousel,
    //Selector,
    HorizonSpace,
  },
  watch: {
    //   tableDataForEdit(newV,oldV) {
    //     this.dataBuff=newV;
    //     //console.log(this.dataBuff)
    //   }
  },
  mounted() {
    //   this.dataBuff=this.tableDataForEdit;
    //console.log(this.dataBuff)
  },
  filters: {
    makeTime: function (value) {
      var arr = value.split(":");
      if (arr.length > 1) {
        return arr[0].replace("T", " ") + ":" + arr[1];
      }
      return "";
    },
  },
  methods: {
    toRead(id) {
      console.log("toread/", this.$route.fullPath);
      this.$store.commit("setNeedBack", true);
      this.$router.push({
        path: "/bbs/read/" + id,
        name: "read",
        params: { id: "" + id, back: this.$route.fullPath },
      });
    },
    //   gotoSite(site){
    //     if(site.indexOf("http")==-1){
    //       site="http://"+site
    //     }
    //     window.open(site)
    //   },
    //   onChangeName(val){
    //     this.tableDataForEdit.name=val;
    //   },
    //   onChangeInfo(val){
    //     this.tableDataForEdit.info=val
    //   },
    //   addNewSet(){
    //     this.tableDataForEdit.push({
    //       name:"",
    //       info:""
    //     })
    //     this.$forceUpdate()
    //   },
    //   removeSet(index){
    //     if (index > -1) {
    //         this.tableDataForEdit.splice(index, 1);
    //     }
    //     this.$forceUpdate()
    //   }
  },
  props: {
    title: {
      type: String,
    },
    id: {
      type: Number,
    },
    createTime: {
      type: String,
      default() {
        return "";
      },
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
    return {};
  },
};
</script>

<style scoped>
#barContainer {
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#menuBtn {
  margin-right: 10px;
}
</style>
