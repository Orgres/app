const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadCSV');
const { validate } = require('../helpers/validate');
const { check } = require('express-validator');

const validations = [
    check('id')
        .not()
        .isEmpty({
            ignore_whitespace: true
        })
        .withMessage('no required parameter ID'),
]

const { tpCreateOrUpdate, getAreas, getSubstations, getFeeders, getTransformers } = require('../controllers/tp.controller')

const url = 'tp';

router.post('/', upload.array('file'), tpCreateOrUpdate);

router.get('/areas', getAreas);

router.get('/substations', validate(validations), getSubstations);

router.get('/feeders', validate(validations), getFeeders);

router.get('/transformers', validate(validations), getTransformers);

module.exports = (app, baseUrl) => { app.use(`${baseUrl}${url}`, router) };
