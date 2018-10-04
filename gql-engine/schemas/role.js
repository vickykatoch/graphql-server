const {
    gql
} = require('apollo-server');


const typeDefs = gql `
    type Role {
        id : Int!
        name : String!
        isAdmin : Boolean
        isActive : Boolean
    }
    extend type Query {
        getRole(id: Int!) : Role
        getAllRoles : [Role]!
    }
`;

const resolvers = {
    Query: {
        getRole: (source, args, {repository}, info) => repository.collection('roles').getSingle('id',args.id),
        getAllRoles: (source, args, {repository}, info) => repository.collection('roles').getAll()
    }
};

module.exports = {
    typeDefs,
    resolvers
};