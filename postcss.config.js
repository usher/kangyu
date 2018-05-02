module.exports = {
    plugins: [
      require("postcss-import"),
      require("postcss-custom-properties"),
      require("postcss-mixins"),
      require("postcss-nested"),
      require("postcss-will-change"),
      require("autoprefixer")
    ]
  };