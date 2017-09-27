const passport = require('passport')
const User = require('../models/user')
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')


// ============================ For signin =====================================
// Create local strategy (local refers to local database or data that is stored locally)
// Local strategy expects to get a username and a password, since we're using
// email rather than username here we have explicitly state that
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this email and password, then call 'done' if correct
  // Otherwise call 'done' with false
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err) }
    if (!user) { return done(null, false) }

    // Compare passwords - is the 'password' parameter equal to user.password?
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err) }
      if (!isMatch) { return done(null, false) }

      return done(null, user)
    })
  })
})
// =============================================================================


// =================== For access to protected routes ==========================
// Set up option for JWT strategy
// A JWT token can sit anywhere on a request.
// It could be in the body, within the URL, in the headers
// So we have to specifically tell the strategy where to look in the request to find the token
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
}

// Create JWT strategy
const jwtLogin = new  JwtStrategy(jwtOptions, function(payload, done) { // payload is decoded jwt token
  // See if the user id in the payload exists in our database, if it does call
  // 'done' with that user, otherwise call 'done' without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false) } // Error searching for user

    if (user) {
      done(null, user)
    } else {
      done(null, false) // No error searching for user, we just didn't find one
    }
  })
})
// =============================================================================

// Tell passport to use the strategies
passport.use(jwtLogin)
passport.use(localLogin)
