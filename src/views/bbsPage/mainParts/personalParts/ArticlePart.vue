<template>
  <div>hello world</div>
</template>

<script>
import HorizonSpace from "@/views/components/common/HorizonSpace";
export default {
  name: "ArticlePart",
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
  methods: {
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
      dataBuff: [],
    };
  },
};
</script>

<style scoped>
</style>
