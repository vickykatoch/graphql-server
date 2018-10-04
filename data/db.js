const data = require('./data');

const x = new Array();


const collection = (collectionName) => {
    return {
        getSingle: (fieldName, id) => {
                return Promise((resolve, reject) => {
                    setTimeout(() => {
                        const result = data[collectionName].filter(item => item[fieldName] === id);
                        resolve(result.length ? result[0] : undefined);
                    }, 2000);
                });
            },
            getAll: () => data[collectionName],
            get: (fieldName, id) => data[collectionName].filter(item => item[fieldName] === id),
            getMany: (fieldName, ids) => data[collectionName].filter(item => ids.includes(item[fieldName]))
    };
};

module.exports = {
    collection
};