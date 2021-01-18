<template>
  <div id="home">
    <div id="content" class="selectable">
      <el-container>
        <el-main>
          <el-card :body-style="{ padding: '0px' }">
            <div class="head">
              <div class="headpic">
                <img :src="profileUrl" class="image" id="profile" />
                <div id="profileCover" @click="Profile_onClick">更改头像</div>
              </div>
              <div class="headinfo">
                <span id="name">{{ personalData.username }}</span>
              </div>
            </div>
            <div>
              <el-container>
                <el-aside width="200px">
                  <el-menu
                    default-active="4"
                    class="el-menu-vertical-demo"
                    @select="handleSelect"
                  >
                    <!-- @open="handleOpen" -->
                    <!-- @close="handleClose" -->
                    <el-menu-item index="4">
                      <template slot="title">
                        <i class="el-icon-s-custom"></i>
                        <span>个人信息</span>
                      </template>
                    </el-menu-item>
                    <el-menu-item index="1">
                      <template slot="title">
                        <i class="el-icon-s-management"></i>
                        <span>文章</span>
                      </template>
                      <!-- <el-menu-item index="1-1">提问</el-menu-item>
                      <el-menu-item index="1-2">学习分享</el-menu-item>
                      <el-menu-item index="1-3">项目记录</el-menu-item>
                      <el-menu-item index="1-4">资源分享</el-menu-item> -->
                    </el-menu-item>
                    <el-submenu v-if="this.$store.getters.userinfo" index="2">
                      <template slot="title">
                        <i class="el-icon-s-comment"></i>
                        <span>消息</span>
                      </template>
                      <el-menu-item index="2-1">回复</el-menu-item>
                      <el-menu-item index="2-2">私信</el-menu-item>
                    </el-submenu>
                  </el-menu>
                </el-aside>
                <el-main>
                  <PersonalInfoPart
                    v-if="selectedIndex == 4"
                    class="mainParts"
                    :personalData.sync="personalData"
                    :currentUserId="currentUserId"
                    @dataChanged="onPersonalDataChange"
                  />
                  <ArticleListPart v-if="selectedIndex == 1" />
                </el-main>
              </el-container>
            </div>
          </el-card>
        </el-main>
      </el-container>
      <ProfileUploadPart
        ref="profileUploadPart"
        :userId="currentUserId"
        @onProfileUpdate="updataProfile"
      />
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
import { LoadPersonInfo } from "@/network/users";

import ProfileUploadPart from "./personalParts/ProfileUploadPart";
import PersonalInfoPart from "./personalParts/PersonalInfoPart";
import ArticleListPart from "./personalParts/ArticleListPart";
export default {
  name: "Home",
  components: {
    //Carousel,
    //Selector,
    HorizonSpace,
    // EditableInfoTable,
    ProfileUploadPart,
    PersonalInfoPart,
    ArticleListPart,
  },
  watch: {
    "$route.params.id"(newval, oldval) {
      this.currentUserId = parseInt(newval);
      this.loadPersonInfo();
    },
  },
  mounted() {
    // if (this.$store.getters.userinfo) {
    this.currentUserId = parseInt(this.$route.params.id);
    // }
    this.loadPersonInfo();
  },

  methods: {
    signStore() {
      console.log("signStore");
      this.signStored = this.sign;
    },
    signSet() {
      console.log("signSet");
    },
    handleSelect(id) {
      console.log(id);
      this.selectedIndex = id;
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
          // // console.log(this.personalData.avatar);
          // let blob = new Blob([this.personalData.avatar], {
          //   type: "image/jpeg",
          // });
          this.updataProfile(this.personalData.avatar);
          // this.profileUrl = "data:image/png;base64," +;
          // console.log(this.personalData.avatar);
          // console.log(blob);
          //console.log(this.personalData.contact)
          // this.form.contact = JSON.parse(
          //   JSON.stringify(this.personalData.contact || {})
          // );
        }
      });
    },
    updataProfile(profile) {
      this.Global_profilePool.setProfile(this.currentUserId, profile);
      // this.profileUrl = "data:image/png;base64," + profile;
      if (profile) {
        this.profileUrl = "data:image/png;base64," + profile;
        this.Global_profilePool.setProfile(this.currentUserId, profile);
      } else {
        this.profileUrl =
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
      }
    },
    onPersonalDataChange(data) {
      this.personalData = data;
    },
    // startEditInfo() {
    //   this.form = JSON.parse(JSON.stringify(this.personalData));
    //   this.editing = true;
    // },
    // cancelEditInfo() {
    //   this.editing = false;
    // },

    Profile_onClick() {
      this.$refs.profileUploadPart.dialogVisible = true;
    },
  },
  data() {
    return {
      profileUrl: "",
      selectedIndex: "4",
      currentUserId: -1,

      sign: "",
      signStored: "",
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
    };
  },
};
</script>

<style scoped>
#profileCover {
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  /* background-color: black; */
  opacity: 0;
  width: 100px;
  height: 100px;
  top: 0;
  left: 0;
  margin: 30px 49px 30px 50px;
  border-radius: 100px;
  /* text-align: center;
  vertical-align: middle; */
  color: #f0f0f0;
  transition: background-color 0.3s ease 0s;
  -o-transition: background-color 0.35s ease 0s;
  -moz-transition: background-color 0.35s ease 0s;
  -webkit-transition: background-color 0.3s ease 0s;
}
#profileCover:hover {
  cursor: pointer;
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.6);
}
.head {
  display: flex;
  border-bottom: 1px solid #dcdfe6;
}
.headpic {
  position: relative;
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
  min-width: 100px;
  min-height: 100px;
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
</style>
