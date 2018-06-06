const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

const extractSass = new ExtractTextPlugin({
  filename: 'app.css'
})

module.exports = {
  devtool: 'eval',
  entry: [
    './resources/assets/sass/app.scss',
    './resources/assets/scripts/app.js',
    'tether',
    'font-awesome/scss/font-awesome.scss',
    'jquery',
    'Popper',
    'bootstrap'
  ],
  output: {
     path: path.resolve(__dirname, 'public'),
    // filename: 'bundle.js'
    filename: 'app.js'
  },
  devServer: {
    contentBase: 'public/', // Relative directory for base of server
    publicPath: '/', // Live-reload
    inline: true,
    port: process.env.PORT || 3000, // Port Number
    host: 'localhost', // Change to '0.0.0.0' for external facing server
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //new ExtractTextPlugin('main.css'),
    extractSass,
    // new TransferWebpackPlugin([
    //   { from: 'client' },
    // ]),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
      'tether': 'tether',
      'Tether': 'tether',
      'window.Tether': 'tether',
      'Popper': ['popper.js', 'default'],
      'window.Tether': 'tether',
      'Alert': 'exports-loader?Alert!bootstrap/js/dist/alert',
      'Button': 'exports-loader?Button!bootstrap/js/dist/button',
      'Carousel': 'exports-loader?Carousel!bootstrap/js/dist/carousel',
      'Collapse': 'exports-loader?Collapse!bootstrap/js/dist/collapse',
      'Dropdown': 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
      'Modal': 'exports-loader?Modal!bootstrap/js/dist/modal',
      'Popover': 'exports-loader?Popover!bootstrap/js/dist/popover',
      'Scrollspy': 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
      'Tab': 'exports-loader?Tab!bootstrap/js/dist/tab',
      'Tooltip': "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      'Util': 'exports-loader?Util!bootstrap/js/dist/util'
    })
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
        test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader']
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
      },
      // {
      //   test: /bootstrap\/dist\/js\/umd\//, use: 'imports-loader?jQuery=jquery'
      // },
      {
        test: /font-awesome\.config\.js/,
        use: [
          { loader: 'style-loader' },
          { loader: 'font-awesome-loader' }
        ]
      }
    ],
    loaders:[
      {test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/, loader: "imports?this=>window"},
      {test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/, loader: "imports?define=>false"}
    ]
  },
  resolve: {
        alias: {
            jquery: "jquery/src/jquery",
            Popper: "popper.js/dist/umd/popper",
            bootstrap: "bootstrap/dist/js/bootstrap"
        }
  }
};
