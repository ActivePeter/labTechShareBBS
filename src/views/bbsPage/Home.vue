<template>
  <div id="home">
    <div id="content">
      <el-container>
        <el-main>
          <el-collapse-transition>
            <router-view></router-view>
          </el-collapse-transition>
        </el-main>
        <el-aside width="250px">
          <HorizonSpace />
          <userBar />
          <HorizonSpace />
          <!-- <rankBar />
          <HorizonSpace /> -->
          <!-- <RecordInfoBar />
          <HorizonSpace /> -->
        </el-aside>
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
import userBar from "@/views/components/bars/UserBar";
import rankBar from "@/views/components/bars/RankBar";
import RecordInfoBar from "@/views/components/bars/RecordInfoBar";
import HorizonSpace from "@/views/components/common/HorizonSpace";

export default {
  name: "Home",
  components: {
    //Carousel,
    //Selector,
    userBar,
    HorizonSpace,
    RecordInfoBar,
    rankBar,
  },
};
</script>

<style scoped>
.v-enter {
  opacity: 0;
}
.v-enter-active {
  transition: 0.25s;
}
.v-enter-to {
  opacity: 1;
}
.v-leave {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}
.v-leave-active {
  transition: 0.25s;
}
#content {
  min-width: 820px;
  max-width: 1100px;
  margin: 0 auto;

  height: 100%;
}
.el-aside {
  padding-right: 10px;
  padding-left: 10px;
}
.el-main {
  padding-right: 10px;
}
</style>
