const express = require('express');
const router = express.Router();
const adminService = require('../users/admin.service');
const productService = require('./product.service');

// routes
router.post('/register', register);
router.put('/:id', update);
router.delete('/:id', _delete);
router.get('/:id', getById);
router.get('/', getAll);
router.post('/avs', soldProducts);

module.exports = router;


function register(req, res, next) {

    adminService.isAdmin(req.user)
        .then((result) => {
            if (result) {
                productService.create(req.body)
                    .then((result) => {
                        if (result) {
                            res.json(result)
                            return;
                        }
                        throw 'Some error occured while registering a product';
                    })
                    .catch(err => next(err));

            } else {
                throw "Not an admin."
            }
        })
        .catch(err => next(err));




}







function getAll(req, res, next) {

    adminService.isAdmin(req.user)
        .then((result) => {
            if (result) {
                //product service
                productService.getAll()
                    .then(products => res.json(products))
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
                productService.update(req.params.id, req.body)
                    .then((result) => {
                        if (result)
                            res.json(result);
                        return;
                    })
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
                productService.delete(req.params.id)
                    .then(() => res.json({
                        message: "product deleted"
                    }))
                    .catch(err => next(err));
            } else {
                throw "Not an Admin"
            }
        })
        .catch(err => next(err));

}

function getById(req, res, next) {

    productService.getById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));



}


function soldProducts(req, res, next) {
    productService.soldProducts(req.body.orders)
        .then((modifiedProducts) => modifiedProducts?res.json({
            message: 'Sold '+modifiedProducts+' products',
        }):res.sendStatus(404))
        .catch(err => next(err));
}