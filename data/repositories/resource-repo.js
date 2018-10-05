module.exports = (db) => {

    //#region ASSOCIATION INCLUDES
    const roleIncludes = {
        model: db.Role,
        as: 'roles',
        through: {
            attributes: []
        }
    };
    //#endregion

    const fetchEntityById = (id) => {
        return db.Resource.findById(id, {
            include: [roleIncludes]
        });
    };
    const fetchAllEntities = () => {
        return db.Resource.findAll({
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