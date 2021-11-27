const CryptoJS = require("crypto-js");
const db = require('../../models');
const User = db.User;
const Role = db.Role;

exports.getAll = async (req, res) => {
    try {
        const users = await db.User.findAll({
            attributes: ['id', 'login', 'middlename', 'lastname', 'firstname'],
            include: [{
                model: db.Role,
                attributes: ['id', 'name']
            }]
        })

        res.status(200).json(users);
    }
    catch (ex) {
        res.status(500).json({
            message: 'can not return the list of users'
        });
    }
}

exports.profile = (req, res) => {
    const id = req.user.id;
    if (id) {
        const users = User.findOne({
            where: { id },
            attributes: ['id', 'login', 'firstname', 'middlename', 'lastname'],
            include: [{
                model: Role,
                attributes: ['name']
            }]
        }).then((user) => {
            res.status(200).json(user)
        }).catch(() => {
            res.status(500).json({
                message: "Error db"
            })
        })
    }
    else {
        res.status(401).json({
            message: "No authorizations"
        })
    }
}

exports.getRoles = async (req, res) => {
    try {
        const roles = await db.Role.findAll({
            attributes: ['id', 'name']
        });
        res.status(200).json(roles);
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}

exports.signup = async (req, res) => {
    let newUser = req.body
    try {
        let user = await db.User.findOne({
            where: {
                firstname: newUser.firstname,
                middlename: newUser.middlename,
                lastname: newUser.lastname,
            }
        });
        if (!user) {
            let isLoginExist = !!await db.User.findOne({
                where: { login: newUser.login }
            });
            if (!isLoginExist) {
                const secret = process.env.SECRET;
                newUser.password = CryptoJS.HmacSHA1(newUser.password, secret).toString();
                db.User.create(newUser)
                    .then(async response => {
                        const newUser = await db.User.findOne({
                            where: { id: response.id },
                            attributes: ['id', 'login', 'firstname', 'middlename', 'lastname'],
                            include: [{
                                model: db.Role,
                                attributes: ['id', 'name']
                            }]
                        })
                        res.status(200).json(newUser);
                    })
                    .catch(error => {
                        res.status(500).send(error.message);
                    });
            } else {
                res.status(500).json({ errorMessage: 'Логин уже используется!' });
            };
        } else {
            res.status(500).json({ errorMessage: 'Пользователь с таким ФИО уже существует!' });
        };
    } catch (e) {
        res.status(500).json({ message: e.message });
    };
};
