const users = [{
    "userId": "bk1",
    "firstName": "Balwinder",
    "lastName": "Katoch",
    "password": "pwd",
    "isActive": true
}, {
    "userId": "bk2",
    "firstName": "Balwinder2",
    "lastName": "Katoch2",
    "password": "pwd",
    "isActive": true
}, {
    "userId": "bk3",
    "firstName": "Balwinder3",
    "lastName": "Katoch3",
    "password": "pwd",
    "isActive": false
}];
const roles = [{
    id: 1,
    name: 'Administrator',
    isAdmin: true,
    isActive: true
}, {
    id: 2,
    name: 'Supervisor',
    isAdmin: false,
    isActive: true
}, {
    id: 3,
    name: 'Normal User',
    isAdmin: false,
    isActive: true
}];

const userRoles = [{
    userId : "bk1",
    roleId : 1
},{
    userId : "bk1",
    roleId : 2
},{
    userId : "bk2",
    roleId : 3
},{
    userId : "bk3",
    roleId : 3
}];

module.exports = {
    users,
    roles,
    userRoles
}