const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { validateFields } = require("../middleware/validate-fields");
const { authUser, renewToken, authUserEmail, } = require("../controllers/auth");
const { validateJWT } = require("../middleware/validate-jwt");

router
.route('/login')
.post([
    check('login',"Login is required").notEmpty(),
    check('login',"Login must be text").not().isNumeric(),
    check('email',"Email is required").notEmpty(),
    check('email',"Email must be an email").isEmail(),
    check('password',"Password is required").notEmpty(),
    check('password',"Min length: 8, 1 lower letter, 1 upper letter, 1 number and 1 special character").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/),
    validateFields
], authUser)

router
.route('/loginForm')
.post([
    check('email',"Email is required").notEmpty(),
    check('email',"Email must be an email").isEmail(),
    check('password',"Password is required").notEmpty(),
    check('password',"Min length: 8, 1 lower letter, 1 upper letter, 1 number and 1 special character").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/),
    validateFields
], authUserEmail)

router
.route('/renew')
.get([
    validateJWT
], renewToken)

module.exports = router