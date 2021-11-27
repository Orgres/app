const db = require('../../models');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');

exports.auth = async (req, res) => {
    try {

        const user = req.body;
        const secret = process.env.SECRET;
        const password = CryptoJS.HmacSHA1(user.password, secret).toString();

        const users = await db.User.findAll({
            where: { login: user.login, password }
        })

        if (users && users.length > 0) {
            const token = jwt.sign({ id: users[0].id }, secret);
            res.status(200).json({
                token,
                role_id: users[0].role_id
            });
        }
        else {
            res.status(401).json({
                message: "wrong login or password"
            })
        }
    }
    catch (ex) {
        res.status(500).send('Error')
    }
}

exports.getRole = async (req, res) => {
    try {
        const user = await db.User.findOne({
            where: { id: req.user.id },
            attributes: ['id'],
            include: [{
                model: db.Role,
                attributes: ['id', 'name']
            }]
        });

        res.status(200).json({
            role: user.Role.name
        });
    }
    catch (ex) {
        res.status(500).json({
            message: 'can not get the role'
        })
    }
}
