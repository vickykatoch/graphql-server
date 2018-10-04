const {
    gql
} = require('apollo-server');
const db = require('../../data/db');

const typeDefs = gql`
    type User {
        userId : String!
        firstName : String!
        lastName : String
        password : String
        isActive : Boolean
        roles : [Role]
    } 
    extend type Query {
        getUser(userId: String) : User
        getAllUsers : [User]!
    }
`;

const resolvers = {
    Query: {
        getUser: (source, args, context, info) => {
            const x = db.collection('users').get('userId',args.userId)[0];
            return x;
        }
    },
    User : {
        roles : (source, args, context, info) => {
            const userRoles = db.collection('userRoles').get('userId',source.userId);
            const ids = userRoles.map(x=> x.roleId);
            const roles = db.collection('roles').getMany('id',ids);
            return roles;
        }
    }
};

module.exports = {
    typeDefs,
    resolvers
};