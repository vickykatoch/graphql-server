const {
    gql
} = require('apollo-server');


const typeDefs = gql `
    type User {
        userId : String!
        firstName : String!
        lastName : String
        password : String
        isActive : Boolean
        createdAt : String
        updatedAt: String
        roles : [Role]
    } 
    extend type Query {
        getUser(userId: String) : User
        getAllUsers : [User]!
    }
`;

const getUser = async (source, args, { repository }, info) => {
    const collection = repository.collection('users');
    const user = await collection.fetchEntityById(args.userId);
    return user;
}

const resolvers = {
    Query: {
        getUser,
        getAllUsers: async (source, args, {
            repository
        }, info) => {
            const users = await repository.collection('users').fetchAllEntities();
            return users;
        }
    },
    User: {
        roles: (source, args, { 
            repository
        }, info) => {
            return source.roles;
        },
        createdAt : (source, args, { 
            repository
        }, info) => {
            return source.createdAt.toISOString();
        },
        updatedAt : (source, args, { 
            repository
        }, info) => {
            return source.createdAt.toISOString();
        }
    }
};

module.exports = {
    typeDefs,
    resolvers
};