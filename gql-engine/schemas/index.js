const {
    gql
} = require('apollo-server');
const {
    makeExecutableSchema
} = require('graphql-tools');
const userSchema = require('./user');
const roleSchema = require('./role');
const userRoleSchema = require('./user-role');
const { merge } = require('lodash');

const baseQuery = gql`
    type Query {
        _empty: String
    }
`;
const typeDefs = [baseQuery, userSchema.typeDefs, roleSchema.typeDefs, userRoleSchema.typeDefs];
const resolvers = merge(userSchema.resolvers, roleSchema.resolvers);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports = schema;