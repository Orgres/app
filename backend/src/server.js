const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

require('./helpers/jwt')(app);

const baseUrl = '/api/v1/';

require('./routes/meter.route')(app, baseUrl);
require('./routes/auth.route')(app, baseUrl);
require('./routes/tp.route')(app, baseUrl);
require('./routes/user.route')(app, baseUrl);
require('./routes/meteringpoints.route')(app, baseUrl);
require('./routes/images.route')(app, baseUrl);
app.use('/images', (express.static(path.join(__dirname, '../images'))));

app.use('/images', (express.static(path.join(__dirname, '../images'))));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
