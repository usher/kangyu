var path = require("path");
var webpack = require("webpack");

var cloneDeep = require("lodash.clonedeep");

var baseConfig = require("./base");

var config = Object.assign({}, cloneDeep(baseConfig), {
  entry: {
    app: ["webpack/hot/only-dev-server", path.join(__dirname, "../src/js/index")]
  },
  cache: true,
  devtool: "eval",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});

config.module.rules[0] = {
  test: /\.css$/,
  use: ["style-loader", "css-loader", "postcss-loader"]
};

config.output.filename = "app.js";

module.exports = config;
