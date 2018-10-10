const {
    gql
} = require('apollo-server');


const typeDefs = gql`
    type Resource {
        id : Int!
        name : String!
        type : String!
        isActive : Boolean
        createdAt : String
        updatedAt : String 
        roles : [Role] 
        permissions: Int      
    } 
    extend type Query {
        getResource(id: Int!) : Resource
        getAllResources : [Resource]!
    }
`;

const getResource = async (source, args, { repository }, info) => {
    const resource = await repository.collection('resources').fetchEntityById(args.id);
    return resource;
};
const getAllResources = async (source, args, { repository }, info) => {
    const resources = await repository.collection('resources').fetchAllEntities();
    return resources;
};

const resolvers = {
    Query: {
        getResource,
        getAllResources
    },
    Resource: {
        roles : (source) => {
            return source.roles;
        },
        permissions: (source) => {
            return source.acl.permissions;
        },
        createdAt: (source) => {
            return source.createdAt.toISOString();
        },
        updatedAt: (source) => {
            return source.createdAt.toISOString();
        }
    }
};

module.exports = {
    typeDefs,
    resolvers
};