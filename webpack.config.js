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
        exclude : /node_modules/ ,
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
        loader : ExtractTextPlugin.extract( 'style-loader' , 'css-loader?sourceMap!sass-loader?sourceMap' )
      }
    ]
  } ,
  plugins : [
    new ExtractTextPlugin( '[name].css' )
  ] ,
  watch : true ,
  devtool : '#source-map'
};
