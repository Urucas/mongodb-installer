import OSXInstaller from './OSXInstaller.js';
export default class Installer{
  constructor(platform) {
    console.log(platform);
    if(platform == 'darwin') return new OSXInstaller();
  }
}
