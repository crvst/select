import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import cssnext from 'postcss-cssnext';

const host = 'localhost';
const port = 9999;

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const plugins = {
  extractCSS: new ExtractTextPlugin(
    '[name].css', {
      allChunks: true,
      disable: process.env.NODE_ENV === 'development'
    }
  ),
  uglify: new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    mangle: false
  })
};

export default [
  {
    context: __dirname,

    resolve: {
      extensions: ['', '.js', '.jsx', '.css', '.styl']
    },

    entry: {
      index: ['./src/', './src/assets/styles']
    },

    output: {
      hash: true,
      path: `${__dirname}/public/`,
      pathinfo: true,
      publicPath: '',
      filename: '[name].min.js'
    },

    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          exclude: /node_modules/
        }, {
          test: /\.styl$/,
          loader: ExtractTextPlugin.extract('style', 'css?minimize!postcss!stylus?resolve url')
        },
        {
          test: /.*\.(gif|png|jpe?g|svg)$/i,
          loaders: [
            'file?hash=sha512&digest=hex&name=[name]-[hash].[ext]',
            'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
          ]
        }
      ]
    },

    stylus: {
      use: [
        require('nib')(),
        require('rupture')()
      ],
      'import': [
        '~nib/lib/nib/index.styl',
        '~rupture/rupture/index.styl'
      ]
    },

    postcss() {
      return [autoprefixer, cssnext];
    },

    plugins: [
      plugins.extractCSS,
      plugins.uglify
    ],

    devServer: {
      host,
      port,
      contentBase: `${__dirname}/public/`,
      hot: true
    }
  }
];
