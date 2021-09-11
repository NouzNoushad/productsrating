const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const Register = require('../../models/Register');

const passportAuth = (passport) => {

    passport.use(new localStrategy({ usernameField: 'email' },
    
        (email, password, done) => {

            Register.findOne({ email: email }, (err, user) => {

                
                if (err) return done(err);

                if (!user) {
                    
                    return done(null, false, { message: 'Invalid User' });
                }
                else {
                    
                    //bcrypt compare
                    bcrypt.compare(password, user.password, (err, match) => {

                        if (err) return done(err);

                        if (match) {
       
                            return done(null, user);

                        } else {
                            
                            return done(null, false, { message: 'Invalid Password' });
                        }
                    });
                }

            });
        }
    ));

    //passport session
    passport.serializeUser((user, done) => {

        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {

        Register.findById(id, (err, user) => {

            done(err, user);
        })
    })
}

module.exports = passportAuth;