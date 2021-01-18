<template>
  <div>
    <el-dialog
      width="400px"
      :title="dialogueTitle"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <el-upload
        v-show="step == 0"
        class="upload-demo"
        drag
        action=""
        :show-file-list="false"
        :auto-upload="false"
        :on-change="changeUpload"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <div class="cropper" style="text-align: center" v-show="step == 1">
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
      <!-- <div class="cropper-content">
        <div class="cropper" style="text-align: center">
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
      </div> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-show="step == 1" @click="step = 0">上一步</el-button>
        <el-button
          v-show="step == 1"
          type="primary"
          @click="finish"
          :loading="loading"
          >确认</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import HorizonSpace from "@/views/components/common/HorizonSpace";
import { Profile_upload } from "@/network/users";
export default {
  name: "ProfileUploadPart",
  components: {
    //Carousel,
    //Selector,
    HorizonSpace,
  },
  watch: {
    step(newV, oldV) {
      switch (newV) {
        case 0:
          this.dialogueTitle = "选取作为头像的图片";
          break;
        case 1:
          this.dialogueTitle = "对图片进行裁剪";
          break;
      }
    },
    dialogVisible(newV, oldV) {
      if (newV) {
        this.step = 0;
      }
    },
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
    // 上传按钮   限制图片大小
    changeUpload(file, fileList) {
      // const isLt5M = file.size / 1024 / 1024 < 2;
      // if (!isLt5M) {
      //   this.$message.error("上传文件大小不能超过 2MB!");
      //   return false;
      // }
      this.fileinfo = file;
      console.log(file);
      this.step = 1;
      this.option.img = file.url;

      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      var that = this;
      reader.onload = function (event) {
        let img_base64 = this.result;
        // console.log(img_base64);
        // console.log(that.option.img);
        // self.ruleForm.changelogoimg = img_base64;
        that.option.img = img_base64;
      };

      //   this.$nextTick(() => {
      //     this.$forceUpdate();
      //     // this.dialogVisible = true;
      //   });
    },
    // 点击裁剪，这一步是可以拿到处理后的地址
    finish() {
      this.$refs.cropper.getCropBlob((data) => {
        // this.$refs.cropper.getCropData((data) => {
        var fileName = "profile_" + this.fileinfo.uid;
        this.loading = true;
        //上传阿里云服务器
        // client()
        //   .put(fileName, data)
        //   .then((result) => {

        //     this.dialogVisible = false;
        //     // this.picsList.push(result.url);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     this.loading = false;
        //   });

        Profile_upload(this.userId, fileName, data).then((res) => {
          console.log(res);

          if ((res.status = 200)) {
            this.$emit("onProfileUpdate", res.profile);
            this.dialogVisible = false;
          }
          this.loading = false;
        });
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
      dataBuff: [],
      dialogVisible: false,
      loading: false,
      step: 0, //表示步骤，
      dialogueTitle: "选取作为头像的图片",
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: "jpeg", // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [5, 5], // 截图框的宽高比例
        full: false, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      // 0 选择图片
      // 1 裁切图片
    };
  },
};
</script>

<style scoped>
/* .cropper-content { */
.cropper {
  width: auto;
  height: 300px;
}
/* } */
</style>
