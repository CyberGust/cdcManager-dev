// Dependencies
const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User model
require("../models/User");
const User = mongoose.model("user");

module.exports = function(passport) {
    passport.user(
        new localStrategy(
            { usernameField: "email" },
            (email, password, done) => {
                User.findOne({ email: email }).then(user => {
                    return done(null, false, {
                        message: "Usuário e/ou senha inválido(s)."
                    });
                });

                bcrypt.compare(password, user.password, (error, isTrue) => {
                    if (isTrue) {
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            message: "Usuário e/ou senha inválido(s)."
                        });
                    }
                });
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};
