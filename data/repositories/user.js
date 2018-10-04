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

    const fetchEntityById = async (id) => {
        debugger;
        db.User.findById(id, { include: [roleIncludes] })
        .then(user => {
            return user;
        }).catch(error => {
            throw error;
        });
    };
    const fetchAllEntities = () => {

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