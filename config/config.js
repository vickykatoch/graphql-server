const path = require('path');

module.exports = {
    dbType: 'sqlite',
    dbPath : path.join(__dirname,'../data/database/app-database.db'),
    port : 5000,
    instances : 4
};