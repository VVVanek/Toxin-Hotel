const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV === 'development';

const pagesDir = './src/pages';

const createEntriesFromPageList = (pages) => {
   const webpackPageEntries = {};
   const htmlWebpackPageInstances = [];

   pages.forEach((pageName) => {
      webpackPageEntries[pageName] = `${pagesDir}/${pageName}/${pageName}.js`;
      htmlWebpackPageInstances.push(
         new HtmlWebpackPlugin({
            filename: `${pageName}.html`,
            template: `${pagesDir}/${pageName}/${pageName}.pug`,
            chunks: [pageName]
         })
      );
   });

   return [webpackPageEntries, htmlWebpackPageInstances];
};

const [webpackPageEntries, htmlWebpackPageInstances] = createEntriesFromPageList(
   fs.readdirSync(pagesDir)
);

module.exports = {
   entry: {
      ...webpackPageEntries,
   },
   output: {
      filename: devMode ? '[name].js' : '[name].[hash].js',
      path: path.resolve(__dirname, './dist')
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: '[name].[contenthash].css'
      }),
      new webpack.ProvidePlugin({
         $: 'jquery',
         jQuery: 'jquery',
         'window.jQuery': 'jquery'
      }),
      ...htmlWebpackPageInstances
   ],
   module: {
      rules: [
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
         {
            test: /\.pug$/,
            loader: 'pug-loader',
            options: {
               pretty: true
            }
         },
         {
            test: /\.(sa|sc|c)ss$/,
            use: [
               {
                  loader: MiniCssExtractPlugin.loader
               },
               { loader: 'css-loader', options: {} },
               { loader: 'postcss-loader', options: { sourceMap: true } },
               {
                  loader: 'resolve-url-loader',
                  options: {
                     debug: true,
                     sourceMap: false,
                     removeCR: true
                  }
               },
               {
                  loader: 'sass-loader',
                  options: {
                     sourceMap: true
                  }
               }
            ]
         },
         {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            exclude: [
               path.resolve(__dirname, './src/assets/img/'),
               path.resolve(__dirname, './src/components/')
            ],
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     name: '[name].[ext]',
                     outputPath: 'fonts/'
                  }
               }
            ]
         },
         {
            test: /\.(png|gif|svg|jpe?g)$/,
            exclude: [
               path.resolve(__dirname, './src/assets/fonts'),
               path.resolve(__dirname, './src/assets/favicons/')
            ],
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     name: '[name].[ext]',
                     outputPath: 'img/'
                  }
               }
            ]
         }
      ]
   },
   devServer: {
      port: 'auto',
      hot: true,
      compress: true,
      open: true,
      static: {
         directory: './src',
         watch: true,
      },
   },
}