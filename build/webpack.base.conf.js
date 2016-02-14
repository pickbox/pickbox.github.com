var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var webpack = require('webpack')

module.exports = {
  entry: {
    app: './src/main.js',
    vendor: ['jquery', 'sui.js', 'sui.less']
  },
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: '/static/',
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'lib': path.resolve(__dirname, '../lib'),
      'sui.js': 'lib/sui/js/sui.js',
      'sui.less': 'lib/sui/less/sui.less',
      'sui.css': 'lib/static/sui.css'
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    noParse: [
      /lib\/static\/sui.js$/
    ],
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
        test: /\.less$/,
        //loader: 'style!css!less'
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      },
      {
        test: /\.(css|scss)$/,
        //loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version!sass-loader'
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader?browsers=last 2 version!sass-loader')
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(svg|ttf|eot|woff(2)?)(\?[a-z0-9\-#]+)?$/,
        loader : 'file-loader',
        query: {
          name: '[name].[ext]?[hash:7]'
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
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
      css: ExtractTextPlugin.extract('css')
    }
  },
  plugins: [
    //new CopyWebpackPlugin([{ from: 'src/static' }]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
  ],
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}
