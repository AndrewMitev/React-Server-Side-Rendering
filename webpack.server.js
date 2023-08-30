const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');
const dotenv = require('dotenv').config();

const config = {
    // Inform webpack that we are building bundle for nodeJS
    target: 'node',

    // Tell webpack the root file for our server application
    entry: './src/index.js',

    // Tell webpack where to put the bundle
    output: {
        filename: 'server-bundle.js',
        path: path.resolve(__dirname, 'build')
    },

    externals: [webpackNodeExternals()]
}

module.exports = merge(baseConfig, config);