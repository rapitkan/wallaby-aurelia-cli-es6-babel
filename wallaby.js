module.exports = function(wallaby) {
  return {
    files: [
      'src/**/*.js',
      'src/**/*.html',
      'test/**/*.js',
      '!test/unit/**/*.spec.js'
    ],

    tests: ['test/unit/**/*.spec.js'],

    env: {
      type: 'node'
    },

    testFramework: 'jasmine',

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    setup: function(w) {
      w.testFramework.DEFAULT_TIMEOUT_INTERVAL = 500;
      require('aurelia-polyfills');
      require('aurelia-loader-nodejs').Options.relativeToDir = require('path').join(w.projectCacheDir, 'src');
      require('aurelia-pal-nodejs').globalize();
    }
  };
};
