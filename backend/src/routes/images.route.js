const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path')

const url = 'images'

router.get('/', (req, res) => {
    const { type, number, serial } = req.query;
    const files = fs.readdirSync(path.join(__dirname, `../../images/${type}`));

    const images = files.filter(file => file.includes(`${number}|${serial}`));

    res.json(images);
});

module.exports = (app, baseUrl) => { app.use(`${baseUrl}${url}`, router) };
