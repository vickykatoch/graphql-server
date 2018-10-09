const {
    gql
} = require('apollo-server');
const pubsub = require('./pub-sub');
const USER_ADDED = "USER_ADDED";

const typeDefs = gql`
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
    input UserFilterInput {
        userId : String
        firstName : String
        lastName : String
        isActive : Boolean        
    }
    extend type Query {
        user(userId: String!) : User
        users(filter: UserFilterInput) : [User]!
    }
    type Mutation {
        createUser(user: UserInput!) : User
        updateUser(user: UserInput!) : User
        deleteUser(userId: String!) : Boolean
    }
    type Subscription {
		userAdded: User
	}
`;

const getUser = async (source, args, { repository }, info) => {   
    const user = await repository.collection('users').fetchEntityById(args.userId);
    return user;
};
const getAllUsers = async (source, args, { repository }, info) => {
    const users = await repository.collection('users').fetchAllEntities(args.filter);
    return users;
};
const createUserMutation = async (source, { user }, { repository }) => {
    const createdUser = await repository.collection('users').addEntity(user);
    pubsub.publish(USER_ADDED, { userAdded: createdUser });
    return createdUser;
};
const updateUserMutation = async (source, { user }, { repository }) => {
    const updatedUser = await repository.collection('users').updateEntity(user);
    return updatedUser;
};
const deleteUserMutation = async (source, { userId }, { repository }) => {
    const deletedUser = await repository.collection('users').removeEntity(userId);
    return !(!deletedUser);
};
const userAdded = {
    resolve: ({ userAdded }) => {
        return userAdded;
    },
    subscribe: () => {
        return pubsub.asyncIterator([USER_ADDED]);
    }
};
const resolvers = {
    Query: {
        user: getUser,
        users: getAllUsers
    },
    User: {
        roles: (source) => {
            return source.roles;
        },
        createdAt: (source) => {
            return source.createdAt.toISOString();
        },
        updatedAt: (source) => {
            return source.createdAt.toISOString();
        }
    },
    Mutation: {
        createUser: createUserMutation,
        updateUser: updateUserMutation,
        deleteUser: deleteUserMutation
    },
    Subscription: {
        userAdded
    },
};

module.exports = {
    typeDefs,
    resolvers
};