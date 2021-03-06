const express = require('express');
const {loginValidationRules, userValidationRules,loginValidator, registerValidator} = require('../middlewares/auth-validator');

const {loginCtrl, registerCtrl} = require('../controllers/auth');

let router = express.Router();

router.post('/login', loginValidationRules(), loginValidator, loginCtrl);

router.post('/register', userValidationRules(), registerValidator, registerCtrl);

module.exports = router;