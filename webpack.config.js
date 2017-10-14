const path = require('path'),
  webpack = require('webpack');

const webpackConfig = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
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
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'demo')]
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

switch (process.env.NODE_ENV) {
  case 'prod':
    webpackConfig.entry.app = "./src/build.js"
    webpackConfig.devtool = "#source-map"
    break
}

module.exports = webpackConfig