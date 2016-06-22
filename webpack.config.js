'use strict'

var autoprefixer = require('autoprefixer');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    path.resolve(__dirname, './src/main')
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    library: 'responsiveCalendar',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      loader: "babel-loader",
      query: {
        presets: ['es2015-webpack', 'react', 'react-hmre', 'stage-1', 'stage-2'],
        plugins: ['transform-object-assign']
      }
    },
    {
      test: /\.css$/,
      loader: 'style!css!postcss'
    },
    {
      test: /\.less$/,
      loader: 'style!css!less'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ],
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
  resolve: {
    alias: {
      fullCalendarStyle$: '../../node_modules/fullcalendar/dist/fullcalendar.css'
    },
    extensions: ['', '.js', '.jsx'],
    modules: ['vendor', 'web_modules', 'node_modules']
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  }
};
