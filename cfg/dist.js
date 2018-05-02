var path = require("path");
var webpack = require("webpack");

var cloneDeep = require("lodash.clonedeep");

var baseConfig = require("./base");

var config = Object.assign({}, cloneDeep(baseConfig), {
  entry: {
    app: [path.join(__dirname, "../src/js/index")]
  },
  cache: false
});

module.exports = config;
