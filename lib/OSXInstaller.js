import Installer from './Installer.js';
import child_process from 'child_process';
import glue from 'glue-path';
import fs from 'fs';
import mkdirp from 'mkdirp';

export default class OSXInstaller extends Installer {
  
  download() {
    let logger = this.logger;
    let self = this;
    // download mongodb from the site
    return new Promise( (resolve, reject) => {
      let child = child_process.spawn;
      self.filename = 'mongodb-osx-x86_64-3.0.5.tgz';
      
      logger.log("Checking file hasnt already been downloaded");
      let filepath = glue([process.cwd(), self.filename]);
      if(self.check_tar_file_exists(filepath)) {
        logger.log("File already download, continue to install");
        return resolve();
      }else {
        let params = [
          '-O',
          'https://fastdl.mongodb.org/osx/'+self.filename
        ];
        logger.log("Downloading mongodb source, sit... this may take a while!");
        let curl = child('curl', params, {stdio:'inherit'});
        curl.on('close', () => {
          // check file has been download
          if(self.check_tar_file_exists(filepath)) {
            logger.ok("Mongodb source downloaded");
            return resolve();
          }
          reject("Error checking downloaded file", filepath);
        });
        curl.on('error', (err) => {
          curl.kill('SIGHUP');
          return reject(err);
        });
      }
    });
  }
 
  check_tar_file_exists(path) {
    // check if tar has already been download
    try {
      let err = fs.accessSync(path, fs.R_OK);
      if(!err) {
        return true;
      }
    }catch(e){}
    return false;
  }

  install() {
    
    let self = this;
    let logger = self.logger;
    // untar
    let filename = self.filename;
    let filePath = glue([process.cwd(), filename]);
    let params = ["-zxvf", filePath];
    let child = child_process.spawnSync
    let output = child('tar', params);
    
    self.filename = self.filename.replace(/\.tgz$/,'');
    let path = glue([process.cwd(), self.filename, 'bin']);
    try {
      let err = fs.accessSync(path, fs.R_OK);
      if(err != null) return [err];
    }catch(e) {
      return [e];
    }
    logger.ok("Mongodb source uncompressed succesfully");
    
    // create final dir
    let finalPath = glue([process.cwd(), 'mongodb']);
    try {
      mkdirp(finalPath);
    }catch(e) {
      logger.fail("Error trying to create mongodb fianl directory," + finalPath);
      return [e];
    }
    
    // copy files
    params = ['-R', '-n', path, finalPath];
    output = child('cp', params);
    if(output.stderr && output.stderr.toString() != "") {
      return [stderr];
    }
    logger.ok("Mongodb binaries copied to local directory");
    
    return [null, glue([finalPath, 'bin', 'mongod'])];
  }
}
