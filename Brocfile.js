/* global require, module */

var uglifyJavaScript = require('broccoli-uglify-js');
var compileES6 = require('broccoli-es6-concatenator');
var p = require('ember-cli/lib/preprocessors');
var pickFiles = require('broccoli-static-compiler');
var env = require('broccoli-env').getEnv();

var preprocessCss = p.preprocessCss;
var preprocessTemplates = p.preprocessTemplates;
var preprocessJs = p.preprocessJs;

module.exports = function (broccoli) {
  var app = broccoli.makeTree('app');
  var tests = broccoli.makeTree('tests');
  var publicFiles = broccoli.makeTree('public');
  var vendor = broccoli.makeTree('vendor');
  var config = broccoli.makeTree('config');
  var styles;

  app = pickFiles(app, {
    srcDir: '/',
    destDir: 'safe-tube/'
  });

  app = preprocessTemplates(app);

  config = pickFiles(config, {
    srcDir: '/',
    files: ['environment.*', 'environments/' + env + '.*'],
    destDir: 'safe-tube/config'
  });

  tests = pickFiles(tests, {
    srcDir: '/',
    destDir: 'safe-tube/tests'
  });

  tests = preprocessTemplates(tests);

  var sourceTrees = [
    app,
    config,
    vendor
  ];

  if (env !== 'production') {
    //sourceTrees.push(tests);
  }

  sourceTrees = sourceTrees.concat(broccoli.bowerTrees());

  var appAndDependencies = new broccoli.MergedTree(sourceTrees);

  appAndDependencies = preprocessJs(appAndDependencies, '/', 'emblem-app');

  var applicationJs = compileES6(appAndDependencies, {
    loaderFile: 'loader.js',
    ignoredModules: [
      'ember/resolver'
    ],
    inputFiles: [
      'safe-tube/**/*.js'
    ],
    legacyFilesToAppend: [
      'safe-tube/config/environment.js',
      'safe-tube/config/environments/' + env + '.js',
      'jquery.js',
      'handlebars.js',
      'ember.js',
      'ic-ajax/main.js',
      'ember-data.js',
      'ember-resolver.js',
      'jquery.inview.js',
      'holder.js',
      'video.js',
      'vjs.youtube.js'
    ],

    wrapInEval: env !== 'production',
    outputFile: '/assets/app.js'
  });

  styles = preprocessCss(sourceTrees, 'safe-tube/styles', '/assets');

  if (env === 'production') {
    applicationJs = uglifyJavaScript(applicationJs, {
      mangle: false,
      compress: false
    });
  }

  return [
    applicationJs,
    publicFiles,
    styles
  ];
};
