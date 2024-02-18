import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyPlugin from "copy-webpack-plugin";

const webpackCommon = {
    entry: './src/js/index.js',
    plugins:
    [
        new HtmlWebpackPlugin({
            favicon: 'src/favicon.png',
            meta: {
                'viewport': 'width=device-width, user-scalable=no, minimum-scale=1, maximum-scale=1'
            },
            title: 'PlayCanvas Webpack Example',
            minify: true
        }),
        new CopyPlugin({
            patterns: [
                { from: "assets/fonts", to: "fonts" },
                { from: "assets/atlas", to: "atlas" },
                { from: "assets/icons", to: "icons" },
            ],
        }),
    ],
    module:
    {
        rules:
        [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/, // Regular expression to match all .js files
                exclude: /node_modules/, // Exclude the node_modules directory
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'], // Use the preset-env Babel preset
                  },
                },
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        // options: {
                        //     outputPath: 'assets/',
                        //     publicPath: 'assets/',
                        //     name: '[name].[ext]', // Keep the original file name and extension
                        // },
                    },
                ],
            },
            // {
            //     test: /\.json$/,
            //     loader: 'json-loader'
            // }
        ]
    }
}

export default webpackCommon;
