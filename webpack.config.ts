const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const json = require('json-loader');
require('dotenv').config();

const publicPath = '/puzzle-game/'

const config = {
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: publicPath, 
    chunkFilename: '[name].[contenthash].chunk.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                parser: 'postcss-scss', // Add this to parse SCSS syntax
              },
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('sass'), // Explicitly use Dart Sass
              sassOptions: {
                includePaths: [
                  path.resolve(__dirname, 'src'),
                  path.resolve(__dirname, 'src/styles')
                ]
              },
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        include: path.resolve(__dirname, 'assets/animations'),
        type: 'asset/resource',
        generator: {
          filename: 'assets/animations/[name].[ext]'
        }
      },
      {
        test: /\.json$/,
        exclude: path.resolve(__dirname, 'assets/animations'),
        type: 'javascript/auto',
        use: [
          {
            loader: 'json-loader',
            options: {
              esModule: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[ext]',
              outputPath: 'assets/images/',
              publicPath: `${publicPath}assets/images/`
            }
          }
        ]
      },
      {
        test: /\.(mp3|wav)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/sounds/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/preview.html", to: "." },
        { from: "./src/landing.html", to: "." },
        { 
          from: "node_modules/howler/dist/howler.js",
          to: "vendors/[name].[ext]" 
        },
      ],
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
      'process.env.REACT_APP_SUPABASE_URL': JSON.stringify(process.env.REACT_APP_SUPABASE_URL),
      'process.env.REACT_APP_SUPABASE_ANON_KEY': JSON.stringify(process.env.REACT_APP_SUPABASE_ANON_KEY),
    }),
    
  ],
};

module.exports = config;