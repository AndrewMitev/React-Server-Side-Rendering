module.exports = {
    // Tell webpack to run babel
    module: {
        rules: [{ 
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets: ['react', 'stage-0', ['env', { targets: { browsers: ['last 2 versions'] }}]]
            }
            }]
    }
};