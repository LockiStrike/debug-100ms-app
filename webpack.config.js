/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const packageJson = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const zlib = require('zlib');

const gitRevisionPlugin = new GitRevisionPlugin();
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (env, options) => {
    const devMode = options.mode === 'development';

    process.env.NODE_ENV = options.mode;

    return {
        mode: options.mode,
        entry: path.resolve(__dirname, './src/index.tsx'),
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].[contenthash].js',
            chunkFilename: '[name].[contenthash].js',
            publicPath: '/',
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
            fallback: {
                stream: false,
                crypto: false,
            },
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.css$/i,
                    // include: path.resolve(__dirname, 'src'),
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                        },
                    ],
                },
                { test: /\.(woff|woff2|ttf|eot|otf)$/, loader: 'file-loader' },
                {
                    test: /\.(png|jpg|gif|svg|mp4|webp)$/,
                    loader: 'file-loader',
                },
            ],
        },
        plugins: [
            // need to use ForkTsCheckerWebpackPlugin because Babel loader ignores the compilation errors for Typescript
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            }),
            new ForkTsCheckerWebpackPlugin(),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: devMode ? '[name].css' : '[name].[contenthash].css',
                chunkFilename: devMode
                    ? '[name].css'
                    : '[name].[contenthash].css',
            }),
            // copy static files from public folder to build directory
            new CopyPlugin({
                patterns: [
                    {
                        from: 'public/**/*',
                        globOptions: {
                            ignore: ['**/index.html'],
                        },
                    },
                    {
                        from: 'public/.well-known/apple-app-site-association',
                        to: '.well-known',
                    },
                ],
            }),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                filename: 'index.html',
                title: packageJson.name,
                meta: {
                    title: packageJson.name,
                    description: packageJson.description,
                    author: packageJson.author,
                    keywords: Array.isArray(packageJson.keywords)
                        ? packageJson.keywords.join(',')
                        : undefined,
                    'og:title': packageJson.name,
                    'og:description': packageJson.description,
                    'og:url': packageJson.homepage,
                },
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true,
                    minifyURLs: false,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributese: true,
                    useShortDoctype: true,
                },
            }),
            new NodePolyfillPlugin(),
            new webpack.EnvironmentPlugin({
                ENV: process.env.ENV || 'local',
                COMMITHASH: gitRevisionPlugin.commithash(),
                BRANCH: gitRevisionPlugin.branch(),
                LASTCOMMITDATETIME: gitRevisionPlugin.lastcommitdatetime(),
                BUILD_TIME: Date.now(),
            }),
            !devMode ? new CleanWebpackPlugin() : false,
            !devMode && process.env.analyzer
                ? new BundleAnalyzerPlugin()
                : false,
        ].filter(Boolean),
        optimization: {
            splitChunks: {
                cacheGroups: {
                    default: false,
                    vendors: false,
                    // vendor chunk
                    vendor: {
                        // sync + async chunks
                        chunks: 'all',
                        name: 'vendor',
                        // import file path containing node_modules
                        test: /node_modules/,
                    },
                },
            },
            minimizer: [
                new TerserPlugin({
                    extractComments: true,
                    terserOptions: {
                        compress: {
                            drop_console: true,
                        },
                    },
                }),
                new CssMinimizerPlugin(),
                new CompressionPlugin({
                    filename: '[path][base].gz',
                    algorithm: 'gzip',
                    test: /\.(js|json|jpeg|png|mp4|svg|css)$/,
                    minRatio: Number.MAX_SAFE_INTEGER,
                }),
                new CompressionPlugin({
                    filename: '[path][base].br',
                    algorithm: 'brotliCompress',
                    test: /\.(js|json|jpeg|png|mp4|svg|css)$/,
                    compressionOptions: {
                        params: {
                            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
                        },
                    },
                    minRatio: Number.MAX_SAFE_INTEGER,
                }),
            ],
        },
        devServer: {
            allowedHosts: 'all',
            historyApiFallback: true,
        },
    };
};
