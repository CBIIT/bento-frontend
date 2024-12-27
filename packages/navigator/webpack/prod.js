const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./common');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');
const paths = require('../config/paths');
const getClientEnvironment = require('../config/env');

// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = paths.servedPath;
const env = getClientEnvironment(publicUrl);

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    new CopyPlugin({
      patterns: [
        {from: path.join(__dirname, '../public/injectEnv.js'), to: './[name].js'},
        {from: path.join(__dirname, '../public/js/session.js'), to: './js/[name].js'},
        {from: path.join(__dirname, '../public/manifest.json'), to: './[name].json'},
        {from: path.join(__dirname, '../public/404.html'), to: './[name].html'}
      ]
    })
  ],
});
