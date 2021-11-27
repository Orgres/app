const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { getType, getMeters, createMeter, updateMeter, meterFromTP, searchByID } = require('../controllers/meter.controller');

const url = 'meter'

router.get('/', getMeters);
router.get('/fromtp', meterFromTP);
router.get('/searchbyid', searchByID);
router.get('/type', getType);
router.post('/create', createMeter);
router.post('/update', upload.any(), updateMeter);

module.exports = (app, baseUrl) => { app.use(`${baseUrl}${url}`, router) };
