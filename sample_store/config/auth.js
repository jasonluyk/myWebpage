const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
    
    passport.serializeUser((user, next) => {
        next(null, user)
    })

    passport.deserializeUser((id, next) => {
        User.findById(id)
        .then(user => {
            return next(null, user)
        })
        .catch(err => {
            return next(err, null)
        })
    })

    const localLogin = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, next) => {
            User.findOne({email: email})
            .then(user => {
            // user not found
            if (user == null){
                return next(new Error('User Not Found'))
            }
            // wrong password
            else if (bcrypt.compareSync(password, user.password) == false){
                return next(new Error('Incorrect Password'))
            }
            //successful login
            else { 
                
                return next(null, user)          

            }
            })
            .catch(err => {
                return next(err)
            })
    })


    passport.use('localLogin', localLogin)

    const localRegister = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, next) => {
        User.findOne({email: email})
            .then(user => {
            // user not found
            if (user != null){
                return next(new Error('User Already Exists, Please Log In.'))
            }
            const hashedPw = bcrypt.hashSync(password, 10)
            let isAdmin = false
            if (email.indexOf('jasonluyk') != -1)
                isAdmin = true
            User.create({email:email, password:hashedPw, isAdmin:isAdmin})
            .then(user => {
                next(null, user)
            })
            
            .catch(err => {
                return next(err)
            })
            })
            .catch(err => {
                return next(err)
            })
        })

    passport.use('localRegister', localRegister)
}