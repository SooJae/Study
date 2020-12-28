// webpack.config.js
// `webpack` command will pick up this config setup by default
var path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'none',
  output: {
    filename: '[chunkhash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use:['css-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};
