const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const globImporter = require('node-sass-glob-importer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = {
  watchOptions: {
    ignored: ['node_modules','dist']
  },
  plugins: [
    new CleanWebpackPlugin(['./dist/*']),
    new FriendlyErrorsWebpackPlugin(),
    new ManifestPlugin()
  ],
  externals: {
      jquery: 'jQuery'
  },
  entry: ['./src/index.js', './src/style.scss'],
  output: {
    filename: 'main.[contenthash].js',
    path: path.join(__dirname, '/dist/')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
              loader: "babel-loader"
          }
      },
      {
        test: /\.(ttf|otf|eot|woff|woff2?|png|jpe?g|gif|svg|ico|mp4|webm)$/,
        use: [
          {
            loader: 'ignore-loader'
          }
        ]
      }
    ]
  }
};
