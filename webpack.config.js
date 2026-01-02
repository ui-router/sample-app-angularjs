const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: './app/bootstrap/bootstrap.js',
  devtool: isDev ? 'eval' : 'source-map',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', globOptions: { ignore: ['**/index.html'] } }],
    }),
  ],

  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 4000,
  },
};
