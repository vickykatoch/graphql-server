const {
    gql
} = require('apollo-server');


const typeDefs = gql`
    type PageInfo {
        current : Number
        total : Number
        size : Number
        isLast: Boolean
    }
`;


module.exports = {
    typeDefs
};