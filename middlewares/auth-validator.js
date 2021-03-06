const {check, validationResult} = require('express-validator');

const EMAIL_ERROR_MSG = "El email es incorrecto";

const loginValidationRules = () => {
    return [
        check('email', EMAIL_ERROR_MSG).isEmail(),
        check('password')
    ]
}
const userValidationRules = () => {
    return [
        check('name').notEmpty(),
        check('lastname').notEmpty(),
        check('email', EMAIL_ERROR_MSG).isEmail(),
        check('password').notEmpty()
    ]
}

const loginValidator = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

const registerValidator = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    loginValidationRules,
    userValidationRules,
    loginValidator,
    registerValidator
}