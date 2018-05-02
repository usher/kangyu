var path = require("path");
var args = require("minimist")(process.argv.slice(2));
var cloneDeep = require("lodash.clonedeep");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var baseConfig = require("./base");

var entry = {
  app: [
    "webpack/hot/only-dev-server",
    path.resolve(__dirname, "../src/js/app")
  ]
};

var plugins = [
  new ExtractTextPlugin("app.css"),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
];

var config = Object.assign({}, cloneDeep(baseConfig), {
  entry: entry,
  devtool: "inline-source-map",
  plugins: plugins
});

config.module.rules = config.module.rules.filter(function(loader) {
  return loader.test.toString() != String(/\.p?css$/);
});

config.module.rules.push({
  test: /\.p?css$/,
  use: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [
      {
        loader: "css-loader",
        options: {
          sourceMap: true
        }
      },
      {
        loader: "postcss-loader",
        options: {
          sourceMap: true
        }
      }
    ]
  })
});

config.output.filename = "app.js";

module.exports = config;
