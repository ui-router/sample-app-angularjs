var webpack = require('webpack');
var path = require('path');

var DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') !== -1;
var DEV = DEV_SERVER || process.env.DEV;

module.exports = {
  mode: DEV ? 'development' : 'production',
  entry: {
    "sampleapp": "./app/bootstrap/bootstrap.js",
  },

  devtool: DEV ? 'eval' :'source-map',

  output: {
    path: path.join(__dirname, "_bundles"),
    publicPath: '_bundles/',
    filename: "[name].js",
  },

  resolve: {
    extensions: ['.js']
  },

  optimization: {
    splitChunks: { chunks: 'all', },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
        exclude: [/@uirouter/]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: { loader: 'babel-loader' },
      }
    ]
  },
};
