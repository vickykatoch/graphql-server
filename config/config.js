const path = require('path');

module.exports = {
    dbType: 'sqlite',
    dbPath : path.join(__dirname,'../data/database/app-database.db'),
    // dbPath : ":memory:",
    port : 5000,
    instances : 4
};