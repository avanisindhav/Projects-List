const path = require("path");

module.exports = {
  mode: "none",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    // open: true,
    static: path.resolve(__dirname, "."),
    devMiddleware: {
      publicPath: "/dist",
    },
    // //   watchContentBase: true,
    // contentBase: "./dist",
    // //   publicPath: "/dist/",
    // //   hot: false,
    // //   liveReload: true,
  },
};
