<template>
  <div>
    <div class="info_body">
      <el-form v-if="editing" ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="入学年份">
          <!-- <el-input v-model="form.enrollment_time" style="width:200px;"></el-input>
                         -->
          <el-select v-model="form.enrollment_time" placeholder="请选择">
            <el-option
              v-for="item in enrollTimeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="QQ">
                        <el-input v-model="form.name" style="width:200px;"></el-input>
                      </el-form-item> -->
        <el-form-item label="专业">
          <el-input v-model="form.major" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="form.student_id" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="教务处密码">
          <el-input v-model="form.student_pwd" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="同意打卡">
          <el-switch
            v-model="form.sure_to_clock"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="联系方式">
          <EditableInfoTable
            type="联系类型"
            content="号码"
            :editing="editing"
            :tableData="personalData.contact.contact"
            :tableDataForEdit.sync="form.contact.contact"
          />
        </el-form-item>
        <el-form-item label="网站">
          <EditableInfoTable
            type="网站名"
            content="网址"
            :editing="editing"
            :tableData="personalData.contact.website"
            :tableDataForEdit.sync="form.contact.website"
          />
        </el-form-item>
        <el-form-item label="个人介绍">
          <el-input
            type="textarea"
            autosize
            v-model="form.introduction"
          ></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio label="male">男</el-radio>
            <el-radio label="female">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即提交</el-button>
          <el-button @click="cancelEditInfo">取消</el-button>
        </el-form-item>
      </el-form>
      <el-form v-if="!editing" ref="form" :model="form" label-width="100px">
        <el-form-item label="用户名">
          {{ personalData.username }}
        </el-form-item>
        <el-form-item label="入学年份">
          {{
            personalData.enrollment_time ? personalData.enrollment_time : "未知"
          }}
        </el-form-item>

        <el-form-item label="专业">
          {{ personalData.major == "" ? "未知" : personalData.major }}
        </el-form-item>
        <el-form-item label="学号">
          {{ personalData.student_id ? personalData.student_id : "未知" }}
        </el-form-item>

        <el-form-item label="联系方式">
          <EditableInfoTable
            type="联系类型"
            content="号码"
            :editing="editing"
            :tableData="personalData.contact.contact"
          />
        </el-form-item>
        <el-form-item label="网站">
          <EditableInfoTable
            type="网站名"
            content="网址"
            :editing="editing"
            :tableData="personalData.contact.website"
          />
        </el-form-item>
        <el-form-item label="个人介绍">
          <el-card>
            <div style="white-space: pre">
              {{
                personalData.introduction
                  ? personalData.introduction
                  : "还没有介绍哦"
              }}
            </div>
          </el-card>
        </el-form-item>
        <el-form-item label="性别">
          {{ personalData.gender | getGender }}
        </el-form-item>
      </el-form>
      <el-tooltip
        v-if="!editing && isSelf"
        class="item"
        effect="dark"
        content="修改个人信息"
        placement="left"
      >
        <el-button
          @click="startEditInfo()"
          class="edit_btn"
          type="primary"
          icon="el-icon-edit"
          circle
        ></el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import HorizonSpace from "@/views/components/common/HorizonSpace";
import EditableInfoTable from "./EditableInfoTable";
import { UpdatePersonInfo } from "@/network/users";
export default {
  name: "PersonalInfoPart",
  components: {
    //Carousel,
    //Selector,
    HorizonSpace,
    EditableInfoTable,
  },
  watch: {
    //   tableDataForEdit(newV,oldV) {
    //     this.dataBuff=newV;
    //     //console.log(this.dataBuff)
    //   }
  },
  filters: {
    getGender: function (value) {
      if (value == "male") {
        return "男";
      } else if (value == "female") {
        return "女";
      } else {
        return "未知";
      }
    },
  },
  mounted() {
    // console.log(this.form);
    for (var i = 2000; i <= 2050; i++) {
      this.enrollTimeOptions.push({
        value: i,
        label: i + "",
      });
    }
    //   this.dataBuff=this.tableDataForEdit;
    //console.log(this.dataBuff)
  },
  methods: {
    startEditInfo() {
      this.form = JSON.parse(JSON.stringify(this.personalData));
      this.editing = true;
    },
    cancelEditInfo() {
      this.editing = false;
    },
    beforeSubmitHandleData() {
      var contactArr = this.form.contact.contact;
      this.form.contact.contact = [];
      for (var j = 0; j < contactArr.length; j++) {
        if (contactArr[j].name != "" || contactArr[j].info != "") {
          this.form.contact.contact.push(contactArr[j]);
        }
      }
      var websiteArr = this.form.contact.website;
      this.form.contact.website = [];
      for (var j = 0; j < websiteArr.length; j++) {
        if (websiteArr[j].name != "" || websiteArr[j].info != "") {
          this.form.contact.website.push(websiteArr[j]);
        }
      }
      for (let index in this.form) {
        var cur = this.form[index];

        if (cur == null) {
          delete this.form[index];
        }
      }

      //console.log(this.form)
      // console.log(contactArr)
      // console.log(websiteArr)
    },

    onSubmit() {
      //console.log(this.form)
      this.beforeSubmitHandleData();
      // this.$store.dispatch("user/updateUserinfo", this.form).then(res => {
      //   if (res) {
      //     this.personalData = res;
      //     this.editing = false;
      //   } else {
      //     this.$message.error(res.data.username[0]);
      //   }
      // });
      UpdatePersonInfo(this.form).then((res) => {
        //$store.state.userinfo.id=res
        //$store.state.userinfo.name=
        if (res.status == 200) {
          this.$store.commit("user/SET_USERINFO", res.data.results);
          //console.log("res",res)
          // this.personalData = res.data.results;
          this.$emit("dataChanged", res.data.results);
          this.editing = false;
        } else if (res.status == 400) {
          this.$message.error(res.data.username[0]);
        }
      });
    },
  },
  props: {
    personalData: {
      type: Object,
    },
    currentUserId: {
      type: Number,
    },
    isSelf: {
      type: Boolean,
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
      editing: false,
      form: null,
      enrollTimeOptions: [],
    };
  },
};
</script>

<style scoped>
.edit_btn {
  height: max-content;
}
.info_body {
  display: flex;
  display: -webkit-flex;
  align-items: flex-start;
}
</style>
