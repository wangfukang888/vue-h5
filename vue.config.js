const path = require('path')

const GOLO_URL = 'https://partner.golodata.com/'
// 线上
// const GOLO_URL = 'https://partner.goloiov.cn/'

module.exports = {
  productionSourceMap: true,
  filenameHashing: true,
  assetsDir: 'static_pro', // 后台使用绝对路径 注意。
  // 输出文件目录`
  devServer: {
    proxy: {
      '/apis/': {
        target: GOLO_URL,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/apis/':'/' 
        }
      },
      '/tp/': {
        target: 'http://eq.test.x431.com/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/tp/':'/' 
        }
      }
    }
  },
  css: {  // 一次配置，全局使用，这个scss 因为每个文件都要引入
    loaderOptions: {
      scss: {
        prependData: `@import "~css/def.scss";`
      }
    }
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  configureWebpack: {
    resolve: {
      alias: {
        'com': path.resolve(__dirname, './src/components'),
        'img': path.resolve(__dirname, './src/assets/img'),
        'css': path.resolve(__dirname, './src/assets/css'),
        'req': path.resolve(__dirname, './src/fetch'),
        'api': path.resolve(__dirname, './src/api')
      }
    }
  },
  chainWebpack: config => {
    // config.module
    // .rule('images')
    //   .use('url-loader')
    //     .loader('url-loader')
    //     .tap(options => Object.assign(options, { limit: 10240 }))
  }
}
