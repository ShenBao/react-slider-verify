'use strict';

const path = require ('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin');

module.exports = {
  devServer: {
    compress: true,
    port: 8848,
    open: true,
  },
  entry: './src/index.tsx',
  output: {
    path: path.join (__dirname, './dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory'],
        include: path.resolve (__dirname, 'src'),
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve (__dirname, './src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin ({
      template: './public/index.html',
    }),
  ],
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
};
