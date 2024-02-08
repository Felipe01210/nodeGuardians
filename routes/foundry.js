const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { getFoundries, addFoundry, getFoundryById, editFoundry, deleteFoundry } = require("../controllers/foundry");
const { validateFields } = require("../middleware/validate-fields");
const { existFoundry } = require("../helpers/foundry");
const { validateJWT } = require("../middleware/validate-jwt");
const { hasRol } = require("../middleware/validate-customs");

router
.route('/')
.get(getFoundries)
.post([
    validateJWT,
    hasRol("ADMIN"),
    check('name','Name is required').notEmpty(),
    check('name','Name must be text').not().isNumeric(),
    //Esta comprobación de repetición solo existe en foundry debido a que el usuario puede obtener y guardar varios ejemplares de un arma o armadura
    check("name").custom(existFoundry),
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
    validateJWT,
    hasRol("ADMIN"),
    check('id',"Id must be mongoID").isMongoId(),
    check('name','Name is required in PUT edit, fill it or try a PATCH').notEmpty(),
    check('name','Name must be text').not().isNumeric(),
    check('location','Location must be text').not().isNumeric(),
    check('location','Location is required in PUT edit, fill it or try a PATCH').notEmpty(),
    check('description','Description is required in PUT edit, fill it or try a PATCH').notEmpty(),
    validateFields
],editFoundry)
.patch([
    validateJWT,
    hasRol("ADMIN"),
    check('id',"Id must be mongoID").isMongoId(),
    check('name','Name must be text').not().isNumeric(),
    check('location','Location must be text').not().isNumeric(),
    validateFields
], editFoundry)
.delete([
    validateJWT,
    hasRol("ADMIN"),
    check('id',"Id must be mongoID").isMongoId(),
    validateFields
],deleteFoundry)

module.exports = router;