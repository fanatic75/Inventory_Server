const db = require('_helpers/db');
const roles = require('../_helpers/roles');
const User = db.User;


async function isAdmin(user) {
        if (user&&user.role === roles.Admin) {
            const currUser = await User.findById(user.sub);
            if (currUser && currUser.role === roles.Admin)
                return true;
            else
                return false;
        } else {
            return false;
        }
    }


        module.exports = {
            isAdmin,
        }