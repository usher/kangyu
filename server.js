/* eslint no-console:0 */
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var config = require("./webpack.config");
var open = require("open");
var port = config.devServer.port;

new WebpackDevServer(webpack(config), config.devServer).listen(
  port,
  "0.0.0.0",
  function(err) {
    if (err) {
      console.log(err);
    }
    console.log("Listening at localhost:" + port);
    console.log("Opening your system browser...");
    open("http://localhost:" + port);
  }
);