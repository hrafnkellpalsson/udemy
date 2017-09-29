const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')

// By default Passport want to create a cookie based session and since we use
// tokens, we expliticly set cookie based session to false
// First parameter to passport.authenticate is the strategy we want to use
// (and we set those strategies up in passaport.js)
// Note that passport.authenticate is a higer order function in the sense that
// it returns a function
const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

// The output from the passport routing middleware (i.e. the functions
// requireAuth and requireSignin above) is used as the input to the controllers
// following them (e.g. the Authentication.signin method)
module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'Super secret code is ABC123' })
  })
  app.post('/signin', requireSignin, Authentication.signin)
  app.post('/signup', Authentication.signup)
}
