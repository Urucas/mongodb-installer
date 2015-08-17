var minimist = require('minimist');
var argv = minimist(process.argv.slice(2));
var spawn = require('child_process').spawnSync;
// remove mongodb source folders
spawn('rm', ['-rf', './mongodb-osx-x86_64-3.0.5']);
spawn('rm', ['-rf', './mongodb']);
spawn('rm', ['-rf', './data']);
if(argv["full-reset"]) {
  // remove mongodb downloaded tgz
  spawn('rm', ['-rf', './mongodb-osx-x86_64-3.0.5.tgz']);
}
