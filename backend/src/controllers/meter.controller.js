const fs = require('fs');
const fileUpload = require('express-fileupload');
const path = require('path');
const db = require('../../models')


const getMeterTypes = () => {
    try {
        const types = fs.readFileSync(path.join(__dirname, '../../resourses/library.csv'), 'utf8')

        return types.split('\n').map(item => {
            const row = item.split(';');
            if (row && row.length === 2) {
                return { id: row[0], type: row[1].replace('\r', '') }
            }
        });

    }
    catch (err) {
        throw new Error(err);
    }
}

let library = getMeterTypes();


exports.getType = async (req, res) => {

    const { number } = req.query

    if (!number) {
        res.status(500).json({
            message: "No parameter number"
        });
    };

    if (!library || library.length === 0) {
        res.status(500).json({
            message: "Types are empty"
        });
    };

    const type = library.find(type => number.slice(0, 6).includes(type?.id));

    if (type) {
        res.status(200).json(type);
    }
    else {
        res.status(404).json({
            message: `Type with identifier ${number.slice(0, 6)} not found`
        });
    };
};

exports.getMeters = async (req, res) => {

    const id = req.query.id;

    db.Meter.findAll({
        where: { id },
        attributes: ['id']
    }).then((meters) => {
        res.status(200).json(meters)
    }).catch((error) => {
        res.status(500).json({
            message: 'Error server getMeters'
        })
    })

};

exports.updateMeter = async (req, res) => {
    try {

        const { id } = req.query;
        const meter = { ...req.body };

        const Meter = await db.Meter.findOne({
            where: { id },
            include: [{
                model: db.Point
            }]
        });

        Meter.update(meter);

        res.status(200).json(Meter);
    }
    catch (err) {
        res.status(500).json({
            message: 'Error create meter'
        })
    };
}

exports.createMeter = async (req, res) => {
    try {
        let meter = { ...req.body };
        meter.user_id = req.user.id;

        console.log(meter)

        const id = (await db.Meter.create(meter)).id;

        const newMeter = await db.Meter.findOne({
            where: { id },
            include: [{
                model: db.Point
            }]
        });

        res.status(200).json(newMeter);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Can not create meter'
        })
    };
}

exports.meterFromTP = async (req, res) => {
    try {

        const { guid } = req.query;

        const meters = await db.Meter.findAll({
            where: { transformer_guid: guid },
            include: [{
                model: db.Point
            }]
        })

        res.status(200).json(meters);
    }
    catch (ex) {
        res.status(500).json({
            message: 'can not get the transformer counters'
        })
    }
}

exports.searchByID = async (req, res) => {
    try {

        const { id } = req.query;

        const meters = await db.Meter.findAll({
            where: { id },
            include: [{
                model: db.Point
            }]
        })

        res.status(200).json(meters);
    }
    catch (ex) {
        res.status(500).json({
            message: 'can not get the transformer counters'
        })
    }
}
