const router = require('express').Router();
const upload = require('../middleware/uploadCSV');
const { pointCreateOrUpdate, getPointByCode, getPoint } = require('../controllers/point.controller')

const url = 'meteringpoints';

router.get('/', getPoint);
router.get('/:code', getPointByCode);
router.post('/', upload.array('points'), pointCreateOrUpdate);

module.exports = (app, baseUrl) => { app.use(`${baseUrl}${url}`, router) };
