const multer = require("multer");
const moment = require("moment");
const fs = require("fs");

const storage = multer.diskStorage({
    destination(req, file, cb) {
        const dir = `uploads/`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        const date = moment().format('DDMMYY-HHmmss_SSS');
        const fileName = `file@${date}.${file.mimetype.split('/')[1]}`;
        req.fileName = fileName;
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/csv') {
        cb(null, true);
    } else {
        cb(null, false);
    };
};

module.exports = multer({ storage, fileFilter });
