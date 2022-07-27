const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
   src: path.join(__dirname, '/src'),
   dist: path.join(__dirname, '/dist'),
};

const PAGES_DIR = `${PATHS.src}/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.replace(/\.[^/.]+$/, ''));

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
   mode = 'production';
}

console.log(mode + ' mode');

module.exports = {
   mode: mode,
   entry: {
      index: './src/index.js'
   },
   output: {
      filename: 'js/[name].[contenthash].js',
      clean: true,
   },
   devtool: 'source-map',
   optimization: {
      splitChunks: {
         chunks: 'all',
      },
   },
   plugins: [
      ...PAGES.map(page => new HtmlWebpackPlugin({
         template: `${PAGES_DIR}/${page}/${page}.pug`,
         filename: `./pages/${page}/${page}.html`,
      })),
      new MiniCssExtractPlugin({
         filename: 'styles/[name].[contenthash].css'
      })
   ],
   module: {
      rules: [
         {
            test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
            type: 'asset/resource',
            exclude: [/fonts/],
            generator: {
               filename: 'assets/images/[name][ext]',
            },
         },
         {
            test: /fonts.*\.(woff|woff2|eot|ttf|otf|svg)$/i,
            type: 'asset/resource',
            exclude: [/images/],
            generator: {
               filename: 'assets/fonts/[name][ext]',
            },
         },
         {
            test: /\.html$/i,
            loader: "html-loader",
         },
         {
            test: /\.(sa|sc|c)ss$/,
            use: [
               (mode === 'development') ? "style-loader" :
                  MiniCssExtractPlugin.loader,
               'css-loader',
               {
                  loader: "postcss-loader",
                  options: {
                     postcssOptions: {
                        plugins: [
                           "postcss-preset-env",
                        ],
                     },
                  },
               },
               'sass-loader',
            ],
         },
         {
            test: /\.pug$/,
            loader: 'pug-loader',
            exclude: /(node_modules|bower_components)/,
         },
         {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env']
               }
            }
         },
      ],
   },
   devServer: {
      open: true,
      hot: true,
      port: 'auto',
      static: {
         directory: './dist',
         watch: true,
      },
   },
}