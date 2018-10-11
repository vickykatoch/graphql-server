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
    
    input UserFilterInput {
        userId : String
        firstName : String
        lastName : String
        isActive : Boolean        
    }
    input UserCreateUpdateInput {
        userId : String!
        firstName : String
        lastName : String
        isActive : Boolean
        roles : [Int]
    }
    extend type Query {
        user(userId: String!) : User
        users(filter: UserFilterInput) : [User]!
    }
    type Mutation {
        saveUser(user: UserCreateUpdateInput!) : User
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

const saveUserMutation = async (source, { user }, { repository }) => {
    const savedUser = await repository.collection('users').updateEntity(user);
    return savedUser;
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
        saveUser: saveUserMutation,
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