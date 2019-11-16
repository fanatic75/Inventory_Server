const db = require('_helpers/db');
const Product = db.Product;
const Branch = db.Branch;
module.exports = {
    getAll,
    getById,
    create,
    update,
    soldAProduct,
    delete: _delete,

};

async function getAll() {
    return await Product.find();
}

async function getById(id) {
    return await Product.findById(id);
}


async function create(productParam) {
    // validate


    const product = new Product(productParam);


    if (productParam.branch && productParam.quantity) {

        const branch = await Branch.findById(productParam.branch);
        if (branch) {

            return addProduct(productParam.quantity, branch, product);



        }
        throw 'Branch not found';

    }
    throw 'Branch and Quantity are required';

}




async function update(id, productParam) {
    const product = await Product.findById(id);


    // validate
    if (!product) throw 'Product not found';
    if (product.name !== productParam.name && await Product.findOne({
            name: productParam.name
        })) {
        throw 'Name "' + productParam.name + '" is already taken';
    }


    if (productParam.branch) {
        throw 'branch cannot be updated. Delete the product and add a new product to that branch.';
    }

    Object.assign(product, productParam);




    await product.save();
    return product;
}


async function soldAProduct(id, quantityParam) {
    const product = await Product.findById(id);
    if (product) {
        product.quantity = product.quantity - quantityParam;
        if (product.quantity < 0)
            throw 'Input is more than the stock quantity'
        await product.save();
        return product;
    }

}



async function _delete(id) {
    const product = await Product.findById(id);
    if (product) {
        const branch = await Branch.findById(product.branch);
        branch.products.pull(product._id);
        await branch.save();
        await product.remove();
        return;
    }
    throw "No Product Found"


}



async function addProduct(quantity, branch, product) {


    try {
        product.branch = branch._id;
        product.quantity = quantity;
        branch.products.push(product);
        await product.save();
        await branch.save();
        return product;
    } catch (e) {
        throw 'Some error occured during adding product.'
    }

}



{
    /**
     * 
     * 
async function insertBranchToProduct(product, productParam) {
    if(product.branch!==productParam.branch){

    }



    const branch = await Branch.findById(productParam.branch);
    if (branch) {
        const branchId = branch._id;
        console.log(product.branch)
        const branchIndex = product.branch.indexOf({
            branchId: branchId,
        });
        //check if product does not already have the branch , if not insert the branch 

        console.log(branchIndex);
        console.log(await Product.findOne({
            branch: [{
                branchId: branchId,
            }]
        }))
        if (branchIndex >= 0 && await Product.findOne({
                branch: [{
                    branchId: branchId,
                    ...rest
                }]
            })) {
            throw 'Product exists inside branch.'
        }
        return addProduct(productParam.quantity, branch, product);

    } else {
        throw 'No Such Branch Exists.'
    }
}

     * 
     * 
     */
}