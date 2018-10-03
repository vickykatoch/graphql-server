const {
    gql
} = require('apollo-server');


const schema = gql`
    type User {
        userId : String
        fulleName : String
        password : String
        isActive : Boolean
    }

    type Query {
        user: [User]
    }
`;

const resolvers = {
    Query: {
        user: () => {
            return {
                userId : 'bkatoch',
                fulleName : 'Balwinder Katoch',
                password : '',
                isActive: true
            }
        }
    }
};

module.exports = {
    schema,
    resolvers
};