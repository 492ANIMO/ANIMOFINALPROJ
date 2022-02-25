const config = require('../config/index');

// const User = require('../models/user');
const User = require('../models/client');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
        console.log(profile)

        const newUser = {
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.email,
            role: 'client',
            avatar: profile.photos[0].value,
            uid: new Date().getTime().toString()
        }

        try {
            let user = await User.findOne({ googleId: profile.id })
            if(user){

                done(null, user)
            } else{
                user = await User.create(newUser),
                done(null, user)
            }
        } catch (error) {
            console.error(error)
        }
   
      }
    ));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
}
