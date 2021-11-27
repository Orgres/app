const passport = require('passport');
const openUrls = require('../const/openUrls')

module.exports = (req, res, next) => {
    console.log(req.body);
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        const status = openUrls.some(url => (req.url.includes(url)));

        if (status) {
            return next();
        };

        if (!user) {
            return res.status(401).send('Unauthorized');
        };

        req.user = user;

        return next();

    })(req, res, next);
};
