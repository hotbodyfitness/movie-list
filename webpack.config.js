const path = require('path');

module.exports = {
  entry: __dirname + '/client/src/components/Index.jsx',
  module: {
    rules: [{
      // the \. is to escape the . so that it is looking for .js or .jsx
      // the / to start and end is to indicate a RegEx regular expression
      // the () are to encapsulate the OR statement of |
      test: /\.(js|jsx)$/, // shorter filename = .js must be first
      // include: [path.resolve(__dirname, './client/src/components')], // not nessesary
      exclude: /(node_modules)/,
      use: ['babel-loader'] // alternate/specific USE definition below
      // use: {
      //   loader: 'babel-loader',
      //   options: {
      //     presets: ['@babel/preset-env']
      //   }
      // }
    }]
  },
  mode: 'development',
  output: {
    path: __dirname + '/public/dist',
    filename: 'bundle.js'
  }
};