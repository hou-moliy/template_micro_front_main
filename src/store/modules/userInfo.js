// 定义状态量
const state = {
  name: "我是张三",
  token: "合理收费的来回路费获得胜利后过分了",
};

// 定义getters
const getters = {

};

// 定义actions映射
const actions = {

};

// 真正用于修改数据的方法
const mutations = {
  changeName (state, name) {
    state.name = name;
  },
};

// 导出所有配置
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
