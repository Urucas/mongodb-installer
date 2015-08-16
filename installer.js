#!/usr/bin/env node
var argv = process.argv.slice(2)
if(argv.indexOf("--help") != -1) {
  console.log([
    "Usage; ",
    " mongodb-installer --dbpath <relative_path_to_db_folder>",
    ].join("\n"))
  process.exit(0)
}

var Installer = require('../node/Installer.js'),
  installer = new Installer();
  intsaller.run();

