const User = require('../models/user.model')
const { SECRET } = require('../config')
const { Strategy, ExtractJwt } = require('passport-jwt')
const passport = require('passport')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //extract jwt from header req
    secretOrKey: SECRET
}

module.exports = (passport) => { 
    passport.use(new Strategy(opts, async (payload, done) => { //use opts 
        await User.findById(payload.user_id) //after extract, use userid from 'payload' find user in db
            .then(async user => {  //compare 
                if (user) { 
                    return done(null, user) //response user 
                }
                return done(null, false)
            })
            .catch((err) => {
                return done(null, false)
            })
    }))
}