"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "example"),
    compress: true,
    port: 8848,
    open: true,
  },
  resolve: {
    extensions: [".js", ".ts", ".json"],
  },
  entry: "./example/index.tsx",
  output: {
    path: path.join(__dirname, "dist/example"),
    filename: "[name].js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset", //自动选择
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        use: ["babel-loader?cacheDirectory"],
        include: path.resolve(__dirname, "src"),
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            // loader: "ts-loader",
            loader: "babel-loader",
            options: {
              // transpileOnly: true,
            },
          },
        ],
      },
      // {
      //   test: /\.tsx?$/i,
      //   use: [
      //     {
      //       loader: 'awesome-typescript-loader',
      //       options: {
      //         transpileOnly: true,
      //       },
      //     },
      //   ],
      //   exclude: /node_modules/,
      // },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./example/index.html",
    }),
  ],
  cache: {
    // 磁盘存储
    type: "filesystem", //将缓存类型设置为文件系统，默认为memory
    buildDependencies: {
      // 当配置修改时，缓存失效
      config: [__filename],
    },
  },
};
