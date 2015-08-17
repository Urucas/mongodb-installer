#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2))
if(argv["help"]) {
  console.log([
    "Usage; ",
    " mongodb-installer --dbpath <relative_path_to_db_folder>",
    ].join("\n"))
  process.exit(0)
}
var PlatformInstaller = require('./dist/PlatformInstaller.js'),
  installer = new PlatformInstaller(process.platform, argv["dbpath"]);
  
  installer.run(function(err, data){
    if(err) {
      console.log(err.toString());
      process.exit(1);
    }
    console.log(data);
  });

