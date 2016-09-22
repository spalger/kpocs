import { resolve } from 'path'
import { IgnorePlugin } from 'webpack'

const defaults = {
  devtool: '#cheap-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [ 'babel-loader' ],
      },
    ],
  },
  plugins: [
    // english locale is included, exclude the rest
    new IgnorePlugin(/locale/, /moment$/),
  ],
}

export default [
  // photos plugin
  {
    context: resolve(__dirname, 'plugins/photos'),
    entry: './',
    output: {
      path: resolve(__dirname, 'build'),
      filename: 'plugin.photos.js',
      jsonpFunction: '__photosPluginJsonP__',
    },
    ...defaults,
  },

  // profiles plugin
  {
    context: resolve(__dirname, 'plugins/profiles'),
    entry: './',
    output: {
      path: resolve(__dirname, 'build'),
      filename: 'plugin.profiles.js',
      jsonpFunction: '__profilesPluginJsonP__',
    },
    ...defaults,
  },

  // friendster plugin
  {
    context: resolve(__dirname, 'plugins/friendster'),
    entry: './',
    output: {
      path: resolve(__dirname, 'build'),
      filename: 'plugin.friendster.js',
      jsonpFunction: '__friendsPluginJsonP__',
    },
    ...defaults,
  },

  // kibana client
  {
    context: resolve(__dirname, 'core'),
    entry: './',
    output: {
      path: resolve(__dirname, 'build'),
      filename: 'kibana.js',
      library: 'kibana',
      libraryTarget: 'umd',
      jsonpFunction: '__kibanaClientPluginJsonP__',
    },
    ...defaults,
  },

  // bootstrap
  {
    context: resolve(__dirname),
    entry: './bootstrap-browser',
    output: {
      path: resolve(__dirname, 'build'),
      filename: 'bootstrap.js',
    },
    ...defaults,
  },
]
