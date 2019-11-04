const db = require('_helpers/db');
const roles = require('../_helpers/roles');
const User = db.User;


async function isAdmin(id) {
    const user = await User.findById(id);
    if (user && user.role === roles.Admin)
        return true;
    else
        return false;
}


module.exports = {
    isAdmin: isAdmin
}