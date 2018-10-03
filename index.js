const {
    ApolloServer,
    gql
} = require('apollo-server');
const {
    makeExecutableSchema,
    mergeSchemas
} = require('graphql-tools');
const db = require('./data/db');


const typeDefs = gql`
    type User {
        userId : String!
        firstName : String!
        lastName : String
        password : String
        isActive : Boolean
        roles : [Role]
    }
    type Role {
        id : Int!
        name : String!
        isAdmin : Boolean
        isActive : Boolean
    }
    type UserRole {
        user : User!
        role : Role
    }
    type Query {
        getUser(userId: String) : User
        role : Role
    }
`;



const resolvers = {
    Query: {
        getUser: (source, args, context, info) => {
            const x = db.collection('users').get('userId', args.userId)[0];
            return x;
        },

        role: () => db.collection('roles').get('id', 1)[0]
    },
    User: {
        roles: (parent, args, context, info) => {
            const userRoles = db.collection('userRoles').get('userId', parent.userId);
            if (userRoles.length) {
                const roleIds = userRoles.map(x => x.roleId);
                const roles = db.collection('roles').getMany('id', roleIds);
                return roles;
            } else {
                return [];
            }
        }
    }
};


const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});


const server = new ApolloServer({
    schema
});
server.listen().then(({
    url
}) => {
    console.log(`🚀  Server ready at ${url}`);
});