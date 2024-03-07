const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'node-loader',
        },
      },
    ],
  },


};



exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        "stream": require.resolve("stream-browserify"),
      },
    },
  });
};
/*
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
 resolve: {
    fallback: {
"stream": require.resolve("stream-browserify"),
      "util": false,
    },
*/
