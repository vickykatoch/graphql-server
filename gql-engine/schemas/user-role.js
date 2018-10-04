const {
    gql
} = require('apollo-server');


const typeDefs = gql`
    type UserRole {
        user : User!
        role : Role
    }
`;


module.exports = {
    typeDefs
};