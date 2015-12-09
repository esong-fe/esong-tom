const webpack = require( 'webpack' ) ,
  CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin ,
  ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

module.exports = {
  entry : './src/index' ,
  output : {
    path : './src/bundle' ,
    filename : 'app.js'
  } ,
  module : {
    loaders : [
      {
        test : /\.js$/ ,

        // 有些模块我使用了源码而非编译好的代码，所以这些模块也要用 babel 转换一下。
        // 在下面的括号中使用竖线 | 分隔开要使用 babel 处理的 npm 包名
        exclude : /node_modules(?!(\/|\\?\\)(vue-strap)\1)/ ,
        loader : 'babel' ,
        query : {
          presets : [ 'es2015' , 'stage-3' ] ,
          plugins : [ 'transform-runtime' ]
        }
      } ,
      {
        test : /\.vue$/ ,
        loader : 'vue'
      } ,
      {
        test : /\.html$/ ,
        loader : 'vue-html' // webpack 会自动加上 -loader 的后缀变成模块 id：vue-html-loader，并 require()
      } ,
      {
        test : /\.scss$/ ,
        loader : ExtractTextPlugin.extract( 'style' , 'css?sourceMap!sass?sourceMap' )
      } ,
      {
        test : /\.(jpg|png|ttf|woff2?|svg|eot)$/ ,
        loader : 'file'
      }
    ]
  } ,
  plugins : [
    new ExtractTextPlugin( '[name].css' )
  ] ,
  watch : true ,
  devtool : '#source-map'
};
