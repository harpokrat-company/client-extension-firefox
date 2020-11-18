const path = require('path');

module.exports = {
  entry: './background/api.js',
  mode: 'development',
  target: 'web',
  output: {
    filename: 'api.bundled.js',
    path: path.resolve(__dirname, 'background'),
  },
  optimization: {
    minimize: false
  },
};
