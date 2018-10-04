const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const repoFactory = require('./repositories/repo-factory');
const config = require('../config/config');
const db = {};
const modelFiles = [
    './models/admin/user-model.js',
    './models/admin/role-model.js',
    './models/admin/resource-model.js',
    './models/admin/role-resource-model.js',
];

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: config.dbPath,
    operatorsAliases: false
});

modelFiles.forEach(filePath => {
    const model = sequelize.import(path.join(__dirname, filePath));
    db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.collection = repoFactory(db);
module.exports = db




