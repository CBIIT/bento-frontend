const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('../config/paths');

module.exports = {
  entry: paths.appIndexJs,
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: paths.appNodeModules,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|png|jpe?g|svg|JPG)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/inline',
      }
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: paths.appHtml }),
  ],
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    path: path.resolve(__dirname, '../dist'),
  },
};
