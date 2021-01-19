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
      <el-dropdown @command="handleMenuCommand">
        <el-tag size="mini" type="info" id="menuBtn" class="hoverShadow"
          >...</el-tag
        >
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="edit" icon="el-icon-edit">
            编辑
          </el-dropdown-item>
          <el-dropdown-item command="delete" icon="el-icon-delete-solid">
            删除
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-tag size="mini" type="info" class="hoverShadow">{{
        createTime | makeTime
      }}</el-tag>
    </div>
  </div>
</template>

<script>
import HorizonSpace from "@/views/components/common/HorizonSpace";
import { DeletArticle } from "@/network/articles";
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
    handleMenuCommand(cmd) {
      if (cmd == "edit") {
        this.toEdit();
      } else if (cmd == "delete") {
        this.deleteArticle();
      }
    },
    deleteArticle() {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(() => {
          if (!this.deletingArticle) {
            this.deletingArticle = true;
            this.$message("正在删除");
            DeletArticle(this.id).then((res) => {
              switch (res.status) {
                case 200:
                  // this.$router.push({ path: "/bbs"});
                  this.$message({
                    message: "删除成功",
                    type: "success",
                  });
                  this.$emit("removeArticle", this.id);
                  // this.Util.$emit("removeArticleList");
                  break;
              }
              this.deletingArticle = false;
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    toEdit() {
      this.$router.push({
        path: "/bbs/write/" + this.id,
        name: "write",
        params: { id: "" + this.id, back: true },
      });
    },
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
  cursor: pointer;
  margin-right: 10px;
}
</style>
