const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CDN_PATH = process.env.CDN;
const DEBUG = ['production', 'alpha', 'beta', 'dev'].indexOf(process.env.NODE_ENV) === -1
var PUBLIC_DIR = 'entry-editor/prod';

const config = {
    mode: 'development',
    devtool: DEBUG ? 'eval' : ['alpha'].indexOf(process.env.NODE_ENV) === -1 ? 'nosources-source-map' : 'source-map',
    entry: {
        app: ['babel-polyfill', path.join(__dirname, '../src/app/mainApp.ts')]
    },
    output: {
        publicPath: DEBUG ? '/' : CDN_PATH + PUBLIC_DIR + '/',
        path: path.resolve(path.join(__dirname, '../', PUBLIC_DIR)),
        filename: '[name].js?hash=[hash]'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.mustache', '.js', '.jsx'],
        modules: [
            'src',
            'src/app',
            'src/css',
            'src/images',
            'static/less',
            'node_modules'
        ],
        alias: {
            './images': path.resolve(__dirname, '../static/images'),
            './font': path.resolve(__dirname, '../static/font')
        }
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            //use: ['babel-loader', { loader: 'awesome-typescript-loader', query: { tsconfig: './tsconfig.json' } }]
            use: ['babel-loader', 'ts-loader']
        }, {
            test: /\.mustache$/,
            use: 'mustache-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader?minimize=1?importLoaders=1!resolve-url-loader!postcss-loader'
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
            test: /\.png$/, loader: 'url-loader?mimetype=image/png'
        }, {
            test: /\.jpg$/, loader: 'file-loader'
        }, {
            test: /\.svg$/, loader: 'file-loader'
        }, {
            test: /\.gif$/, loader: 'file-loader'
        }, {
            test: /\.woff$/, loader: 'file-loader'
        }, {
            test: /\.woff2$/, loader: 'file-loader'
        }, {
            test: /\.ttf$/, loader: 'url-loader?mimetype=application/font-sfnt'
        }, {
            test: /\.eot$/, loader: 'file-loader'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ],
};

module.exports = config;
