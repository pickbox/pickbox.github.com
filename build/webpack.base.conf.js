var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var CopyWebpackPlugin = require('copy-webpack-plugin')
var webpack = require('webpack')

module.exports = {
  entry: {
    //vendor: ['jquery', 'sui'],
    app: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: '/static/',
    filename: '[name].js',
    chunkFilename: "[id].js"
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
      'src': path.resolve(__dirname, '../src')
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        //loader: 'babel!eslint',
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version!sass-loader'
        //loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'autoprefixer-loader?browsers=last 2 version', 'sass-loader')
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader : 'file-loader'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]'
        }
      }
    ]
  },
  vue: {
    loaders: {
//      js: 'babel!eslint'
      js: 'babel',
      css: ExtractTextPlugin.extract("css")
    }
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'src/static' }]),
    new ExtractTextPlugin("[name].[hash:8].css"),
    //new webpack.ProvidePlugin({
    //  $: "jquery",
    //  jQuery: "jquery"
    //}),
    //new webpack.optimize.CommonsChunkPlugin({
    //  name: "vendor"
    //})
  ],
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}
