const user = require('./user-repo');
const role = require('./role-repo');
const resource = require('./resource-repo');

const buildRepoMap = (db) => {
    const repoMap = new Map();
    repoMap.set('users', user(db));
    repoMap.set('roles', role(db));
    repoMap.set('resources', resource(db));
    return repoMap;
};

module.exports = (db) => {
    const repoMap = buildRepoMap(db);
    return (entityName) => {
        if(repoMap.has(entityName)) {
            return repoMap.get(entityName);
        }
        throw new Error(`Repository : ${entityName} does not exist`);
    };
};