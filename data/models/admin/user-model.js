module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userId: {
            type: DataTypes.STRING,
            primaryKey: true,
            validate: {
                len: {
                    args: [2, 25],
                    msg: 'User id must have minimum 3 and maximum 8 characters'
                }
            }
        },
        password: DataTypes.STRING,
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 50]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 50]
            }
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        createdAt : DataTypes.DATE,
        updatedAt : DataTypes.DATE,
    },{
        hooks: {
            beforeValidate : (user)=> {
                console.log('Before Validate : ', JSON.stringify(user));
            },
            afterValidate : (user) => {
                console.log('After Validate : ', JSON.stringify(user));
            },
            beforeCreate : (user) => {
                console.log('Before Create : ', JSON.stringify(user));
            },
            afterCreate : (user) => {
                console.log('After Create : ', JSON.stringify(user));
            }
        }
    });

    
    User.associate = (models) => {
        models.User.belongsToMany(models.Role, {
            as : 'roles',
            through: 'UserRoles',
            foreignKey: 'userId'
        });
    };
    return User;
};