const {
    gql
} = require('apollo-server');
const {
    makeExecutableSchema
} = require('graphql-tools');
const userSchema = require('./user');
const roleSchema = require('./role');
const userRoleSchema = require('./user-role');

const baseQuery = gql`
    type Query {
        _empty: String
    }
`;
const typeDefs = [baseQuery, userSchema.typeDefs, roleSchema.typeDefs, userRoleSchema.typeDefs];
// const resolvers = Object.assign({}, userSchema.resolvers, roleSchema.resolvers);

const resolvers = {
    Query: {
        getUser: (source, args, {repository}, info) => await repository.collection('users').getSingle('userId',args.userId),
        getAllUsers: (source, args, {repository}, info) => repository.collection('users').getAll(),
        getRole: (source, args, {repository}, info) => repository.collection('roles').getSingle('id',args.id),
        getAllRoles: (source, args, {repository}, info) => repository.collection('roles').getAll()
    },
    User : {
        roles : (source, args, {repository}, info) => {
            const userRoles = repository.collection('userRoles').get('userId',source.userId);
            const ids = userRoles.map(x=> x.roleId);
            const roles = repository.collection('roles').getMany('id',ids);
            return roles;
        }
    }
};


const schema = makeExecutableSchema({
    typeDefs,
    resolvers 
});

module.exports = schema;