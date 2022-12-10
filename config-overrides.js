const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "fs": false,
        "net": false,
        "tls": false,
        "crypto": require.resolve("./node_modules/crypto-browserify"),
        "stream": require.resolve("./node_modules/stream-browserify"),
        "url": require.resolve("./node_modules/url"),
        "zlib": require.resolve("./node_modules/browserify-zlib"),
        "http": require.resolve("./node_modules/stream-http"),
        "https": require.resolve("./node_modules/https-browserify"),
        "assert": require.resolve("./node_modules/assert"),
        "os": require.resolve("./node_modules/os-browserify"),
        "path": require.resolve("./node_modules/path-browserify"),
        "process/browser": require.resolve("./node_modules/process/browser"),
    })
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ])
    config.ignoreWarnings = [/Failed to parse source map/];
    return config;
}