// 此文件用于'@/store/index.js '一次性导入所有vuex模块，一般情况下不要修改！！！
const files = require.context(".", false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
  if (key === "./index.js") { return; }
  modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
});

export default modules;
