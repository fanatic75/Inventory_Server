const db = require('_helpers/db');
const Branch = db.Branch;

module.exports = {
    getAll,
    getById,
    create,
    update,
    getAllEmployees,
    getAllProducts,
    delete: _delete,
};

async function getAll() {
    return await Branch.find().select('-products -users');
}

async function getById(id) {
    return await Branch.findById(id).select('-products -users');
}


async function getAllProducts(id) {
    return await Branch.findById(id).select('products').populate('products');
}

async function getAllEmployees(id) {
    return await Branch.findById(id).select('users').populate('users','-hash');
    
  


}



async function create(branchParam) {
    // validate
    if (await Branch.findOne({
            branchName: branchParam.branchName
        })) {
        throw 'Branch "' + branchParam.branchName + '" is already taken';
    }

    const branch = new Branch(branchParam);


    // save branch
    await branch.save();
    return branch;
}


async function update(id, branchParam) {
    const branch = await Branch.findById(id);

    // validate
    if (!branch) throw 'Branch not found';
    if (branch.branchName !== branchParam.branchName && await Branch.findOne({
            branchName: branchParam.branchName
        })) {
        throw 'Branch "' + branchParam.branchName + '" is already taken';
    }




    // copy branchParam properties to branch
    Object.assign(branch, branchParam);

    await branch.save();
    return branch;
}






async function _delete(id) {
   const branch=await Branch.findById(id);
    if(branch){
        await branch.remove();
        return;
    }
    throw "No Branch Found"

   
}