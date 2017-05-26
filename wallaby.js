let wallabyWebpack = require('wallaby-webpack');
let wallabyPostprocessor = wallabyWebpack({
  entryPatterns: ['test/unit/setup.js', 'test/unit/**/*.spec.js']
});

module.exports = function(wallaby) {
  return {
    files: [
      {pattern: 'src/**/*.js', load: false},
      {pattern: 'test/stubs/**/*.js', load: false},
      {pattern: 'test/unit/setup.js', load: false}
    ],

    tests: [
      {pattern: 'test/unit/**/*.spec.js', load: false}
    ],

    env: {
      kind: 'electron'
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    postprocessor: wallabyPostprocessor,

    setup: function() {
      window.__moduleBundler.loadTests();
    }
  };
};
