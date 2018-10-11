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
    const fetchAllEntities = (filter) => {
        const fltr = filter ? {
            where: { ...filter
            }
        } : undefined;
        return db.User.findAll(fltr, {
            include: [roleIncludes]
        });
    };
    const fetchCustomEntities = (criteria) => {

    };
    const addEntity = (user) => {
        return db.User.create(user);
    };
    const updateEntity = async (user) => {
        let dbUser = await fetchEntityById(user.userId).then(x=> {
            return x;
        }).catch(err=> {
            console.error(err);
        });
        const roles = user.roles;
        delete user.roles;
        if (dbUser) {
            dbUser = await dbUser.update(user);
            const x = await dbUser.setRoles(roles);
            return fetchEntityById(user.userId);
        } else {
            dbUser = await db.User.create(user);
            if(roles && roles.length) {
                const x = await dbUser.setRoles(roles);
            }
            return fetchEntityById(user.userId);
        }
    };
    const removeEntity = async (userId) => {
        const dbUser = await fetchEntityById(userId);
        return dbUser.destroy({
            where: {
                userId: userId
            }
        });
    };

    return {
        fetchEntityById,
        fetchAllEntities,
        fetchCustomEntities,
        addEntity,
        updateEntity,
        removeEntity
    };
};