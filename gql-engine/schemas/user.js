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
    type Mutation {
        createUser(userId: String!, firstName: String!, lastName: String) : User
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
const createUserMutation = (source, args, { repository })  => {
    debugger;
    return getUser('bkatoch1');
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
        createUser: createUserMutation
    }
};

module.exports = {
    typeDefs,
    resolvers
};