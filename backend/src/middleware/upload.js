const multer = require("multer");
const moment = require("moment");
const fs = require("fs");

const storage = multer.diskStorage({
    destination(req, file, cb) {
        const dir = `images/${file.fieldname}/`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename(req, file, cb) {
        console.log(file)
        const date = moment().format('DDMMYY-HHmmss_SSS');
        cb(null, `${req?.body?.number}|${req?.body?.serial}|${date}|.${file.mimetype.split('/')[1]}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    };
};

module.exports = multer({ storage, fileFilter });
