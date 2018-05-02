var path = require("path");
var webpack = require("webpack");

var WebpackAssetsManifest = require("webpack-assets-manifest");
var BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

var args = require("minimist")(process.argv.slice(2));

var port = 9000;
var srcPath = path.resolve(__dirname, "../src");
var publicPath = "/system/static/";

var BaseConfig = {
  output: {
    path: path.join(__dirname, "../public/" + publicPath),
    filename: "[name].js",
    publicPath: publicPath
  },
  devServer: {
    contentBase: "./src/",
    historyApiFallback: true,
    hot: true,
    port: port,
    publicPath: publicPath,
    noInfo: false,
    headers: { "Access-Control-Allow-Origin": "*" }
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"],
    alias: {
      src: srcPath,
      fonts: srcPath + "/fonts/",
      css: srcPath + "/src/css",
      js: srcPath + "/src/js",
      config: srcPath + "/config/" + process.env.REACT_WEBPACK_ENV
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
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
        test: /\.(js|jsx)$/,
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
