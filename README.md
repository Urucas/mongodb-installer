# mongodb-installer
Download & copy Mongodb binaries to your project, create db directories, gives you the command to start the server

#Usage
```bash
npm install mongodb-installer
```

**CLI**
```bash
mongodb-installer --dbpath <realtive_path_to_data_db>
```

**API**
```javascript
import PlatformInstaller from 'mongodb-installer'
let db_path = "data/db"
let installer = new PlatformInstaller(process.platform, db_path)
  installer.run( (err, data) => {
    console.log(data);
    // { db: '/path/to/my/project/data/db',
    //  cmd: '/path/to/my/project/data/mongodb/bin/mongod --dbpath /path/to/my/project/data//data/db' }
  });
```
