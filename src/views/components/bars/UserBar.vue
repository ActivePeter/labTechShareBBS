<template>
  <div class="userBar">
    <el-card shadow="hover">
      <div v-if="!$store.getters.isLogin">
        <div class="middle">一起在CUIT搞技术吧</div>
        <HorizonSpace />
        <div class="middle">
          <el-button class="btn" round @click="ShowLogin()">登入</el-button>
        </div>
        <HorizonSpace />
        <div class="middle">
          <el-button class="btn" round @click="ShowRegi()">注册</el-button>
        </div>
      </div>
      <div v-else>
        <div class="head bottomShadowBox">
          <img :src="profileUrl" class="image" />
          <p class="username">{{ $store.getters.userinfo.username }}</p>
        </div>

        <hr color="#EBEEF5" SIZE="1" style="margin: 0 -20px" />
        <HorizonSpace />
        <div class="btns">
          <el-tooltip
            class="item"
            effect="dark"
            content="发布自己的新分享"
            placement="top"
            v-if="$route.path != '/bbs/write'"
          >
            <el-button
              icon="el-icon-edit"
              circle
              @click="toWrite()"
            ></el-button>
          </el-tooltip>
          <el-button round style="width: 100%" @click="toPerson()"
            >个人页</el-button
          >
        </div>
      </div>
    </el-card>
    <LoginDialogue v-if="!$store.getters.isLogin" ref="LoginDialogue" />
  </div>
</template>

<script>
import HorizonSpace from "@/views/components/common/HorizonSpace";
import LoginDialogue from "@/views/components/dialogues/Login";
import { LoadPersonInfo } from "@/network/users";
import Util from "@/assets/js/util.js";

export default {
  name: "UserBar",
  components: {
    HorizonSpace,
    LoginDialogue,
  },
  mounted() {
    Util.$on("GlobalMsg_onLogin", (_) => {
      console.log("GlobalMsg_onLogin");
      this.getProfile(this.$store.getters.userinfo.id);
    });
    Util.$on("GlobalMsg_profileUpdate", (id) => {
      if (
        this.$store.getters.isLogin &&
        this.$store.getters.userinfo.id == id
      ) {
        console.log("GlobalMsg_profileUpdate");
        this.getProfile(id);
        // var profile = this.Global_profilePool.getProfile(id);
        // if (profile) {
        //   // if (profile == "loading") {
        //   //   return;
        //   // } else
        //   if (profile == "noProfile") {
        //     this.profileUrl =
        //       "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
        //     return;
        //   }
        //   this.profileUrl = "data:image/png;base64," + profile;
        // }
      }
      // this.loadProfile();
    });
    // console.log(this.$store.getters.userinfo);
    if (this.$store.getters.isLogin) {
      this.getProfile(this.$store.getters.userinfo.id);
    }
  },
  methods: {
    getProfile(id) {
      var profile = this.Global_profilePool.getProfileLazy(id);
      // if (!profile) {
      //   this.profileUrl = this.Global_profilePool.getDefaultProfileUrl();
      // } else {
      this.profileUrl = profile;
      // }
    },
    // loadProfile() {
    //   if (this.$store.getters.isLogin) {
    //     LoadPersonInfo(this.$store.getters.userinfo.id).then((res) => {
    //       if (res.data) {
    //         // // console.log(this.personalData.avatar);
    //         // let blob = new Blob([this.personalData.avatar], {
    //         //   type: "image/jpeg",
    //         // });
    //         if (res.data.avatar) {
    //           this.profileUrl = "data:image/png;base64," + res.data.avatar;
    //         } else {
    //           this.profileUrl =
    //             "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
    //         }
    //         // this.profileUrl = "data:image/png;base64," + res.data.avatar;
    //         // this.profileUrl = "data:image/png;base64," +;
    //         // console.log(this.personalData.avatar);
    //         // console.log(blob);
    //         //console.log(this.personalData.contact)
    //         // this.form.contact = JSON.parse(
    //         //   JSON.stringify(this.personalData.contact || {})
    //         // );
    //       }
    //     });
    //   }
    // },
    ShowLogin() {
      this.$refs.LoginDialogue.loginState = true;
      this.$refs.LoginDialogue.dialogVisible = true;
    },
    ShowRegi() {
      this.$refs.LoginDialogue.loginState = false;
      this.$refs.LoginDialogue.dialogVisible = true;
    },
    toPerson() {
      this.$router.push({ path: "/person/" + this.$store.getters.userinfo.id });
    },
    toWrite() {
      this.$router.push({ path: "/bbs/write" });
    },
  },
  data() {
    return {
      dialogVisible: false,
      profileUrl: "",
    };
  },
};
</script>

<style scoped>
.btns {
  display: flex;
}
.head {
  margin: -20px -20px 0 -20px;
  padding: 20px;
  text-align: center;
  display: flex;
}
.head .username {
  margin-left: 20px;
  margin-top: 15px;
}
.head img {
  border-radius: 100px;
  border-style: solid;
  border-width: 3px;
  border-color: white;
  width: 50px;
  height: 50px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.5);
}
.middle {
  margin: 0 auto !important;
  text-align: center;
}
.btn {
  width: 80%;
}
</style>
