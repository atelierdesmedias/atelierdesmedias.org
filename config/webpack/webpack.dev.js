const webpack = require('webpack');
const { merge } = require("webpack-merge");
const common = require('./webpack.common.js');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const paths = require('../global.paths');
const config = require('../global.config');

module.exports = merge(common, {
  /**
   * Mode
   *
   * Set the mode to development or production.
   */
  mode: 'development',

  /**
   * Devtool
   *
   * Control how source maps are generated.
   */
  devtool: 'inline-source-map',

  plugins: [
    new FriendlyErrorsPlugin({
      clearConsole: true
    })
  ],

  /**
   * DevServer
   *
   * Spin up a server for quick development.
   */
  devServer: {
    contentBase: paths.dist,
    open: false,
    compress: true,
    hot: true,
    port: 1234,
    // Write file on each compile
    writeToDisk: true,

    index: '',
    // if use proxy option is enable
    ...(config.useProxy
      ? {
          proxy: {
            '/': {
              // target something like http://localhost/project/dist/path/to/index/file
              target: `${process.env.APP_URL}${process.env.BASE_URL}`,
              changeOrigin: true,
              secure: false
            }
          }
        }
      : {}),

    // display error overlay on screen
    overlay: true,

    stats: {
      colors: true,
      hash: false,
      version: true,
      timings: true,
      assets: true,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: false
    },

    // friendly webpack error
    // https://github.com/geowarin/friendly-errors-webpack-plugin
    // pass to true if you don't want to print compile file in the console
    quiet: false,

    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
      'Access-Control-Allow-Credentials': 'true'
    }
  }
});
