import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import start from "@/micors";
Vue.config.productionTip = false;
// 获取实例
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
start();
