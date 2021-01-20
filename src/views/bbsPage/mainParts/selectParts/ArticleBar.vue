<template>
  <div class="ArticleBar">
    <div style="padding: 4px" class="head bottomShadowBox">
      <div style="padding: 10px; padding-right: 10px" class="">
        <img class="headpic" :src="profileUrl" />
      </div>
      <div style="width: 100%; padding-top: 10px">
        <a
          :href="'/bbs/read/' + id"
          class="articleTitle"
          @click.prevent="toRead(id)"
        >
          {{ title }}
        </a>
        <div
          style="
            width: 100%;
            display: flex;
            padding-top: 10px;
            padding-left: 10px;
            padding-right: 10px;
            justify-content: space-between;
          "
          class=""
        >
          <div v-if="authorInfo">
            <el-tag
              size="mini"
              type="info"
              class="hoverShadow pretag"
              style="margin-right: 10px; cursor: pointer"
              @click="gotoUserPage(authorInfo.id)"
            >
              {{ authorInfo.name }}</el-tag
            >
            <el-tag size="mini" type="info" class="hoverShadow pretag">{{
              createTime | makeTime
            }}</el-tag>
          </div>
          <div v-if="!simple">
            <el-tag size="mini" class="hoverShadow left_tags">查看数</el-tag>
            <el-tag size="mini" class="hoverShadow left_tags">回复数</el-tag>
            <el-tag size="mini" class="hoverShadow left_tags">点赞数</el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Util from "@/assets/js/util.js";
import { LoadPersonInfo } from "@/network/users";
export default {
  name: "ArticleBar",
  data() {
    return {
      img: null,
      profileUrl: "",
    };
  },
  mounted() {
    Util.$on("GlobalMsg_profileUpdate", (id) => {
      if (this.authorInfo.id == id) {
        console.log("GlobalMsg_profileUpdate");
        this.getProfile();
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
    // console.log(this.authorInfo);
    this.getProfile();
  },
  props: {
    simple: {
      type: Boolean,
      default() {
        return false;
      },
    },
    authorInfo: {
      type: Object,
      default() {
        return null;
      },
    },
    createTime: {
      type: String,
      default() {
        return "";
      },
    },
    title: {
      type: String,
      default() {
        return "";
      },
    },
    id: {
      type: Number,
      default() {
        return "";
      },
    },
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
    getProfile() {
      var profile = this.Global_profilePool.getProfileLazy(this.authorInfo.id);
      // if (!profile) {
      //   this.profileUrl = this.Global_profilePool.getDefaultProfileUrl();
      // } else {
      this.profileUrl = profile;
      // }
    },
    // getProfile() {
    //   var profile = this.Global_profilePool.getProfile(this.authorInfo.id);
    //   if (!profile) {
    //     LoadPersonInfo(this.authorInfo.id).then((res) => {
    //       if (res.data) {
    //         // // console.log(this.personalData.avatar);
    //         // let blob = new Blob([this.personalData.avatar], {
    //         //   type: "image/jpeg",
    //         // });

    //         if (res.data.avatar) {
    //           // this.profileUrl = "data:image/png;base64," + res.data.avatar;
    //           this.Global_profilePool.setProfile(
    //             this.authorInfo.id,
    //             res.data.avatar
    //           );
    //         } else {
    //           this.Global_profilePool.setProfile(
    //             this.authorInfo.id,
    //             "noProfile"
    //           );
    //         }

    //         // this.profileUrl = "data:image/png;base64," +;
    //         // console.log(this.personalData.avatar);
    //         // console.log(blob);
    //         //console.log(this.personalData.contact)
    //         // this.form.contact = JSON.parse(
    //         //   JSON.stringify(this.personalData.contact || {})
    //         // );
    //       }
    //     });
    //   } else {
    //     // if (profile == "loading") {
    //     //   return;
    //     // } else
    //     if (profile == "noProfile") {
    //       this.profileUrl =
    //         "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
    //       return;
    //     }
    //     this.profileUrl = "data:image/png;base64," + profile;
    //   }
    // },
    toRead(id) {
      console.log("toread/", this.$route.fullPath);
      this.$store.commit("setNeedBack", true);
      this.$router.push({
        path: "/bbs/read/" + id,
        name: "read",
        params: { id: "" + id, back: this.$route.fullPath },
      });
    },
  },
};
</script>

<style scoped>
.headpic {
  border-radius: 100px;
  border-style: solid;
  border-width: 3px;
  border-color: white;
  width: 40px;
  height: 40px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  margin-top: 5px;
}
.head {
  display: flex;
}

.articleTitle {
  margin-top: 10px;
  margin-left: 10px;
  font-size: 18px;
}
.articleTitle a {
  margin: 0px !important;
}
.left_tags {
  margin-left: 10px;
}
.pretag {
  margin-bottom: 10px;
}
</style>
