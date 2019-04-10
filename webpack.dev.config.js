// dev config - no file hashing, and streamlined css production

var config = require('./webpack.config.js');
webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const globImporter = require('node-sass-glob-importer');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// give the js file a fairly static name
config.output.filename = 'main.dev.js';

// add the css extraction, again with a fairly static name
config.plugins.push( new MiniCssExtractPlugin({
    filename: "[name].dev.css"
}));

// add the browsersync plugin
config.plugins.push( new BrowserSyncPlugin({
  // browse to http://localhost:3000/ during development
  host: 'localhost',
  port: 3000,
  proxy: require("./package.json").config.proxy,
  files: [ '*.php', 'dist/**/*', 'inc/**/*.php', 'components/**/*.php']
}));

// define some dev css rules
config.module.rules.push({
    test: /\.(sass|scss)$/,
    use: [
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                url: false
            }
        },
        {
            loader: 'sass-loader',
            options: {
                importer: globImporter(),
                sourceMap: true
            }
        }
    ]
},
{
        test: /\.(ttf|otf|eot|woff|woff2?|png|jpe?g|gif|svg|ico|mp4|webm)$/,
        use: [
          {
            loader: 'ignore-loader'
          }
        ]
      }
);

module.exports = config;
