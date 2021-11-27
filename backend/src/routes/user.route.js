const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');

const url = 'users'

router.get('/profile', user.profile);
router.get('/roles', user.getRoles);
router.get('/', user.getAll);
router.post('/create', user.signup);

module.exports = (app, baseUrl) => { app.use(`${baseUrl}${url}`, router) };
