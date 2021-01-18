<template>
  <div>
    <el-card :body-style="{ padding: '0px' }">
      <div style="padding: 20px">
        <table width="100%">
          <tr>
            <td width="105">{{ type }}</td>
            <td width="max-content">{{ content }}</td>
            <td width="50"></td>
          </tr>

          <div v-if="tableData.length == 0 && !editing" class="secondInfoColor">
            暂无内容
          </div>
          <div
            v-if="editing && tableDataForEdit.length == 0"
            class="secondInfoColor"
          >
            暂无内容
          </div>
          <tr :key="index + 'a'" v-for="(value, index) in tableData">
            <td v-if="!editing">{{ value.name + " " }}</td>
            <td v-if="!editing && content != '网址'">{{ value.info + " " }}</td>
            <td v-if="!editing && content == '网址'">
              <el-link type="primary" @click="gotoSite(value.info)">{{
                value.info
              }}</el-link>
            </td>
          </tr>
          <tr :key="index + 'b'" v-for="(value, index) in dataBuff">
            <td v-if="editing" style="padding-right: 10px">
              <el-input size="small" placeholder="请输入" v-model="value.name">
              </el-input>
            </td>
            <td v-if="editing" style="padding-right: 10px">
              <el-input size="small" placeholder="请输入" v-model="value.info">
              </el-input>
            </td>
            <td v-if="editing">
              <el-link type="danger" @click="removeSet(index)">移除</el-link>
            </td>
          </tr>
        </table>
      </div>
      <div v-if="editing" class="bottombtn" @click="addNewSet()">
        <i class="el-icon-plus"></i> 添加
      </div>
    </el-card>
  </div>
</template>

<script>
import HorizonSpace from "@/views/components/common/HorizonSpace";
export default {
  name: "EditableInfoTable",
  components: {
    //Carousel,
    //Selector,
    HorizonSpace,
  },
  watch: {
    tableDataForEdit(newV, oldV) {
      this.dataBuff = newV;
      //console.log(this.dataBuff)
    },
  },
  mounted() {
    this.dataBuff = this.tableDataForEdit;
    //console.log(this.dataBuff)
  },
  methods: {
    gotoSite(site) {
      if (site.indexOf("http") == -1) {
        site = "http://" + site;
      }
      window.open(site);
    },
    onChangeName(val) {
      this.tableDataForEdit.name = val;
    },
    onChangeInfo(val) {
      this.tableDataForEdit.info = val;
    },
    addNewSet() {
      this.tableDataForEdit.push({
        name: "",
        info: "",
      });
      this.$forceUpdate();
    },
    removeSet(index) {
      if (index > -1) {
        this.tableDataForEdit.splice(index, 1);
      }
      this.$forceUpdate();
    },
  },
  props: {
    editing: {
      //作用是请求的时候提供数据，还有整明为子集评论框
      type: Boolean,
      default() {
        return false;
      },
    },
    type: {
      //作用是请求的时候提供数据，还有整明为子集评论框
      type: String,
      default() {
        return "";
      },
    },
    content: {
      //作用是请求的时候提供数据，还有整明为子集评论框
      type: String,
      default() {
        return "";
      },
    },
    tableData: {
      type: Array,
      default() {
        return null;
      },
    },
    tableDataForEdit: {
      type: Array,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      dataBuff: [],
    };
  },
};
</script>

<style scoped>
table {
  border: 0px solid #f00;
}
.bottombtn {
  padding: 1px;
  border-top: 1px solid #ebeef5;
  text-align: center;
  transition: background-color 0.3s ease 0s;
  -o-transition: background-color 0.35s ease 0s;
  -moz-transition: background-color 0.35s ease 0s;
  -webkit-transition: background-color 0.3s ease 0s;

  cursor: pointer;
}
.bottombtn:hover {
  background-color: #ebeef5;
}
</style>
