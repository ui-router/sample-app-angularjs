var webpack = require('webpack');
var path = require('path');

var DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') !== -1;
var DEV = DEV_SERVER || process.env.DEV;

module.exports = {
  entry: {
    "sampleapp": "./app/bootstrap/bootstrap.js",
  },

  devtool: DEV ? 'cheap-module-source-map' :'source-map',

  output: {
    path: path.join(__dirname, "_bundles"),
    publicPath: '_bundles/',
    filename: "[name].js",
  },

  resolve: {
    extensions: ['.js']
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: DEV ? false : { warnings: false },
      mangle: DEV ? false : true,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: { loader: 'babel-loader', options: { presets: ['env'] } },
      }
    ]
  },
};
