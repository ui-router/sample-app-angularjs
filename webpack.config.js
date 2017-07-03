var webpack = require('webpack');
var path = require('path');

var DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') !== -1;
var DEV = DEV_SERVER || process.env.DEV;

var plugins = [];
if (!DEV) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ sourceMap: true, }));
}
plugins.push(new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }));


module.exports = {
  entry: {
    "sampleapp": "./app/bootstrap/bootstrap.js",

    "vendor": [
      'angular',
      'oclazyload',
      '@uirouter/core',
      '@uirouter/angularjs',
      '@uirouter/visualizer',
      '@uirouter/sticky-states',
      '@uirouter/dsr',
    ],
  },

  devtool: DEV ? 'source-map' :'source-map',

  output: {
    path: path.join(__dirname, "_bundles"),
    publicPath: '_bundles/',
    filename: "[name].js",
  },

  resolve: {
    extensions: ['.js']
  },

  plugins: plugins,

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
        use: { loader: 'babel-loader', options: { presets: ['babel-preset-es2015'] } },
      }
    ]
  },
};
