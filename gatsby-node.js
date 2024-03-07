

const webpack = require('webpack');
const stream = require('stream');
const Emitter = require('emitter');  

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, '');
      }),
    ],
    resolve: {
      fallback: {
        "stream": require.resolve("stream-browserify"), // Use stream-browserify as a polyfill
        "emitter": require.resolve("emitter"), 
      },
    },
  });
}
