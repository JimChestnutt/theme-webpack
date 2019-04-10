// production config - hashing files and adding postcss steps

var config = require('./webpack.config.js');
webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const globImporter = require('node-sass-glob-importer');

config.output.filename = 'main.[contenthash].js';
config.plugins.push( new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css"
}));

config.module.rules.push({
    test: /\.(sass|scss)$/,
    use: [
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: { url: false }
        },
        {
            loader: 'postcss-loader'
        },
        {
            loader: 'sass-loader',
            options: {
                importer: globImporter(),
                sourceMap: true
            }
        }
    ]
});

module.exports = config;
