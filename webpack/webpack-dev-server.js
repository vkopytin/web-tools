/* eslint-disable */
require('dotenv').config()

// SESSIONID can change everytime
// it is to enable requests that are available for logged in users
// .e.g. /core/roar/posts/1598027/history/21054
// more comes in proxy statements from devServer.proxy
var SESSIONID = process.env.SESSIONID || 'gxiy5s3jrdfhj45oqk772jap4t0izl38';
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const routes = require('../src/server/routes');
const config = require('./webpack.config')

const ip = process.env.APP_IP || '0.0.0.0'
const port = (+process.env.APP_PORT) || 3001

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  host: ip,
  stats: false,
  historyApiFallback: true,
  https: false, // make upload image working over proxy requests, since request comes to hardcoded https
  contentBase: ['public', 'build'],
  compress: true,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  setup: function (app, server) {
    let __routes = new routes.Routes(process.env.NODE_ENV);
    __routes.paths(app);
  },
  // proxy requests to origin domain
  // target: ... can be changes according to my beta domain names
  // proxy: {'/core/': {
  //   target: process.env.PROXY_TARGET,
  //   changeOrigin: true,
  //   logLevel: 'debug',
  //   secure: true,
  //   cookieDomainRewrite: true,
  //   onProxyReq: (proxyReq, req) => {
  //     proxyReq.setHeader('Cookie', `sessionid=${SESSIONID}; _gat=1`);
  //   }
  // }, '/res/': {
  //   target: process.env.PROXY_TARGET,
  //   changeOrigin: true,
  //   logLevel: 'debug',
  //   secure: true,
  //   cookieDomainRewrite: true,
  //   onProxyReq: (proxyReq, req) => {
  //     proxyReq.setHeader('Cookie', `sessionid=${SESSIONID}; _gat=1`);
  //   }
  // }, '/api/': {
  //   target: process.env.PROXY_TARGET,
  //   changeOrigin: true,
  //   logLevel: 'debug',
  //   secure: true,
  //   cookieDomainRewrite: true,
  //   onProxyReq: (proxyReq, req) => {
  //     proxyReq.setHeader('Cookie', `sessionid=${SESSIONID}; _gat=1`);
  //   }
  // }, '/search': {
  //   target: process.env.PROXY_TARGET,
  //   changeOrigin: true,
  //   logLevel: 'debug',
  //   secure: true,
  //   cookieDomainRewrite: true,
  //   onProxyReq: (proxyReq, req) => {
  //     proxyReq.setHeader('Cookie', `sessionid=${SESSIONID}; _gat=1`);
  //   }
  // }}
}).listen(port, ip, function (err) {
  if (err) {
    return console.log(err)
  }

  console.log(`Listening at http://${ip}:${port}`)
})
