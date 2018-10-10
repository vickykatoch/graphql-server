module.exports = (db) => {

    //#region ASSOCIATION INCLUDES
    const userIncludes = {
        model: db.User,
        as: 'users',
        through: {
            attributes: []
        }
    };
    const resourceInclude = {
        model: db.Resource,
        as: 'resources',
        through: {
            as: 'acl',
            attributes: ['permissions']
        }
    };
    //#endregion

    const fetchEntityById = (id) => {
        return db.Role.findById(id, {
            include: [userIncludes, resourceInclude]
        });
    };
    const fetchAllEntities = (name) => {
        const filter = name ? {
                name: {
                    [db.Sequelize.Op.like]: `${name}%`
                }
        } : undefined;

        return db.Role.findAll({
            include: [userIncludes, resourceInclude],
            where : filter
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