const fs = require('fs');
const path = require('path');
const db = require('../../models');
const { Op } = require("sequelize");
const _ = require('lodash');

const Point = db.Point;

const fileProcessing = async (fileName) => {
    try {
        const filePoints = fs.readFileSync(path.join(__dirname, `../../uploads/${fileName}`), 'utf8');

        const points = filePoints.split('\n').map((row) => {
            const columns = row.split(';');

            return {
                area: columns[0].trim(),
                address: columns[1].trim(),
                type: columns[2].trim(),
                account: `${columns[3].trim()}/${columns[4].trim()}/${columns[5].trim()}`,
                name: columns[6].trim(),
                guid: columns[7].trim(),
                code: columns[8].trim(),
            }
        });

        const transaction = await db.sequelize.transaction();

        for (let i = 0; i < points.length; i++) {
            const point = await Point.findOne({ where: { code: points[i].code } }, { transaction });
            if (!point) {
                await Point.create(points[i], { transaction });
            }
        }

        await transaction.commit();

        return { status: 200, message: 'file processed successfully' }

    }
    catch (Ex) {
        return { status: 500, message: 'file error' }
    }
}

exports.pointCreateOrUpdate = async (req, res) => {
    const responce = await fileProcessing(req.fileName);

    res.status(responce.status).send(responce.message);
}

exports.getPoint = async (req, res) => {
    try {
        const where = Object.entries(req.query).reduce((pr, cr) => {
            const name = cr[0];
            const value = cr[1].split(' ').map(item => ({
                [Op.iLike]: `%${item}%`
            }));
            return { ...pr, [name]: { [Op.and]: value } }
        }, {});

        console.log(where)

        const point = await db.Point.findAll({
            where
        });

        res.json(point.slice(1, 100));
    }
    catch (ex) {
        res.status(500).json(ex);
    }

}

exports.getPointByCode = async (req, res) => {
    try {
        const { code } = req.params;
        const point = await db.Point.findOne({
            where: {
                code
            }
        })
        res.json(point);
    }
    catch (ex) {
        res.status(500).json(ex);
    }
}
