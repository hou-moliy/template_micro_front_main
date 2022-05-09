const { name } = require('./package.json')
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.VUE_APP_ROUTER_BASE_URL,
  transpileDependencies: true,
  devServer: {
    host: "0.0.0.0",
    proxy: {
      '/resource': {
        target: 'http://10.1.63.203:8050/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/resource': '/imgs',
        },
      },
      '/nresource': {
        target: 'http://10.1.63.203:8050/',
        changeOrigin: true,
        ws: true,
      },
      '/activity/api/': {
        target: 'https://t133.ebupt.com.cn/test/api/activityFjK8s',
        // target: 'http://10.1.63.202:9513/', // 测试环境
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/activity/api/': '',
        },
      },
      '/wechatHostCors': {
        target: 'https://mp.weixin.qq.com/',
        changeOrigin: true,
        ws: true,
      },
      '/portal/api/coreSso': {
        target: 'http://10.1.63.202:9722/coreSsoFj',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/portal/api/coreSso': '',
        },
      },
      '/sso/api': {
        target: 'https://t133.ebupt.com.cn/test/api/coressoFjK8s',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/sso/api': '',
        },
      },
      '/spclSearch/api': {
        target: 'https://t133.ebupt.com.cn/spclSearch/api',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/spclSearch/api': '',
        },
      },
      // 公用代理--activity
      [process.env.BASE_URL_ACTIVITY]: {
        // target: 'http://10.1.63.201:9554/activityZj', // k8s测试服务器zj
        target: 'https://t133.ebupt.com.cn/test/api/activityFjK8s', // k8s测试服务器nx
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.BASE_URL_ACTIVITY]: '',
        },
      },

      // 公用代理--portal
      [process.env.BASE_URL_PORTAL]: {
        // t133测试环境k8s的idl-portal
        target: 'https://t133.ebupt.com.cn/test/api/portalFjK8s',
        // target: 'https://blog.xxt.nx.chinamobile.com/idl/portal/api/', // 现网代理地址
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.BASE_URL_PORTAL]: '',
        },
      },

      // 公用代理--weixin
      [process.env.BASE_URL_WEIXIN]: {
        target: 'https://t133.ebupt.com.cn/test/api/weixinNxK8s',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.BASE_URL_WEIXIN]: '',
          // '^/weixin/api': '/weixinFxqTest',
        },
      },
    }
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      chunkLoadingGlobal: `webpackJsonp_${name}`
    },
    optimization: { // 解决webpack5不能自定义环境名称问题
      nodeEnv: false
    }
  },
  chainWebpack: (config) => {
    config.module
      .rule('worker')
      .test(/\.worker\.js$/)
      .use('worker-loader').loader('worker-loader')
      .options({
        inline: true,
        fallback: false
      }).end();
  }
})
