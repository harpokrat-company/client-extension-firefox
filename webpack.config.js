const path = require('path');

module.exports = {
  entry: './background/api.js',
  output: {
    filename: 'api.bundled.js',
    path: path.resolve(__dirname, 'background'),
  },
};
