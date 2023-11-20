const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { getArmor, getArmorById, addArmor, editArmor, deleteArmor } = require("../controllers/armor");
const { validateFields } = require("../middleware/validate-fields");
const router = require("./weapons");

router
.route('/')
.get(getArmor)
.post([
    check('name','Name is required').notEmpty(),
    check('name','Name must be text').not().isNumeric(),
    check('movility','Movility is required').notEmpty(),
    check('movility','Movility must be a number').isInt({min:2, max: 30}),
    check('resilience','Resilience is required').notEmpty(),
    check('resilience','Resilience must be a number').isInt({min:2, max: 30}),
    check('recovery','Recovery is required').notEmpty(),
    check('recovery','Recovery must be a number').isInt({min:2, max: 30}),
    check('totalStats','totalStats is required').notEmpty(),
    check('totalStats','totalStats must be a number').isInt({min:50, max:70}),
])