const path = require('path'),
  webpack = require('webpack'),
  rimraf = require('rimraf'),
  UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
  merge = require('webpack-merge')

let webpackConfig = {
  entry: {
    app: ''
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname + '/dist')
  },
  resolve: {
    extensions: ['.vue', '.js']
  },
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'demo')],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
}

rimraf(path.join(__dirname, 'dist'), () => console.log('success remove'))

switch (process.env.NODE_ENV) {
  case 'dev':
    webpackConfig.entry.app = "./src/index.js"
    module.exports = webpackConfig
    break
  case 'prod':
    webpackConfig.devtool = "#source-map"
    module.exports = [
      merge(webpackConfig, {
        entry: './src/components/vue-txt-number.vue',
        output: {
          filename: 'vue-txt-number.js',
          libraryTarget: 'umd',
          library: 'vue-txt-number',
          umdNamedDefine: true
        }
      }),
      merge(webpackConfig, {
        entry: path.resolve('./src/build.js'),
        output: {
          filename: 'vue-txt-number.min.js',
          libraryTarget: 'window',
          library: 'VueTxtNumber',
        }
      })
    ]
    break
}
