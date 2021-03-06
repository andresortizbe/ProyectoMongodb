const {check, validationResult} = require('express-validator');

const CONTENT_ERROR_MSG = "Revisa que el campo content no esté vacio ";
const DATE_ERROR_MSG = "Revisa que el campo date no esté vacio ";

const taskValidatorRules = () => {
    return [
        check('content', CONTENT_ERROR_MSG).notEmpty(),
        check('date', DATE_ERROR_MSG).notEmpty()
    ]
}

const taskValidator = (req, res, next) => {
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

module.exports = {
    taskValidatorRules,
    taskValidator
}