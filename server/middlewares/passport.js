/* --------------------------------- doc cu --------------------------------- */

const User = require('../models/user.model')
const { SECRET } = require('../config')
const { Strategy, ExtractJwt } = require('passport-jwt')
const passport = require('passport')
const path = require('path')
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
// const LocalStrategy = require('passport-local').Strategy;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //extract jwt from header req
    secretOrKey: SECRET
}
// authen if user or not
module.exports = (passport) => {
    passport.use(new Strategy(opts, async (payload, done) => { //use opts
        await User.findById(payload.user_id) //find in database the id == payload.user_id from token
            //compare 
            .then(async user => {
                //compare 
                if (user) {
                    console.log("ok")
                    // return done(null, user) //response user 
                    return done(null, user) //response user 
                }
                return done(null, false)
            })
            .catch((err) => {
                return done(null, false)
            })
    }))
}