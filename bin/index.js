#!/usr/bin/env node
'use strict';

const exec = require('child_process').exec;
const webpack = require('webpack');
const program = require('commander');

program
  .version('0.0.1')
  .usage('[options] <file ...>')
  .parse(process.argv);

let config;

try {
  config = require(process.cwd() + 'webpack.config.js');
} catch (e) {
  config = {
    entry: process.cwd() + '/'
  };

  if (program.args[0]) {
    config.entry += program.args[0];
  } else {
    config.entry += 'index.js';
  }
}

const compiler = webpack(config);

compiler.watch({
  aggregateTimeout: 300
}, (err, stats) => {
  // TODO: analyze config to decide where bundle.js is
  exec('node bundle.js',
    (error, stdout, stderr) => {
      if (stdout) console.log(stdout);
      if (stderr) console.log(stderr);
      if (error !== null) console.log(`exec error: ${error}`);
  });
});

