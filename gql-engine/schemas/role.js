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
        role(id: Int!) : Role
        roles(name: String) : [Role]!
    }
`;

const getRole = async (source, args, { repository }, info) => {
    const collection = repository.collection('roles');
    const role = await collection.fetchEntityById(args.id);
    return role;
};
const getAllRoles = async (source, args, { repository }, info) => {
    const collection = repository.collection('roles');
    const roles = await collection.fetchAllEntities(args.name);
    return roles;
};


const resolvers = {
    Query: {
        role : getRole,
        roles : getAllRoles
    },
    Role: {
        users : (source) => {             
            return source.users;
        },
        resources : (source) => {
            return source.resources ? source.resources : [];
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