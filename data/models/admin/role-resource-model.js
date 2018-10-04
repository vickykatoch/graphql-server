module.exports = (sequelize, DataTypes) => {
    const RoleResource = sequelize.define('RoleResource', {
        permissions: {
            type: DataTypes.INTEGER,
            defaultValue : 0
        }  
    });
    return RoleResource;
};
