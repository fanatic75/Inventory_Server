const express = require('express');
const router = express.Router();
const adminService = require('../users/admin.service');
const branchService = require('./branch.service');

//routes
router.post('/register', register);
router.get('/', getAll);
router.put('/:id', update);
router.delete('/:id', _delete);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.get('/products/:id', getAllProducts);                     //branch_id 
router.get('/employees/:id', getAllEmployees);
module.exports = router;





function register(req, res, next) {

    adminService.isAdmin(req.user)
        .then((result) => {
            if (result) {
                //branch service
                branchService.create(req.body)
                    .then(() => res.json({message:"branch created"}))
                    .catch(err => next(err));
            } else {
                throw "Not an admin."
            }
        })
        .catch(err => next(err));


}



function getCurrent(req, res, next) {
    //no need for admin

    //branch service
    branchService.getById(req.params.id)
        .then(branch => branch ? res.json(branch) : res.sendStatus(404))
        .catch(err => next(err));

}




function getAll(req, res, next) {

    adminService.isAdmin(req.user)
        .then((result) => {
            if (result) {
                //branch service
                branchService.getAll()
                    .then(branch => res.json(branch))
                    .catch(err => next(err));
            } else {
                throw "Not an Admin"
            }
        })
        .catch(err => next(err));
}

function getAllProducts(req, res, next) {
    //no need for admin
    //branch service

    branchService.getAllProducts(req.user.sub)
        .then(products => products ? res.json(products) : res.sendStatus(404))
        .catch(err => next(err));
}


function getAllEmployees(req, res, next) {
    adminService.isAdmin(req.user)
        .then((result) => {
            if (result) {
                //branch service
                branchService.getAllEmployees(req.params.id)
                    .then(employees => employees ? res.json(employees) : res.sendStatus(404))
                    .catch(err => next(err));

            } else {
                throw "Not an Admin"
            }
        })
        .catch(err => next(err));
}

function update(req, res, next) {
    adminService.isAdmin(req.user)
        .then((result) => {
            if (result) {
                //branch service
                branchService.update(req.params.id, req.body)
                    .then(() => res.json({message:"branch updated"}))
                    .catch(err => next(err));
            } else {
                throw "Not an Admin"
            }
        })
        .catch(err => next(err));
}

function _delete(req, res, next) {
    adminService.isAdmin(req.user)
        .then((result) => {
            if (result) {
                branchService.delete(req.params.id)
                    .then(() => res.json({"message":"branch deleted"}))
                    .catch(err => next(err));
            } else {
                throw "Not an Admin"
            }
        })
        .catch(err => next(err));

}


function getById(req, res, next) {
    adminService.isAdmin(req.user)
        .then((result) => {
            if (result) {

                branchService.getById(req.params.id)
                    .then(user => user ? res.json(user) : res.sendStatus(404))
                    .catch(err => next(err));

            } else {
                throw 'Not an Admin'
            }
        })

        .catch(err => next(err));

}