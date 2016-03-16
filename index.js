const exec = require('child_process').exec;
const webpack = require('webpack');

const compiler = webpack({
  entry: './test/entry'
});

compiler.watch({
  aggregateTimeout: 300
}, (err, stats) => {
  exec('node test/entry.js',
    (error, stdout, stderr) => {
      if (stdout) console.log(stdout);
      if (stderr) console.log(stderr);
      if (error !== null) console.log(`exec error: ${error}`);
  });
});

