const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: 'public/app.css'
})

module.exports = {
  devtool: 'eval',
  entry: [
    './resources/assets/sass/app.scss',
    './resources/assets/scripts/app.js',
    'tether',
  ],
  output: {
    // path: path.resolve(__dirname, 'build'),
    // filename: 'bundle.js'
    filename: 'public/app.js'
  },
  // devServer: {
  //   contentBase: '/app', // Relative directory for base of server
  //   publicPath: '/public', // Live-reload
  //   inline: true,
  //   port: process.env.PORT || 3000, // Port Number
  //   host: 'localhost', // Change to '0.0.0.0' for external facing server
  //   historyApiFallback: true,
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //new ExtractTextPlugin('main.css'),
    extractSass,
    new TransferWebpackPlugin([
      { from: 'client' },
    ])
  ],
  module: {
    rules: [
      // {
      //   test: /\.jsx?$/,
      //   exclude: /node_modules/,
      //   loader: 'babel-loader',
      //   query: {
      //     cacheDirectory: true,
      //   },
      // },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        options: { presets: ['env'] }
      },
      {
        test: /\.(sass|scss)$/,
        loader: extractSass.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?name=images/[name].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      }
    ]
  }
};
