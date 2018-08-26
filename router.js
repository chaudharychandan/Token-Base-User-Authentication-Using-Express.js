const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, (req, res) => {
    res.send({ message: 'Successfully logged in' });
  });

  app.post('/signup', Authentication.signup);
  app.post('/signin', Authentication.signin);
};
