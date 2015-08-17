import fs from 'fs';
import glue from 'glue-path';
import mkdirp from 'mkdirp';
import semafor from 'semafor';
export default class Installer {
  
  constructor(dbpath) {
    this.logger = semafor();
    this.dbpath = glue([process.cwd(), dbpath]);
    
    // downloaded filename
    this.filename;
  }

  check_if_db_path_exists(path) {
    try {
      let err = fs.accessSync(path, fs.W_OK);
      if(err == null) return true;
    }catch(e){}
    return false;
  }

  run(cb) {
    let path = this.dbpath;
    let logger = this.logger;
    let self = this;
    
    if(!self.check_if_db_path_exists(path)) {
      mkdirp(path);
      logger.ok("Creating db path");
    }
    logger.ok("Checking db path exists");
    self.download().then( () => {
      let [err, cmd] = self.install();
      if(err) {
        cb(err);
      }
      cb(null, {
        'db' : self.dbpath,
        'cmd' : [cmd, '--dbpath', self.dbpath].join(" ")
      });

    }, (err) => {
      logger.fail(err.toString());
      cb(err);
    });
  }
  
}
