import OSXInstaller from './OSXInstaller.js';
export default class PlatformInstaller {
  
  constructor(platform, dbpath) {
    if(platform != 'darwin')
      throw new Error("Platform not supported");
    
    console.log("Creating OSXInstaller instance");
    return new OSXInstaller(dbpath);
  }
}
