/**
 app.js导出的是上面registerMicroApps的第一个参数，是一个对象数组，其中数组每个字段的作用如下：
（1）name：微应用的名称，后面改造微应用的时候一定要与这个name对应
（2）entry：微应用运行的域名加端口，我用的是本地8088端口
（3）container：启动微应用需要一个dom容器，里面就是这个dom容器的 id
（4）activeRule：触发启动微应用的规则，当检测到url中含有activeRule的值时，将启动微应用
  当微应用信息注册完之后，一旦浏览器的 url 发生变化，便会自动触发 qiankun 的匹配逻辑，所有 activeRule 规则匹配上的微应用就会被插入到指定的 container 中，同时依次调用微应用暴露出的生命周期钩子。
**/
import actions from "./actions";
// 子应用列表
const microApps = [
  {
    name: "yxms-user-subapp1",
    entry: "http://10.4.5.0:8877/activity", // 子应用的地址，这里演示是本地启动的地址。
    container: "#container", // 子应用的容器节点的选择器（vue一般为app）
    activeRule: `${process.env.VUE_APP_ROUTER_BASE_URL}/subapp1`, // 访问子应用的规则，比如：主应用为localhost:8081，那访问该子应用的url应为localhost:8081/subapp
  },
];
const apps = microApps.map(item => {
  return {
    ...item,
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: actions.getGlobalState,
    },
  };
});
export default apps;
