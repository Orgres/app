const fs = require('fs');
const path = require('path');
const db = require('../../models');
const _ = require('lodash');

const Area = db.Area;
const Subs = db.Substation;
const Feeder = db.Feeder;
const Transformer = db.Transformer;

const fileProcessing = async (fileName) => {
    try {
        const types = fs.readFileSync(path.join(__dirname, `../../uploads/${fileName}`), 'utf8')

        const result = types.split('\n').reduce((pr, cr) => {
            const row = cr.split(';');

            const areaKey = row[0].trim();
            const areaValue = pr[areaKey];

            const subKey = row[1].trim()
            const subValue = areaValue ? pr[areaKey][subKey] : undefined;

            const feed = row[2].trim();
            const feedValue = subValue ? pr[areaKey][subKey][feed] : undefined;

            const tp = row[3].trim();

            return {
                ...pr, [areaKey]: {
                    ...pr[areaKey],
                    [subKey]: {
                        ...subValue,
                        [feed]: {
                            ...feedValue,
                            [tp]: row[4].replace('\r', '')
                        }
                    }
                }
            }
        }, {});

        const dbAreas = await Area.findAll();

        const areas = Object.entries(result);
        for (let i = 0; i < areas.length; i++) {
            const area = areas[i][0];

            let areaId = await dbAreas.find(item => (item.name === area))?.id;

            if (!areaId) {
                await Area.create({
                    name: area
                }).then((area) => {
                    areaId = area.id;
                });
            }

            const dbSubs = await Subs.findAll({
                where: { area_id: areaId }
            });

            const subs = Object.entries(areas[i][1]);

            for (let y = 0; y < subs.length; y++) {
                const sub = subs[y][0];

                let subId = await dbSubs.find(item => (item.name === sub))?.id;

                if (!subId) {
                    await Subs.create({
                        name: sub,
                        area_id: areaId
                    }).then((sub) => {
                        subId = sub.id
                    });
                }

                const dbFeeders = await Feeder.findAll({
                    where: { substation_id: subId }
                });

                const feeders = Object.entries(subs[y][1]);

                for (let z = 0; z < feeders.length; z++) {
                    const feeder = feeders[z][0];

                    let feederId = await dbFeeders.find(item => (item.name === feeder))?.id;

                    if (!feederId) {
                        await Feeder.create({
                            name: feeder,
                            substation_id: subId
                        }).then((feeder) => {
                            feederId = feeder.id
                        })
                    }

                    const dbTransformers = await Transformer.findAll({
                        where: { feeder_id: feederId }
                    })

                    const tps = Object.entries(feeders[z][1]);

                    for (let e = 0; e < tps.length; e++) {
                        const tp = tps[e] || undefined;

                        transformerId = dbTransformers.find(item => (item.name === tp[0] && item.guid === tp[1]));

                        if (!transformerId) {
                            await Transformer.create({
                                name: tp[0],
                                guid: tp[1],
                                feeder_id: feederId
                            })
                        }
                    }
                }
            }
        }

    }
    catch (err) {
        throw new Error(err);
    }
}

exports.tpCreateOrUpdate = async (req, res) => {
    fileProcessing(req.fileName).then(() => {
        res.json({
            message: 'file processed successfully'
        });
    }).catch((error) => {
        console.error(error)
        res.status(500).json(error);
    })

};

exports.getAreas = async (req, res) => {
    Area.findAll({
        order: ['name']
    }).then((areas) => {
        res.json(areas);
    }).catch((error) => {
        res.status(500).json(error);
    });
};

exports.getSubstations = async (req, res) => {

    const id = req.query.id;

    Subs.findAll({
        where: { area_id: id },
        order: ['name']
    }).then((subs) => {
        res.json(subs);
    }).catch((error) => {
        res.status(500).json(error);
    });
};

exports.getFeeders = async (req, res) => {

    const id = req.query.id;

    Feeder.findAll({
        where: { substation_id: id },
        order: ['name']
    }).then((feeders) => {
        res.json(feeders);
    }).catch((error) => {
        res.status(500).json(error);
    });

};

exports.getTransformers = async (req, res) => {

    const id = req.query.id;

    Transformer.findAll({
        where: { feeder_id: id },
        order: ['name']
    }).then((transformers) => {
        res.json(transformers);
    }).catch((error) => {
        res.status(500).json(error);
    });
};
