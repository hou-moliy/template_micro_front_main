const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// 解决H5缓存问题
const filePath = "js/"; // 打包文件存放文件夹路径
const Timestamp = "." + new Date().getTime();// 时间戳
function resolve (dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  publicPath: process.env.VUE_APP_ROUTER_BASE_URL,
  transpileDependencies: true,
  devServer: {
    host: "0.0.0.0",
    proxy: {
      // 公用代理--activity
      [process.env.BASE_URL_ACTIVITY]: {
        // target: 'http://10.1.63.201:9554/activityZj', // k8s测试服务器zj
        target: "https://t133.ebupt.com.cn/test/api/activityFjK8s", // k8s测试服务器nx
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.BASE_URL_ACTIVITY]: "",
        },
      },
      // 公用代理--portal
      [process.env.BASE_URL_PORTAL]: {
        // t133测试环境k8s的idl-portal
        target: "https://t133.ebupt.com.cn/test/api/portalFjK8s",
        // target: 'https://blog.xxt.nx.chinamobile.com/idl/portal/api/', // 现网代理地址
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.BASE_URL_PORTAL]: "",
        },
      },
      // 公用代理--weixin
      [process.env.BASE_URL_WEIXIN]: {
        target: "https://t133.ebupt.com.cn/test/api/weixinNxK8s",
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.BASE_URL_WEIXIN]: "",
          // '^/weixin/api': '/weixinFxqTest',
        },
      },
    },
  },
  // configureWebpack: {
  //   output: {
  //     library: `${name}-[name]`,
  //     libraryTarget: "umd",
  //     chunkLoadingGlobal: `webpackJsonp_${name}`,
  //   },
  //   optimization: { // 解决webpack5不能自定义环境名称问题
  //     nodeEnv: false,
  //   },
  // },
  configureWebpack: config => {
    // 可以省略后缀
    config.resolve.extensions = [".js", ".vue", ".json"];
    config.optimization = {
      nodeEnv: false,
    };
    // 正式环境
    if (process.env.NODE_ENV === "prod") {
      // 输出重构  打包编译后的 文件名称  【模块名称.时间戳.js】 解决js缓存问题
      config.output.filename = `${filePath}[name]${Timestamp}.js`;
      config.output.chunkFilename = `${filePath}[name]${Timestamp}.js`;
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: "gzip",
          test: /\.js$|\.html$|\.json$|\.css/,
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 不删除源文件
          minRatio: 0.8,
        }),
      );
      // 开启分离js
      config.optimization = {
        nodeEnv: false, // 解决webpack5不能自定义环境名称问题
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 2000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name (module) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                return `npm.${packageName.replace("@", "")}`;
              },
            },
          },
        },
      };
    }
    config.plugins = [...config.plugins];
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"));
    config.module
      .rule("worker")
      .test(/\.worker\.js$/)
      .use("worker-loader").loader("worker-loader")
      .options({
        inline: true,
        fallback: false,
      }).end();
  },
});
