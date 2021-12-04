const path = require("path");
const Dotenv = require("dotenv-webpack");
// const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: "./process.env",
      allowEmptyValue: false,
      defaults: false,
    }),
  ],
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      Components: path.resolve(__dirname, "src/components"),
      Containers: path.resolve(__dirname, "src/containers"),
      Hooks: path.resolve(__dirname, "src/hooks"),
      Images: path.resolve(__dirname, "src/assets/images"),
      Context: path.resolve(__dirname, "src/context"),
      Lib: path.resolve(__dirname, "src/lib"),
    },
  },
};
