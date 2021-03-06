const express = require('express');
const {getUsers} = require('../controllers/user');

let router = express.Router();

router.get('/users', getUsers);
// router.post('/users', loginValidationRules(), loginValidator, loginCtrl);
// router.put('/users/:id', loginValidationRules(), loginValidator, loginCtrl);
// router.delete('/users/:id', loginValidationRules(), loginValidator, loginCtrl);

module.exports = router;