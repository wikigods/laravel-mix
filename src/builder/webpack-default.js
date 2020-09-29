let TerserPlugin = require('terser-webpack-plugin');

module.exports = function() {
    return {
        context: Mix.paths.root(),

        mode: Mix.inProduction() ? 'production' : 'development',

        entry: {},

        output: {
            chunkFilename: '[name].[hash:5].js'
        },

        module: { rules: [] },

        plugins: [],

        resolve: {
            extensions: ['*', '.wasm', '.mjs', '.js', '.jsx', '.json'],
            roots: [path.resolve(Config.publicPath)]
        },

        stats: {
            hash: false,
            version: false,
            timings: false,
            children: false,
            errorDetails: false,
            entrypoints: false,
            performance: Mix.inProduction(),
            chunks: false,
            modules: false,
            reasons: false,
            source: false,
            publicPath: false,
            builtAt: false
        },

        performance: {
            hints: false
        },

        optimization: Mix.inProduction()
            ? {
                  minimizer: [new TerserPlugin(Config.terser)]
              }
            : {},

        devtool: Config.sourcemaps,

        devServer: {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            contentBase: path.resolve(Config.publicPath),
            historyApiFallback: true,
            noInfo: true,
            compress: true,
            quiet: true
        },
        
        watchOptions: {
            ignored: /node_modules/
        }
    };
};
