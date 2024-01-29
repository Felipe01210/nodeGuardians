const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { getArmor, getArmorById, addArmor, editArmor, deleteArmor } = require("../controllers/armor");
const { validateFields } = require("../middleware/validate-fields");


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
], addArmor)

router
.route('/:id')
.get([
    check('id','Id must be mongoID').isMongoId(),
    validateFields
], getArmorById)
.put([
    check('id','Id must be mongoID').isMongoId(),
    check('name','Name is required').notEmpty(),
    check('name','Name must be text').not().isNumeric(),
    check('movility','Movility is required').notEmpty(),
    check('movility','Movility must be a number between 2 and 30').isInt({min:2, max:30}),
    check('resilience','Resilience is mandatory').notEmpty(),
    check('resilience','Resilience must be a number between 2 and 30').isInt({min:2, max:30}),
    check('recovery','Recovery is required').notEmpty(),
    check('recovery','Recovery must be a number between 2 and 30').isInt({min:2, max:30}),
    check('totalStats','Total Stats is required').notEmpty(),
    check('totalStats','Total Stats must be a number between 50 and 70').isInt({min:50, max:70}),
    validateFields
], editArmor)
.patch([
    check('id','Id must be mongoID').isMongoId(),
    check('name','Name must be text').not().isNumeric(),
    check('movility','Movility must be a number between 2 and 30').isInt({min:2, max:30}),
    check('resilience','Resilience must be a number between 2 and 30').isInt({min:2, max:30}),
    check('recovery','Recovery must be a number between 2 and 30').isInt({min:2, max:30}),
    check('totalStats','Total Stats must be a number between 50 and 70').isInt({min:50, max:70}),
    validateFields
], editArmor)
.delete([
    check('id','Id must be mongoID').isMongoId(),
    validateFields
], deleteArmor)

module.exports = router;