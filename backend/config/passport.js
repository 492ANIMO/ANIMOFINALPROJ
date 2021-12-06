const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport') , 
LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
    passport.use(new LocalStrategy({ 
      usernameField: 'email' },
      (email, password, done) => {
        User.findOne({ email: email }, (err, user) => {
            if (err) throw err;

            if (!user) {
                console.log('user does not exist')
                return done(null, false, { message: "User Doesn't Exist !" });
            }

            if (bcrypt.compareSync(password, user.password)) {
                return done(null, user);
              }
            return done(null, false);
        })
    }));

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}
