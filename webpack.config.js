// const path = require('path');
// 引入html-webpack-plugin插件
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入clean-webpack-plugin插件
// const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
  // 打包入口
  entry: {
    home: './src/index.js'
  },
  // 输出
  output: {
    filename: 'bundle.js',
    publicPath: 'xnPath'
  },
  // 显示错误的来源
  devtool: 'eval',
  // 配置devServer
  devServer: {
    contentBase: 'www'
  },
  // plugins进行插件的配置
  // plugins: [
  //   // 清除dist文件夹
  //   new CleanWebpackPlugin(),
  //   new HtmlWebpackPlugin({
  //     title: 'Output Management'
  //   })
  // ]
};
