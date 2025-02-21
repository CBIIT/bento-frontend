const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const paths = require('./paths');

module.exports = {
  entry: paths.appIndex,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'thread-loader', // Use multi-threading to improve performance
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true, // Works with thread-loader for faster builds
            },
          },
        ],
        exclude: paths.appNodeModules,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(?:js|mjs|cjs|jsx)$/,
        exclude: paths.appNodeModules,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false, // Enable Babel caching
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|png|jpe?g|svg|JPG)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext][query]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, '../src/components'),
      '@assets': path.resolve(__dirname, '../src/assets'),
    },
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appHtml,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV), // Injects environment variables
    }),
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
    publicPath: '/',
  },
};
