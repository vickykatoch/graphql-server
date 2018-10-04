const {
    ApolloServer,
    gql
} = require('apollo-server');
const {
    makeExecutableSchema,
    mergeSchemas
} = require('graphql-tools');
const db = require('./data');
const schema = require('./gql-engine/schemas/index');

const serverInitializer = (db) => {
    const server = new ApolloServer({
        schema,
        context: {
            repository: db
        }
    });
    server.listen().then(({
        url
    }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
};


db.sequelize.sync({
    logging: console.log,
    force: true
}).then(() => {
    console.log('Database connection established successfully');
    require('./data/data-builder')(db);
    serverInitializer(db);
}).catch(console.error);

