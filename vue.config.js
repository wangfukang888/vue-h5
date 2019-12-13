const path = require('path')

 // 线上地址
const url = 'https://wcp.szyrwl.com/' 
// 测试地址
// const url = 'https://storemp.golodata.com/'

module.exports = {
  productionSourceMap: true,
  filenameHashing: true,
  publicPath: './',
  assetsDir : 'static',
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
    // 排除小程序封面图，让它被上面的loader捕获
    config.module.rule('images').exclude.add(/mini\.png$/)
  }
}
