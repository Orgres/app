const db = require('../../models');
const passport = require('passport');
const authenticate = require('../middleware/authenticate');

module.exports = (app) => {

    const JwtStrategy = require('passport-jwt').Strategy;
    const ExtractJwt = require('passport-jwt').ExtractJwt;

    var opts = {}

    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    opts.secretOrKey = process.env.SECRET;

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {

        db.User.findAll({
            where: { id: jwt_payload.id }
        }).then((user) => {
            if (user && user.length > 0) {
                return done(null, { id: user[0].id, login: user[0].login });
            }
            else {
                return done(null, false);
            }
        }).catch((error) => {
            console.log(error)
            return done(null, false);
        });
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(authenticate);
}
