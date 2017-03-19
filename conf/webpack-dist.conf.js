const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FailPlugin = require('webpack-fail-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('../package.json');
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    loaders: [
      {
        test: /.json$/,
        loaders: [
          'json-loader'
        ]
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ]
      },
      {
        test: /.vue$/,
        loaders: [
          'vue-loader'
        ]
      },
      {
        test: /.png$/,
        loaders: [
          'file-loader'
        ]
      },
      {
        test: /.(otf|ttf|eot|svg|woff)/,
        loaders: [
          'file-loader'
        ]
      },
      {
        test: /.map$/,
        loaders: [
          'file-loader'
        ]
      },
      {
        test: /channel.html$/,
        loaders: [
          'file-loader?name=[name].[ext]&context=.'
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    FailPlugin,
    new HtmlWebpackPlugin({
      template: conf.path.src('index.html')
    }),/**
    new webpack.optimize.UglifyJsPlugin({
      compress: {unused: true, dead_code: true, warnings: false} // eslint-disable-line camelcase
    }),**/
    new ExtractTextPlugin('index-[contenthash].css'),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer]
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      "process.env.APP_ID": "'227102'",
      "process.env.SERVER_DOMAIN": "'api.blindtest.imperialcoloc.ovh'",
    })

  ],
  output: {
    path: path.join(process.cwd(), conf.paths.dist),
    filename: '[name]-[hash].js'
  },
  entry: {
    app: [
      `./${conf.path.src('index')}`,
      `./${conf.path.src('channel.html')}`
    ],
    vendor: Object.keys(pkg.dependencies)
  },
  node: {
    fs: "empty"
  }
};
