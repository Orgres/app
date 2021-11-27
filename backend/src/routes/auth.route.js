const express = require('express');
const router = express.Router();
const controller = require('../controllers/login.controller');
const { validate } = require('../helpers/validate');

const { check } = require('express-validator');

const url = 'auth';

const validations = [
    check('login')
        .not()
        .isEmpty({
            ignore_whitespace: true
        })
        .withMessage('no required parameter login'),
    check('password')
        .not()
        .isEmpty({
            ignore_whitespace: true
        })
        .withMessage('no required parameter password')
]

router.post('/login',
    validate(validations), controller.auth);

router.get('/getrole', controller.getRole);

module.exports = (app, baseUrl) => { app.use(`${baseUrl}${url}`, router) };
