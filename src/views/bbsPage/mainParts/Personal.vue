<template>
  <div id="home">
    <div id="content" class="selectable">
      <el-container>
        <el-main>
          <el-card :body-style="{ padding: '0px' }">
            <div class="head">
              <div class="headpic">
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="image"
                />
              </div>
              <div class="headinfo">
                <span id="name">{{ personalData.username }}</span>
              </div>
            </div>
            <div>
              <el-container>
                <el-aside width="200px">
                  <el-menu default-active="4" class="el-menu-vertical-demo">
                    <!-- @open="handleOpen" -->
                    <!-- @close="handleClose" -->
                    <el-menu-item index="4">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>个人信息</span>
                      </template>
                    </el-menu-item>
                    <el-submenu index="1">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>文章</span>
                      </template>
                      <el-menu-item index="1-1">提问</el-menu-item>
                      <el-menu-item index="1-2">学习分享</el-menu-item>
                      <el-menu-item index="1-3">项目记录</el-menu-item>
                      <el-menu-item index="1-4">资源分享</el-menu-item>
                    </el-submenu>
                    <el-submenu v-if="this.$store.getters.userinfo" index="2">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>消息</span>
                      </template>
                      <el-menu-item index="1-1">回复</el-menu-item>
                      <el-menu-item index="1-2">私信</el-menu-item>
                    </el-submenu>
                  </el-menu>
                </el-aside>
                <el-main>
                  <div class="info_body">
                    <el-form
                      v-if="editing"
                      ref="form"
                      :model="form"
                      label-width="80px"
                    >
                      <el-form-item label="用户名">
                        <el-input
                          v-model="form.username"
                          style="width: 200px"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="入学年份">
                        <!-- <el-input v-model="form.enrollment_time" style="width:200px;"></el-input>
                         -->
                        <el-select
                          v-model="form.enrollment_time"
                          placeholder="请选择"
                        >
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
                        <el-input
                          v-model="form.major"
                          style="width: 200px"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="学号">
                        <el-input
                          v-model="form.student_id"
                          style="width: 200px"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="教务处密码">
                        <el-input
                          v-model="form.student_pwd"
                          style="width: 200px"
                        ></el-input>
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
                        <el-button type="primary" @click="onSubmit"
                          >立即提交</el-button
                        >
                        <el-button @click="cancelEditInfo">取消</el-button>
                      </el-form-item>
                    </el-form>
                    <el-form
                      v-if="!editing"
                      ref="form"
                      :model="form"
                      label-width="100px"
                    >
                      <el-form-item label="用户名">
                        {{ personalData.username }}
                      </el-form-item>
                      <el-form-item label="入学年份">
                        {{
                          personalData.enrollment_time
                            ? personalData.enrollment_time
                            : "未知"
                        }}
                      </el-form-item>

                      <el-form-item label="专业">
                        {{
                          personalData.major == "" ? "未知" : personalData.major
                        }}
                      </el-form-item>
                      <el-form-item label="学号">
                        {{
                          personalData.student_id
                            ? personalData.student_id
                            : "未知"
                        }}
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
                      v-if="!editing && currentUserId == this.$route.params.id"
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
                </el-main>
              </el-container>
            </div>
          </el-card>
        </el-main>
      </el-container>

      <!-- <div id="right_bar">

        <userBar/>
        <HorizonSpace/>
        <rankBar/>
      </div>
      <div id="Main">
        <router-view></router-view>

      </div> -->
    </div>
  </div>
</template>

<script>
import HorizonSpace from "@/views/components/common/HorizonSpace";
import { LoadPersonInfo, UpdatePersonInfo } from "@/network/users";
import EditableInfoTable from "./personalParts/EditableInfoTable";
export default {
  name: "Home",
  components: {
    //Carousel,
    //Selector,
    HorizonSpace,
    EditableInfoTable,
  },
  watch: {
    "$route.params.id"(newval, oldval) {
      this.loadPersonInfo();
    },
  },
  mounted() {
    for (var i = 2000; i <= 2050; i++) {
      this.enrollTimeOptions.push({
        value: i,
        label: i + "",
      });
    }
    if (this.$store.getters.userinfo) {
      this.currentUserId = this.$store.getters.userinfo.id;
    }
    this.loadPersonInfo();
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
  methods: {
    signStore() {
      console.log("signStore");
      this.signStored = this.sign;
    },
    signSet() {
      console.log("signSet");
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
          this.personalData = res.data.results;
          this.editing = false;
        } else if (res.status == 400) {
          this.$message.error(res.data.username[0]);
        }
      });
    },
    loadPersonInfo() {
      LoadPersonInfo(this.$route.params.id).then((res) => {
        this.personalData = res.data;
        if (this.personalData) {
          if (!this.personalData.contact) {
            this.personalData.contact = {
              contact: [],
              website: [],
            };
          }
          //console.log(this.personalData.contact)
          this.form.contact = JSON.parse(
            JSON.stringify(this.personalData.contact || {})
          );
        }
      });
    },
    startEditInfo() {
      this.form = JSON.parse(JSON.stringify(this.personalData));
      this.editing = true;
    },
    cancelEditInfo() {
      this.editing = false;
    },
  },
  data() {
    return {
      currentUserId: -1,
      editing: false,
      sign: "",
      signStored: "",
      form: {
        username: "",
        gender: "",
        enrollment_time: null,
        student_id: "",
        student_pwd: "",
        sure_to_clock: false,
        contact: {
          contact: [],
          website: [],
        },
        major: "",
        introduction: "",
      },
      personalData: {
        age: null,
        avatar: null,
        email: null,
        enrollment_time: null,
        gender: null,
        id: null,
        introduction: null,
        is_staff: null,
        is_superuser: null,
        last_login: null,
        student_pwd: "",
        sure_to_clock: false,
        contact: {
          contact: [],
          website: [],
        },
        // student_id: "",
        major: "",
        sign: "",
        student_id: null,
        username: null,
      },
      enrollTimeOptions: [],
    };
  },
};
</script>

<style scoped>
.head {
  display: flex;
  border-bottom: 1px solid #dcdfe6;
}
.headpic {
  border-right: 1px solid #e4e7ed;
  width: 200px;
}
.head .headpic img {
  margin: 30px 49px 30px 50px;
  border-radius: 100px;
  border-style: solid;
  border-width: 3px;
  border-color: white;
  width: 100px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.5);
}
.head .headinfo {
  padding-top: 65px;
  margin-left: 30px;
  width: 100%;
}
.head .headinfo #name {
  font-size: 27px;
}
#content {
  min-width: 800px;
  max-width: 1100px;
  margin: 0 auto;

  height: 100%;
}
#right_bar {
  width: 270px;
  float: right;
  margin-right: 20px;
}
#Main {
  margin: 0 310px 0 20px;
}
#sidebar {
  margin-right: 20px;
}
.el-menu {
  min-height: 400px;
  height: 100%;
}
.sign {
  padding: 10px;
  border: none;
  width: 90%;
  margin-left: -5px;
  margin-top: 10px;
  color: #909399;
}
.el-form {
  width: 100%;
}
.edit_btn {
  height: max-content;
}
.info_body {
  display: flex;
  display: -webkit-flex;
  align-items: flex-start;
}
</style>
