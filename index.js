const {
    ApolloServer,
    gql
} = require('apollo-server');
const {
    makeExecutableSchema,
    mergeSchemas
} = require('graphql-tools');
const db = require('./data/db');
const schema = require('./gql-engine/schemas/index');



const server = new ApolloServer({
    schema,
    context : {
        repository : db
    }
});

server.listen().then(({
    url
}) => {
    console.log(`🚀  Server ready at ${url}`);
});