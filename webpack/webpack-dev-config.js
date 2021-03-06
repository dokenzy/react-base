import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { symbols, color } from '../src/base/shared/console';

const mainPath = path.resolve(__dirname, '..');
const clientPath = path.resolve(__dirname, '../src/base/client/');

export const devTool = 'eval';

export const context = path.resolve(__dirname, '..' ,'src' , 'app');

export const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new ExtractTextPlugin('bundle.css', { allChunks: true }),
  new webpack.DefinePlugin({'process.env': {'NODE_ENV': '"development"'}}),

  function() {
    this.plugin('done', function(stats) {
      if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1) {
        console.log('[BASE] ' + color('error', symbols.error) + stats.compilation.errors);
      }
    });
  }
];

export const entries = [
  clientPath,
  'webpack/hot/dev-server',
  'webpack-hot-middleware/client'
];

export const loaders = [
  { test: [/\.jsx?$/],loader: 'babel-loader',exclude: /node_modules/,include: mainPath, query: { presets: ['react-hmre', 'es2015', 'stage-0', 'react'] }},
  { test: /\.css$/, loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]-[hash:base64:4]!postcss-loader'}
];

export const postCss = (webpack) =>
  [
    require('postcss-import')({ addDependencyTo: webpack }),
    require('postcss-cssnext')(),
    require('postcss-modules-extract-imports'),
    require('postcss-nested')(),
    require('postcss-reporter')(),
    require('postcss-url')()
  ];
