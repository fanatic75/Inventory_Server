const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const roles = require('../_helpers/roles');
const User = db.User;
const Branch = db.Branch;
module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({
    username,
    password
}) {
    const user = await User.findOne({
        username
    });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const {
            hash,
            firstName,
            lastName,
            ...userWithoutHash
        } = user.toObject();
        const token = jwt.sign({
            sub: user.id,
            role: user.role
        }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({
            username: userParam.username
        })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    //default branch name for role provided when creating an admin
    //branches will not be pushed for admin, so that they don't come under any branch employees.
    if (userParam.role && userParam.role == roles.Admin) {
        userParam.branch = new Branch({
            branchName: "Admin"
        });
    }


    const user = new User(userParam);
    const branch = await Branch.findById(userParam.branch);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    if (branch) {

        user.branch = branch._id;
        branch.users.push(user);

        // save branch
        await branch.save();
        // save user
        await user.save();
        return;
    }
    throw 'branch not found';


}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({
            username: userParam.username
        })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    //if req has a branch to update
    if (userParam.branch) {
        //check if the update branch is not the same as old branch then no need to update
        if (user.branch !== userParam.branch) {
            const branch = await Branch.findById(userParam.branch);

            if (branch) {
                //remove the user from old branch
                const oldBranch = await Branch.findById(user.branch);
                if (oldBranch && oldBranch.users) {
                    await oldBranch.users.pull(user._id);
                    await oldBranch.save();
                }

                user.branch = branch._id;
                //add user to the new branch
                addEmployee(branch._id, user._id);
            }
        } else {
            throw 'Updated Branch cannot be the same as old Branch.';
        }
    }
    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    const user = await User.findById(id);
    const branch = await Branch.findById(user.branch);
    if (branch && branch.users && user) {
        await branch.users.pull(id);
        await branch.save();

    }
    await User.findByIdAndRemove(id);
}

async function addEmployee(branchId, userId) {
    const branch = await Branch.findById(branchId);
    const user = await User.findById(userId);
    if (branch && user) {
        branch.users.push(user);
        await branch.save();
    }

}