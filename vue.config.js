const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    proxy: {
      //配置跨域
      "/api": {
        target: "http://localhost:8095", //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true, //允许跨域
        
        pathRewrite: {
          /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
                      实际上访问的地址是：http://172.23.59.202:8085/core/getData/userInfo,因为重写了 /api
                     */
          "^/api": "",
        },
      },
    },
  }
})

  
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const webpack = require("webpack");
// const productionGzipExtensions = ['js', 'css']



// module.exports = {
//   configureWebpack:{
//     plugins: [
//       // 配置compression-webpack-plugin压缩
//       new CompressionWebpackPlugin({
//         algorithm: 'gzip',
//         test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
//         threshold: 10240,
//         minRatio: 0.8
//       }),
//       new webpack.optimize.LimitChunkCountPlugin({
//         maxChunks: 5,
//         minChunkSize: 100
//       })
//     ]

//   },

//   devServer: {
//     port:8081,
//     proxy: {
//       //配置跨域
//       "/api": {
//         target: "http://localhost:8095", //这里后台的地址模拟的;应该填写你们真实的后台接口
//         changOrigin: true, //允许跨域
//         pathRewrite: {
//           /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
//                       实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
//                      */
//           "^/api": "",
//         },
//       },
//     },
//   },
// };
