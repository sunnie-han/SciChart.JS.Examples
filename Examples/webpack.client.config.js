const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const config = require("./config/default");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const filename = ext => `[name].[hash].${ext}`;

module.exports = {
    mode: "production",
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[name]__[local]--[hash:base64:5]"
                            }
                        }
                    },
                    { loader: "sass-loader" }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: "file-loader",
                options: {
                    name: "images/[name].[ext]"
                }
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".css"]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, config.buildConfig.targetDir)
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "src/static/favicon.ico", to: "" },
                { from: "node_modules/scichart/_wasm/scichart2d.data", to: "" },
                { from: "node_modules/scichart/_wasm/scichart2d.wasm", to: "" },
                { from: "node_modules/scichart/_wasm/scichart3d.data", to: "" },
                { from: "node_modules/scichart/_wasm/scichart3d.wasm", to: "" },
                { from: "sitemap.xml", to: "" },
                { from: "robots.txt", to: "" }
            ]
        }),
        new webpack.IgnorePlugin(/(fs)/),
        // new BundleAnalyzerPlugin()
        new MiniCssExtractPlugin({
            filename: filename("styles.css")
        })
    ]
};
