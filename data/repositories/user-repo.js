module.exports = (db) => {
    //#region ASSOCIATION INCLUDES
    const roleIncludes = {
        model: db.Role,
        as: 'roles',
        through: {
            attributes: []
        },
        include: [{
            model: db.Resource,
            as: 'resources',
            through: {
                as: 'acl',
                attributes: ['permissions']
            }
        }]
    };
    //#endregion

    const fetchEntityById = (id) => {
        return db.User.findById(id, {
            include: [roleIncludes]
        });
    };
    const fetchAllEntities = () => {
        return db.User.findAll({
            include: [roleIncludes]
        });
    };
    const fetchCustomEntities = (criteria) => {
        
    };
    const upsertEntity = (user) => {

    };
    const removeEntity = (user) => {

    };

    return {
        fetchEntityById,
        fetchAllEntities,
        fetchCustomEntities,
        upsertEntity,
        removeEntity
    };
};