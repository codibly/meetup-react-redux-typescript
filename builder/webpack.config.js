const path = require('path');
const webpack = require('webpack');
const process = require('process');
const fs = require('fs');
const chalk = require('chalk');
const throttle = require('lodash.throttle');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const context = path.resolve(__dirname, '../');
const absolute = (relative) => path.resolve(context, relative);

const config = {
  context: context,
  target: 'web',
  entry: {
    client: './app/entry/client.tsx'
  },

  performance: {
    hints: 'production' === process.env.NODE_ENV ? 'warning' : false
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].[id].[hash].js',
    path: absolute('dist'),
    publicPath: '/'
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'production' === process.env.NODE_ENV ? 'source-map' : 'cheap-module-source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [absolute('src'), absolute('node_modules')],
    alias:{
      'react-icons': absolute('node_modules/react-icons/lib')
    }
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'react-hot-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              silent: true,
              happyPackMode: true
            }
          }
        ]
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          prefix: 'asset/',
          name: 'asset/[name]-[hash].[ext]',
          mimetype: 'image/svg+xml'
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file-loader',
        options: {
          limit: 8192,
          name: 'asset/[name]-[hash].[ext]'
        }
      }
    ]
  },

  plugins: [
    // Provide NODE_ENV variable
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    // Show progress in 1 second throttle
    new webpack.ProgressPlugin(
      throttle(
        (ratio, message) => message ?
          console.log(chalk.green(Math.round(ratio * 100) + '%') + ' ' + chalk.grey(message)) : null,
        1000
      )
    ),
    // Build client HTML file
    new HtmlPlugin({
      template: 'app/template/client.ejs',
      hash: false,
      filename: 'client.html',
      inject: 'body',
      chunks: ['client']
    }),
    // Copy assets
    new CopyPlugin([{
      from: 'app/asset'
    }])
  ]
};

if ('production' === process.env.NODE_ENV) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false,
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      warningsFilter: () => false
    })
  );
}

if ('development' === (process.env.NODE_ENV || 'development')) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NoEmitOnErrorsPlugin());

  Object.keys(config.entry).forEach(key => {
    config.entry[key] = [config.entry[key], 'webpack-hot-middleware/client']
  });
}

module.exports = config;
