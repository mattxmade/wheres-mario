const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { ESBuildMinifyPlugin } = require("esbuild-loader");

module.exports = {
  entry: "./src/index.jsx",
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      minify: true,
      // favicon: "./src/favicon.ico",
      title: "Where's Mario",
      template: "./src/index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "./public", to: path.resolve(__dirname, "dist") }],
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: (pathData) => {
      const filepath = path
        .dirname(pathData.filename)
        .split("/")
        .slice(1)
        .join("/");
      return `${filepath}/[name][ext]`; // [1]
    },
    clean: true,
  },
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: "es2015",
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        resolve: { extensions: [".js", ".jsx", ".test.js", ".test.jsx"] },
        exclude: /node_modules/,
        loader: "esbuild-loader",
        options: {
          loader: "jsx",
          target: "es2015",
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp|ico|gltf|glb|txt)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
};

// [1] dist structure === src strucutre https://stackoverflow.com/a/68902490
