const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { getWeapons, getWeaponsById, addWeapon, editWeapon, deleteWeapon} = require("../controllers/weapon");
const { validateFields } = require("../middleware/validate-fields");

router
.route('/')
.get(getWeapons)
.post([
    check('name','Name is required').notEmpty(),
    check('name','Name must be text').not().isNumeric(),
    check('slot','Slot is required').notEmpty(),
    check('slot','Slot must be text').not().isNumeric(),
    check('season','Season is required').notEmpty(),
    check('firstPerk','Perks are required').notEmpty(),
    check('firstPerk','Perks must be text').not().isNumeric(),
    check('secondPerk','Perks are required').notEmpty(),
    check('secondPerk','Perks must be text').not().isNumeric(),
    check('foundryPerk','Perks are required').notEmpty(),
    check('foundryPerk','Perks must be text').not().isNumeric(),
    check('sunset','Sunset is required').notEmpty(),
    check('sunset','Sunset must be boolean').isBoolean(),
    validateFields
],addWeapon)

router
.route('/:id')
.get([
    check('id',"Id must be mongoID").isMongoId(),
    validateFields
], getWeaponsById)
.put([
    check('id',"Id must be mongoID").isMongoId(),
    check('name','Name is required, fill it or try PATCH').notEmpty(),
    check('name','Name must be text').not().isNumeric(),
    check('slot','Slot is required, fill it or try PATCH').notEmpty(),
    check('slot','Slot must be text').not().isNumeric(),
    check('season','Season is required, fill it or try PATCH').notEmpty(),
    check('firstPerk','Perks are required, fill it or try PATCH').notEmpty(),
    check('firstPerk','Perks must be text').not().isNumeric(),
    check('secondPerk','Perks are required, fill it or try PATCH').notEmpty(),
    check('secondPerk','Perks must be text').not().isNumeric(),
    check('foundryPerk','Perks are required, fill it or try PATCH').notEmpty(),
    check('foundryPerk','Perks must be text').not().isNumeric(),
    check('sunset','Sunset is required, fill it or try PATCH').notEmpty(),
    check('sunset','Sunset must be boolean').isBoolean(),
    validateFields
], editWeapon)
.patch([
    check('id',"Id must be mongoID").isMongoId(),
    check('name','Name must be text').not().isNumeric(),
    check('slot','Slot must be text').not().isNumeric(),
    check('firstPerk','Perks must be text').not().isNumeric(),
    check('secondPerk','Perks must be text').not().isNumeric(),
    check('foundryPerk','Perks must be text').not().isNumeric(),
    validateFields
], editWeapon)
.delete([
    check('id',"Id must be mongoID").isMongoId(),
    validateFields
], deleteWeapon)

module.exports = router;