const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { getUsers, getUserByName, addUser, editUser, deleteUser } = require("../controllers/users");
const { validateFields } = require("../middleware/validate-fields");

router
.route('/')
.get(getUsers)
.post([
    check('name','Name is required').notEmpty(),
    check('name','Name must be text').not().isNumeric(),
    check('login','Username is required').notEmpty(),
    check('login','Username must be text').not().isNumeric(),
    check('email','Email is required').notEmpty(),
    check('email','Must be an email').isEmail(),
    check('password','Password is required').notEmpty(),
    check('password',"Min length: 8, 1 lower letter, 1 upper letter, 1 number and 1 special character").not().matches("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/"),
    validateFields
], addUser)

router
.route('/:name')
.get([
    check('name',"Name must be text").not().isNumeric(),
    validateFields
], getUserByName)
.put([
    check('name','Name is required').notEmpty(),
    check('name','Name must be text').not().isNumeric(),
    check('login','Username is required').notEmpty(),
    check('login','Username must be text').not().isNumeric(),
    check('email','Email is required').notEmpty(),
    check('email','Must be an email').isEmail(),
    check('password','Password is required').notEmpty(),
    validateFields
], editUser)
.delete([
    check('name',"Name must be text").not().isNumeric(),
    validateFields
], deleteUser)

module.exports = router;