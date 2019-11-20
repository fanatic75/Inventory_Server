const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const adminService = require('./admin.service');
// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.put('/:id', update);
router.delete('/:id', _delete);
router.post('/token/:id',refreshToken);
router.get('/admins',getAllAdmins)


router.get('/current', getCurrent);
router.get('/:id', getById);

module.exports = router;

function authenticate(req, res, next) {

    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({
            message: 'Username or password is incorrect'
        }))
        .catch(err => next(err));
}

function register(req, res, next) {

    adminService.isAdmin(req.user)
        .then((result) => {
            if (result) {
                userService.create(req.body)
                .then(user => user ? res.json(user) : res.sendStatus(404))
                    .catch(err => next(err));

            } else {
                throw "Not an admin."
            }
        })
        .catch(err => next(err));



}


function getCurrent(req, res, next) {
    //no need for admin

    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}


function getAll(req, res, next) {

    adminService.isAdmin(req.user)
        .then((result) => {
            if (result) {
                userService.getAll()
                .then(users => users ? res.json(users) : res.sendStatus(404))
                    .catch(err => next(err));
            } else {
                throw "Not an Admin"
            }
        })
        .catch(err => next(err));
}

function getAllAdmins(req, res, next) {

    adminService.isAdmin(req.user)
        .then((result) => {
            if (result) {
                userService.getAllAdmins()
                .then(users => users ? res.json(users) : res.sendStatus(404))
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
                userService.update(req.params.id, req.body)
                .then(user => user ? res.json(user) : res.sendStatus(404))
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
                userService.delete(req.params.id)
                    .then(() => res.json({message:"User Deleted"}))
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

                userService.getById(req.params.id)
                    .then(user => user ? res.json(user) : res.sendStatus(404))
                    .catch(err => next(err));

            } else {
                throw 'Not an Admin'
            }
        })


}

function refreshToken(req,res,next){
    userService.refreshToken(req.params.id,req.body)
        .then(token=>token?res.json(token):res.sendStatus(404))
        .catch(err=>next(err));
}