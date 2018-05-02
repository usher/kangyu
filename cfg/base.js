var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackAssetsManifest = require("webpack-assets-manifest");
var BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

var srcPath = path.resolve(__dirname, "../src");
var publicPath = "/system/static/";

var args = require("minimist")(process.argv.slice(2));

var BaseConfig = {
  output: {
    path: path.resolve(__dirname, "../../public" + publicPath),
    publicPath: publicPath,
    filename: "app.js"
  },
  devServer: {
    contentBase: "./src/",
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 9000,
    publicPath: publicPath,
    noInfo: false,
    headers: { "Access-Control-Allow-Origin": "*" },
    proxy: {
      "/system": "http://localhost:9800"
    }
  },
  resolve: {
    extensions: [".js", ".css", ".pcss"],
    alias: {
      src: srcPath,
      font: srcPath + "/font",
      js: srcPath + "/js",
      css: srcPath + "/css",
    }
  },
  module: {
    rules: [
      {
        test: /\.p?css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true
              }
            },
            {
              loader: "postcss-loader"
            }
          ]
        })
      },
      {
        test: /\.(jpe?g|png|gif|eot|ttf|woff|woff2|svg)(\?[0-9a-zA-Z=.]+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
            compact: true,
            comments: false
          }
        }
      }
    ]
  },
  cache: false,
  plugins: [
    new ExtractTextPlugin("app.css"),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new WebpackAssetsManifest({
      output: "manifest.json",
      merge: true
    })
  ]
};

if (args.profile) {
  BaseConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = BaseConfig;
