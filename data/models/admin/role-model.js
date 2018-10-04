module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    Role.associate = (models) => {
        models.Role.belongsToMany(models.User, {
            as : 'users',
            through: 'UserRoles',
            foreignKey: 'roleId',
            sourceKey: 'id'
        });
        models.Role.belongsToMany(models.Resource, {
            as : 'resources',
            through: models.RoleResource,
            foreignKey: 'roleId',
            sourceKey: 'id'
        });
    };
    return Role;
};
