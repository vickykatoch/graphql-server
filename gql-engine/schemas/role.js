const {
    gql
} = require('apollo-server');


const typeDefs = gql`
    type Role {
        id : Int!
        name : String!
        isAdmin : Boolean
        isActive : Boolean
        createdAt : String
        updatedAt : String
        resources : [Resource]
        users : [User]
    }
    extend type Query {
        getRole(id: Int!) : Role
        getAllRoles : [Role]!
    }
`;

const getRole = async (source, args, { repository }, info) => {
    const collection = repository.collection('roles');
    const role = await collection.fetchEntityById(args.id);
    return role;
};
const getAllRoles = async (source, args, { repository }, info) => {
    const collection = repository.collection('roles');
    const role = await collection.fetchAllEntities();
    return role;
};


const resolvers = {
    Query: {
        getRole,
        getAllRoles
    },
    Role: {
        users : (source) => {             
            return source.users;
        },
        resources : (source) => {
            return source.resources;
        },
        createdAt: (source) => {
            return source.createdAt.toISOString();
        },
        updatedAt: (source) => {
            return source.createdAt.toISOString();
        }
    }
};

module.exports = {
    typeDefs,
    resolvers
};