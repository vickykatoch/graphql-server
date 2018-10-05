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
        updatedAt : String
        roles : [Role]
    } 
    extend type Query {
        getUser(userId: String) : User
        getAllUsers : [User]!
    }
`;

const getUser = async (source, args, { repository }, info) => {
    const user = await repository.collection('users').fetchEntityById(args.userId);
    return user;
};
const getAllUsers = async (source, args, { repository }, info) => {
    const users = await repository.collection('users').fetchAllEntities();
    return users;
};

const resolvers = {
    Query: {
        getUser,
        getAllUsers
    },
    User: {
        roles: (source) => {
            return source.roles;
        },
        createdAt : (source) => {
            return source.createdAt.toISOString();
        },
        updatedAt : (source) => {
            return source.createdAt.toISOString();
        }
    }
};

module.exports = {
    typeDefs,
    resolvers
};