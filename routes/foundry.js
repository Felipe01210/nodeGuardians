const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { getFoundries, addFoundry, getFoundryById, editFoundry, deleteFoundry } = require("../controllers/foundry");
const { validateFields } = require("../middleware/validate-fields");

router
.route('/')
.get(getFoundries)
.post([
    check('name','Name is required').notEmpty(),
    check('name','Name must be text').not().isNumeric(),
    check('location', 'Location must be text').not().isNumeric(),
    check('location', 'Location is required').notEmpty(),
    validateFields
], addFoundry)

router
.route('/:id')
.get([
    check('id',"Id must be mongoID").isMongoId(),
    validateFields
],getFoundryById)
.put([
    check('id',"Id must be mongoID").isMongoId(),
    check('name','Name is required in PUT edit, fill it or try a PATCH').notEmpty(),
    check('name','Name must be text').not().isNumeric(),
    check('location','Location must be text').not().isNumeric(),
    check('location','Location is required in PUT edit, fill it or try a PATCH').notEmpty(),
    check('description','Description is required in PUT edit, fill it or try a PATCH').notEmpty(),
    validateFields
],editFoundry)
.patch([
    check('id',"Id must be mongoID").isMongoId(),
    check('name','Name must be text').not().isNumeric(),
    check('location','Location must be text').not().isNumeric(),
    validateFields
], editFoundry)
.delete([
    check('id',"Id must be mongoID").isMongoId(),
    validateFields
],deleteFoundry)

module.exports = router;