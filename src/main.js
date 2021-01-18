import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueCookies from "vue-cookies";
import "./permission";
import hljs from "highlight.js";
import "highlight.js/styles/googlecode.css"; // 样式文件
import VueCropper from 'vue-cropper';

import Global_profilePool from '@/global/Global_profilePool.vue'
import Util from "@/assets/js/util.js";

Vue.directive("highlight", function (el) {
  let blocks = el.querySelectorAll("pre code");
  blocks.forEach(block => {
    hljs.highlightBlock(block);
  });
});
Vue.use(VueCropper)
Vue.use(ElementUI);
Vue.use(VueCookies);

Vue.config.productionTip = false;

Vue.prototype.Global_profilePool = Global_profilePool;
Vue.prototype.Util = Util;

Vue.prototype.hasLoginData = function () {
  //changeData是函数名
  return store.getters.userinfo;
};

Vue.prototype.log = function (val) {
  console.log(val);
};

Vue.prototype.sortArr = function (arr) {
  //创建每次循环存储最大值得变量
  var max; //遍历数组，默认arr中的某一个元素为最大值，进行逐一比较
  for (var i = 0; i < arr.length; i++) {
    //外层循环一次，就拿arr[i] 和 内层循环arr.legend次的 arr[j] 做对比
    for (var j = i; j < arr.length; j++) {
      if (arr[i] < arr[j]) {
        //如果arr[j]大就把此时的值赋值给最大值变量max
        max = arr[j];
        arr[j] = arr[i];
        arr[i] = max;
      }
    }
  }
  return arr;
};

const ModalHelper1 = ((bodyCls) => {
  let scrollTop;
  return {
    afterOpen: function () {
      scrollTop = document.scrollingElement.scrollTop;
      document.body.classList.add(bodyCls);
      document.body.style.top = -scrollTop + 'px';
    },
    beforeClose: function () {
      document.body.classList.remove(bodyCls);
      // scrollTop lost after set position:fixed, restore it back.
      document.scrollingElement.scrollTop = scrollTop;
    }
  };
})('dialog-open');
Vue.prototype.ModalHelper = ModalHelper1;

Vue.prototype.gotoUserPage = function (id) {
  if (id < 0) return;
  router.push({ path: "/person/" + id });
};
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = 'cuitech-' + to.meta.title;
  }
  next();
})
var context = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
export default context;
