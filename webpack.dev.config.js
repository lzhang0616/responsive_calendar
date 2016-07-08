'use strict';

const webpack = require('webpack');
const config = require('./webpack.config');
const Visualizer = require('webpack-visualizer-plugin');

config.devtool = 'cheap-module-eval-source-map';
config.entry.splice(0, 0, 'webpack-hot-middleware/client');
config.module.loaders[0].query.presets.splice(0, 0, 'react-hmre');
config.plugins = [
  new Visualizer(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  })
];

module.exports = config;
