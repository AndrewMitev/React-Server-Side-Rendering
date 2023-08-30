const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = {
    // Tell webpack the root file for our client application
    entry: './src/client/client.js',
    // Tell webpack where to put the bundle
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    }
}

module.exports = merge(config, baseConfig);