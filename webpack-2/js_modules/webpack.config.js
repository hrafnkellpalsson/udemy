// Webpack doesn't operate on its own config file. We must use require here rather than import.
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: 'build/' // This property is used by any loader that provides a direct file path reference to a file in our output directory.
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/
      },
      {
        loader: ExtractTextPlugin.extract({ // loader: is the legacy keyword for use:
          loader: 'css-loader'
        }),
        // use: ['style-loader', 'css-loader'], // Loaders are applied right to left. We must run css-loader before style-loader. Using these loaders causes the CSS to end up a raw string in the bundle.js which then injects that string into the <style> element of the DOM. The css will not end up in the html file itself, it's just injected into the DOM.
        test: /\.css$/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 40000 }
          },
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
};

module.exports = config;
