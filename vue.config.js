const path = require('path')

// 线上地址
const url = 'https://wcp.szyrwl.com/'
// 测试地址
// const url = 'https://storemp.golodata.com/'

module.exports = {
  productionSourceMap: true,
  filenameHashing: true,
  assetsDir: 'static_pro', // 后台使用绝对路径 注意。
  // 输出文件目录`
  devServer: {
    proxy: {
      '/api|/app': {
        target: url,
        ws: true,
        changeOrigin: true
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
        'api': path.resolve(__dirname, './src/fetch')
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
