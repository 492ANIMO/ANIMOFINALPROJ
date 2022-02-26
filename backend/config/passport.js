const config = require('../config/index');

// const User = require('../models/user');
const User = require('../models/user');
const Client = require('../models/client');
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

        try {
            let user = await User.findOne({ googleId: profile.id })
            if(user){ //user exist
                done(null, user)
            } else{
                const newProfile = await Client.create({
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    role: 'client',
                    avatar: profile.photos[0].value,
                    uid: new Date().getTime().toString(),
                    address: {
                        province: '',
                        district: '',
                        subdistrict: '',
                        postalCode: '',
                        detail: '',
                    },
                    contact: ''
                });

                const newUser = {
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    role: 'client',
                    onModel: 'Client',
                    avatar: profile.photos[0].value,
                    profile: newProfile._id
                }
                user = await User.create(newUser)
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
