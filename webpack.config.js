var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'script.js'
  },
  resolve:{
    extensions: ['.js']
  },
  devServer: {
    historyApiFallback: true
  },
  module:{
      rules: [
          {
              test: /\.scss$/,
              use: [
                  'css-loader',
                  'sass-loader'
              ]
          },
          {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: "babel-loader"
          }
      ]
  }
};