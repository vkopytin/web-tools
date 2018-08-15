require('dotenv').config()

const fs = require('fs')
const childProcess = require('child_process')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DotenvPlugin = require('webpack-dotenv-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const cssnano = require('cssnano')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')
const IDom = require('babel-plugin-transform-incremental-dom')
const { TsConfigPathsPlugin } = require('awesome-typescript-loader')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const CDN_PATH = process.env.CDN;
const ip = process.env.APP_IP || '0.0.0.0'
const port = (+process.env.APP_PORT) || 3001
const DEBUG = ['production', 'alpha', 'beta', 'dev'].indexOf(process.env.NODE_ENV) === -1
var PUBLIC_DIR = 'build/prod';
if (process.env.NODE_ENV === 'alpha') {
  PUBLIC_DIR = 'build/alpha';
} else if (process.env.NODE_ENV === 'beta') {
  PUBLIC_DIR = 'build/beta';
} else if (process.env.NODE_ENV === 'dev') {
  PUBLIC_DIR = 'entry-editor/dev';
}

//toDO: Check production config for webpack

// resolve-url-loader is required in order to process css url(...) declarations agains global root
// for the case when the same css module is required in JS and used over @import in CSS
//const cssLoaderConfig = 'css-loader?minimize=1?importLoaders=1!resolve-url-loader!postcss-loader'
const cssLoaderConfig = 'css-loader?importLoaders=1!resolve-url-loader!postcss-loader'

const config = {
  devtool: DEBUG ? 'eval' : ['alpha'].indexOf(process.env.NODE_ENV) === -1 ? false : 'source-map',
  entry: {
    app: ['babel-polyfill', path.join(__dirname, '../src/app/mainApp.ts')]
  },
  output: {
    publicPath: DEBUG ? '/' : CDN_PATH + PUBLIC_DIR + '/',
    path: path.resolve(path.join(__dirname, '../', PUBLIC_DIR)),
    filename: '[name].js?hash=[hash]'
  },
  resolve: {
    modules: ['src', 'static/js', 'static/css', 'static/images', 'static/less', 'node_modules'],
    // enable require('<module-name>') to look into respected path
    alias: {
      app: path.resolve(__dirname, '..', 'src', 'app'),
      '~': path.resolve(__dirname, '..', 'src')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.mustache', '.less']
  },
  plugins: [
    new TsConfigPathsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`
    }),
    new DotenvPlugin({
      sample: './.env.example',
      path: './.env'
    }),
    new HtmlWebpackPlugin({
      //   filename: '../public/index.html',
      //   template: path.resolve(__dirname, '..', 'src', 'html.mustache'),
      //   inject: false,
      //   alwaysWriteToDisk: true,
      //   path: !DEBUG ? '/public' : ''
      template: 'index.html'
    }),
    new HtmlWebpackHarddiskPlugin(),
    //new webpack.optimize.CommonsChunkPlugin({
    //  name: 'vendor',
    //  filename: '[name].js?hash=[hash]',
    //  minChunks: Infinity
    //}),
    new webpack.NamedModulesPlugin(),
    new CleanWebpackPlugin(['../' + PUBLIC_DIR], {
      allowExternal: true
    }),
  ],
  module: {
    rules: [{
      //test: /\.tsx?$/, loaders: ['babel-loader', 'ts-loader'], exclude: /node_modules/
      test: /\.tsx?$/, loader: 'awesome-typescript-loader', query: { tsconfig: './tsconfig.json' }
    }, {
      test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/
    }, {
      test: /\.mustache$/, loader: 'mustache-loader'
    }, {
      test: /\.css$/, loader: 'DEBUG' ? `style-loader!${cssLoaderConfig}` : ExtractTextPlugin.extract({ fallback: 'style-loader', use: [cssLoaderConfig] })
    }, {
      test: /\.less$/,
      use: [{
          loader: "style-loader" // creates style nodes from JS strings
      }, {
          loader: "css-loader" // translates CSS into CommonJS
      }, {
          loader: "less-loader" // compiles Less to CSS
      }]
    }, {
      test: /\.json$/, loader: 'json-loader?name=[path][name]-[hash].[ext]'
    }, {
      test: /\.png$/, loader: 'url-loader?name=[path][name]-[hash].[ext]&mimetype=image/png'
    }, {
      test: /\.jpg$/, loader: 'file-loader?name=[path][name]-[hash].[ext]'
    }, {
      test: /\.svg$/, loader: 'file-loader?name=[path][name]-[hash].[ext]'
    }, {
      test: /\.gif$/, loader: 'file-loader?name=[path][name]-[hash].[ext]'
    }, {
      test: /\.woff$/, loader: 'file-loader?name=[path][name]-[hash].[ext]'
    }, {
      test: /\.woff2$/, loader: 'file-loader?name=[path][name]-[hash].[ext]'
    }, {
      test: /\.ttf$/, loader: 'url-loader?name=[path][name]-[hash].[ext]&mimetype=application/font-sfnt'
    }, {
      test: /\.eot$/, loader: 'file-loader?name=[path][name]-[hash].[ext]'
    }]
  },
  node: { fs: 'empty' }
}

if (DEBUG) {
  config.entry.app.unshift(
    `webpack-dev-server/client?http://${ip}:${port}/`,
    'webpack/hot/only-dev-server'
  )

  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ])
} else {
  config.plugins = config.plugins.concat([
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), //https://stackoverflow.com/questions/25384360/how-to-prevent-moment-js-from-loading-locales-with-webpack
    new ExtractTextPlugin('app.css?hash=[hash]'),
  ])

  if (['alpha'].indexOf(process.env.NODE_ENV) === -1) {
    config.plugins = config.plugins.concat([
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          sourcemap: false,
          discardDuplicates: { removeAll: true },
          discardComments: { removeAll: true },
          // Run cssnano in safe mode to avoid
          // potentially unsafe transformations.
          safe: true,
        },
        canPrint: false,
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new BabiliPlugin(),
    ]);
  }
}

module.exports = config
