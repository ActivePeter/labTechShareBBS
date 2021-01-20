<template>
  <div class="userBar">
    <el-card shadow="hover">
      <div class="middle">hello world</div>
      <HorizonSpace />
    </el-card>
  </div>
</template>

<script>
import HorizonSpace from "@/views/components/common/HorizonSpace";
export default {
  name: "RecordInfoBar",
  components: {
    HorizonSpace,
  },
  data() {
    return {
      img: null,
    };
  },
};
</script>

<style scoped>
.middle {
  margin: 0 auto !important;
  text-align: center;
}
.btn {
  width: 80%;
}
</style>
