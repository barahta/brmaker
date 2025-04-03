const webpack = require('webpack');

module.exports = function override(config) {
    config.resolve.fallback = {
        "fs": false,
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "zlib": require.resolve("browserify-zlib"),
        "pg-hstore": require.resolve("pg-hstore")
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    );
    return config;
};