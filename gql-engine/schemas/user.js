const {
    gql
} = require('apollo-server');
const {
    
} = require('graphql-tools');

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
    input UserInput {
        userId : String!
        firstName : String!
        lastName : String
        isActive : Boolean
    }
    extend type Query {
        getUser(userId: String) : User
        getAllUsers : [User]!
    }
    type Mutation {
        createUser(user: UserInput!) : User
        updateUser(user: UserInput!) : User
        deleteUser(userId: String!) : Boolean
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
const createUserMutation = async (source, {user}, { repository })  => {
    const createdUser = await repository.collection('users').addEntity(user);
    return createdUser;
};
const updateUserMutation = async (source, {user}, { repository })  => {
    const updatedUser = await repository.collection('users').updateEntity(user);
    return updatedUser;
};
const deleteUserMutation = async (source, {userId}, { repository })  => {
    const deletedUser = await repository.collection('users').removeEntity(userId);
    return !(!deletedUser);
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
    },
    Mutation : {
        createUser: createUserMutation,
        updateUser : updateUserMutation,
        deleteUser: deleteUserMutation
    }
};

module.exports = {
    typeDefs,
    resolvers
};