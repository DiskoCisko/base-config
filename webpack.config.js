const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {

  console.log('Goal: ', env.goal); // 'local'
  console.log('Production: ', env.production); // true

  return {
    entry: {
      index: './src/index.js',
      print: './src/print.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Output Management',
      }),
    ],
    output: {
      filename: '[name].[contenthash].main.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: '/',
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      static: './dist',
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          loader: 'babel-loader',
        },
      ],
    },
    optimization: {
      runtimeChunk: 'single',
      moduleIds: 'deterministic',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
  }
};