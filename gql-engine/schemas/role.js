const {
    gql
} = require('apollo-server');
const db = require('../../data/db');


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
        getRole: (source, args, context, info) => {
            return db.collection('roles').get('id',args.id)[0];
        }
    }
};

module.exports = {
    typeDefs,
    resolvers
};