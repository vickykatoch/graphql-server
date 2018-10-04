const {
    gql
} = require('apollo-server');


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
        getUser: (source, args, {repository}, info) => repository.collection('users').getSingle('userId',args.userId),
        getAllUsers: (source, args, {repository}, info) => repository.collection('users').getAll()       
    },
    User : {
        roles : (source, args, {repository}, info) => {
            const userRoles = repository.collection('userRoles').get('userId',source.userId);
            const ids = userRoles.map(x=> x.roleId);
            const roles = repository.collection('roles').getMany('id',ids);
            return roles;
        }
    }
};

module.exports = {
    typeDefs,
    resolvers
};