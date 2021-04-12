const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
let mode = "development";
// Target is quick fix for webpack 5 because hotreload have have currently bug
let target = "web";

if(process.env.NODE_ENV === "production") {
    mode = "production";
    target = "browserslist";
}

module.exports = {
    mode: mode,
    target: target,
    entry: "./src/index.js",

    output: {
      // this places all images processed in an image folder
      assetModuleFilename: "images/[hash][ext][query]",
    },

    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                   {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: "" },
                   },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset",
              },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
              { from: "src/images", to: "images" },
            ],
          }),
    ],

    // options (false - display unminified version)
    devtool: "source-map",
    devServer: {
        contentBase: "./dist",
        hot: true
    }
}