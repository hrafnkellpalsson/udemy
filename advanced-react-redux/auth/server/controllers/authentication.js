const jwt = require('jwt-simple')
const User = require('../models/user')
const config = require('../config')

// Take user id, encrypt with our secret
function tokenForUser(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

// The req parameter is the output of the passport routing middleware.
// I.e. in this case its the output of the method requireSignin and if you
// look into passport.js you can see that a 'user' object is returned
exports.signin = function(req, res, next) {
  // User has already had their email and password authenticated, we just need
  // to give them a token
  res.send({ token: tokenForUser(req.user) })
}

exports.signup = function(req, res, next) {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' })
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err) }

    // If a user with email does exist return an Error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' })
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password
    })

    user.save(function(err) {
      if (err) { return next(err) }

      // Respond to request indicating the user was created
      res.json({ token: tokenForUser(user) })
    })
  })
}