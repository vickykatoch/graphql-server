const user = require('./user');

const buildRepoMap = (db) => {
    const repoMap = new Map();
    repoMap.set('users', user(db));
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