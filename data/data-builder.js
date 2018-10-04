module.exports = (db) => {
    db.Role.create({ name: 'Administrator', isAdmin: true, isActive: true });
    db.Role.create({ name: 'Super User', isAdmin: false, isActive: true });
    db.Role.create({ name: 'Normal User', isAdmin: false, isActive: true });
    db.Role.create({ name: 'Swap User', isAdmin: false, isActive: true });
    db.Role.create({ name: 'Rates User', isAdmin: false, isActive: true });
    db.Role.create({ name: 'Credit User', isAdmin: false, isActive: true });
    db.Role.create({ name: 'SPG User', isAdmin: false, isActive: true });

    db.User.create({ userId: 'bk1', password: '45325', name: 'Balwinder Katoch' }).then((user) => {
        user.setRoles(1)
    });

    db.User.create({ userId: 'ak1', password: '45325', name: 'Aryan Katoch' })
        .then(user => {
            user.setRoles([1, 2]);
        });
    db.Resource.create({
        name: 'Market Watch',
        type: 'APP',
        isActive: true
    }).then(res => {
        res.setRoles([1, 2]);
    });
    db.Resource.create({
        name: 'Market Ladder',
        type: 'APP',
        isActive: true
    });
    db.Resource.create({
        name: 'Order Blotter',
        type: 'APP',
        isActive: true
    }).then(res => {
        // db.Role
        //     .find(1)
        //     .then(role => {
        //         console.log(role);
        //         // res.setRoles(role, { through: { permissions: 10 } });
        //     });
        res.setRoles([1]);
    });
};